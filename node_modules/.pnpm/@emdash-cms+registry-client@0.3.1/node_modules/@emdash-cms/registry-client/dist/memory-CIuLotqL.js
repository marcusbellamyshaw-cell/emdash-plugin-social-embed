import { isDid, isHandle } from "@atcute/lexicons/syntax";
import { mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

//#region src/credentials/types.ts
/**
* Marker thrown when an env-var-only credential store is used in a context
* that requires a writable store (e.g. login). Lets the CLI distinguish
* "user hasn't logged in" from "this environment is read-only".
*/
var ReadOnlyCredentialStoreError = class extends Error {
	constructor(message = "credential store is read-only") {
		super(message);
		this.name = "ReadOnlyCredentialStoreError";
	}
};

//#endregion
//#region src/credentials/env.ts
/**
* Environment-variable credential store.
*
* Read-only. Reads the publisher's identity (the three fields needed to
* answer "who is authenticated?") from environment variables for use in
* CI:
*
*   - `EMDASH_PUBLISHER_DID`        — the publisher DID (required).
*   - `EMDASH_PUBLISHER_HANDLE`     — the publisher handle (required).
*   - `EMDASH_PUBLISHER_PDS`        — the PDS URL (required).
*
* NOTE: this store does NOT carry the OAuth session blob (refresh tokens,
* DPoP keys, PAR state). Those are managed by the OAuth client and keyed
* by DID via its own backing store. Until that backing store has an
* env-var implementation, automated `publish` from CI requires the OAuth
* library's session files to be present on disk too. Plan to add an
* env-var-backed OAuth session store before promoting CI publish out of
* "experimental".
*
* This store throws `ReadOnlyCredentialStoreError` from any mutating method.
* CI workflows that try to log in interactively are misconfigured by
* construction; we want a loud failure rather than silently writing
* credentials onto the runner's filesystem.
*/
const ENV_DID = "EMDASH_PUBLISHER_DID";
const ENV_HANDLE = "EMDASH_PUBLISHER_HANDLE";
const ENV_PDS = "EMDASH_PUBLISHER_PDS";
var EnvCredentialStore = class {
	#env;
	/**
	* Stamped once at construction time so successive reads return the same
	* `updatedAt` -- otherwise `current()` and `get(did)` would disagree about
	* timestamps that were "snapshotted at the same moment", and any caller
	* caching by reference equality would see a fresh object on every read.
	*/
	#createdAt = Date.now();
	constructor(options = {}) {
		this.#env = options.env ?? process.env;
	}
	async current() {
		return this.#read();
	}
	async get(did) {
		const session = this.#read();
		return session && session.did === did ? session : null;
	}
	async list() {
		const session = this.#read();
		return session ? [session] : [];
	}
	async put() {
		throw new ReadOnlyCredentialStoreError("EnvCredentialStore is read-only; CI must provision credentials via env vars, not via login");
	}
	async setCurrent() {
		throw new ReadOnlyCredentialStoreError("EnvCredentialStore has at most one session; setCurrent is not meaningful");
	}
	async remove() {
		throw new ReadOnlyCredentialStoreError("EnvCredentialStore is read-only; rotate credentials by updating env vars instead");
	}
	#read() {
		const did = this.#env[ENV_DID];
		const handle = this.#env[ENV_HANDLE];
		const pds = this.#env[ENV_PDS];
		if (!did || !handle || !pds) return null;
		if (!isDid(did)) throw new Error(`${ENV_DID} is not a valid DID; expected the form "did:method:identifier"`);
		if (!isHandle(handle)) throw new Error(`${ENV_HANDLE} is not a valid handle; expected a domain-like form, e.g. "alice.example.com"`);
		return {
			did,
			handle,
			pds,
			updatedAt: this.#createdAt
		};
	}
};

//#endregion
//#region src/credentials/file.ts
/**
* Filesystem-backed credential store.
*
* Persists publisher sessions to `~/.emdash/credentials.json` with restrictive
* file mode (0600) so other local users on a shared box can't read them.
*
* The file format is a flat versioned envelope -- `{ version, currentDid,
* sessions }`. Only the three known top-level fields are read or written;
* extra top-level fields in an existing file are NOT preserved on
* round-trip. If the format ever evolves, bump `FILE_VERSION` and add a
* migration branch in `#read`.
*
* Forward compatibility: a file with `version > FILE_VERSION` is rejected
* (rather than silently downgraded). An older CLI shouldn't blindly
* overwrite a newer-shaped file with the older shape -- that would lose
* fields a future CLI added.
*
* Session validation: every entry in `sessions` is structurally validated
* (handle, did, pds, plus the OAuth fields the registry client requires).
* A partially-corrupt file is rejected up-front rather than producing
* runtime errors deep in publish.
*
* Atomicity: writes go to a temp file (`credentials.json.tmp`) first and then
* `rename()` over the target. `rename` is atomic on POSIX, so a torn write
* during a crash leaves the previous file intact.
*
* Concurrency: this store does not implement file locking. Concurrent writes
* from two CLI invocations of the same publisher could race, with the last
* writer winning. That's acceptable for an interactive tool; CI should use
* `EnvCredentialStore` instead.
*/
/** Current on-disk schema version. Bump only on breaking format changes. */
const FILE_VERSION = 1;
const DEFAULT_PATH = join(homedir(), ".emdash", "credentials.json");
var FileCredentialStore = class {
	path;
	constructor(options = {}) {
		this.path = options.path ?? DEFAULT_PATH;
	}
	async current() {
		const envelope = await this.#read();
		if (!envelope.currentDid) return null;
		return envelope.sessions[envelope.currentDid] ?? null;
	}
	async get(did) {
		return (await this.#read()).sessions[did] ?? null;
	}
	async list() {
		const envelope = await this.#read();
		return Object.values(envelope.sessions);
	}
	async put(session) {
		if (!isPublisherSession(session)) throw new Error(`refusing to persist invalid PublisherSession (${safeStringify(session)}). did, handle, pds, updatedAt are all required; did and pds must be non-empty.`);
		const envelope = await this.#read();
		envelope.sessions[session.did] = { ...session };
		if (!envelope.currentDid) envelope.currentDid = session.did;
		await this.#write(envelope);
	}
	async setCurrent(did) {
		const envelope = await this.#read();
		if (!envelope.sessions[did]) throw new Error(`no stored session for ${did}`);
		envelope.currentDid = did;
		await this.#write(envelope);
	}
	async remove(did) {
		const envelope = await this.#read();
		delete envelope.sessions[did];
		if (envelope.currentDid === did) envelope.currentDid = null;
		await this.#write(envelope);
	}
	async #read() {
		let raw;
		try {
			raw = await readFile(this.path, "utf8");
		} catch (error) {
			if (isErrnoException(error) && error.code === "ENOENT") return {
				version: FILE_VERSION,
				currentDid: null,
				sessions: emptySessionsMap()
			};
			throw error;
		}
		let parsed;
		try {
			parsed = JSON.parse(raw);
		} catch (error) {
			throw new Error(`credential store at ${this.path} is not valid JSON; refusing to overwrite. delete it manually if it is corrupted.`, { cause: error });
		}
		if (!isFileEnvelope(parsed)) throw new Error(`credential store at ${this.path} has an unrecognised shape; refusing to overwrite.`);
		if (!Number.isInteger(parsed.version) || parsed.version < 1 || parsed.version > FILE_VERSION) throw new Error(`credential store at ${this.path} has version ${parsed.version}; this CLI understands versions 1..${FILE_VERSION}. Upgrade emdash-plugin or remove the file manually.`);
		const sessions = emptySessionsMap();
		for (const [k, v] of Object.entries(parsed.sessions)) sessions[k] = v;
		return {
			version: parsed.version,
			currentDid: parsed.currentDid,
			sessions
		};
	}
	async #write(envelope) {
		const dir = dirname(this.path);
		await mkdir(dir, {
			recursive: true,
			mode: 448
		});
		const tmp = `${this.path}.tmp`;
		const body = `${JSON.stringify(envelope, null, 2)}\n`;
		try {
			await writeFile(tmp, body, {
				mode: 384,
				flush: true
			});
			await rename(tmp, this.path);
			await fsyncDir(dir).catch(() => {});
		} catch (error) {
			await unlink(tmp).catch(() => {});
			throw error;
		}
	}
};
/**
* JSON.stringify with a fallback for circular structures. Used in error
* messages where we'd rather show "[unserializable]" than throw out of a
* throw site.
*/
function safeStringify(value) {
	try {
		return JSON.stringify(value);
	} catch {
		return "[unserializable]";
	}
}
/**
* Allocate an empty sessions map with no prototype, so bracket access on
* unknown keys (e.g. an attacker-supplied `currentDid: "toString"`) can't
* resolve through `Object.prototype`. The `setPrototypeOf` trick keeps a
* concrete `Record<string, PublisherSession>` in the type system without
* needing a runtime cast.
*/
function emptySessionsMap() {
	const obj = {};
	Object.setPrototypeOf(obj, null);
	return obj;
}
/**
* fsync a directory so a rename inside it is durable. Node lacks a direct
* `fs.fsyncDir`; the workaround is `open(dir, 'r')` then `handle.sync()`.
*/
async function fsyncDir(path) {
	const handle = await open(path, "r");
	try {
		await handle.sync();
	} finally {
		await handle.close();
	}
}
function isErrnoException(error) {
	return error instanceof Error && "code" in error && typeof error.code === "string";
}
function isFileEnvelope(input) {
	if (!isRecord(input)) return false;
	if (typeof input.version !== "number") return false;
	if (input.currentDid !== null && !isDid(input.currentDid)) return false;
	if (!isRecord(input.sessions)) return false;
	for (const [key, session] of Object.entries(input.sessions)) {
		if (!isPublisherSession(session)) return false;
		if (session.did !== key) return false;
	}
	if (input.currentDid !== null && !Object.hasOwn(input.sessions, input.currentDid)) return false;
	return true;
}
/** Plain-object guard. Distinguishes objects from null/arrays. */
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Structural check for a PublisherSession. */
function isPublisherSession(value) {
	if (!isRecord(value)) return false;
	if (!isDid(value.did)) return false;
	if (value.handle !== null && (typeof value.handle !== "string" || value.handle.length === 0)) return false;
	if (typeof value.pds !== "string" || value.pds.length === 0) return false;
	if (typeof value.updatedAt !== "number" || !Number.isFinite(value.updatedAt)) return false;
	return true;
}

//#endregion
//#region src/credentials/memory.ts
var MemoryCredentialStore = class {
	#sessions = /* @__PURE__ */ new Map();
	#currentDid = null;
	async current() {
		if (!this.#currentDid) return null;
		return this.#sessions.get(this.#currentDid) ?? null;
	}
	async get(did) {
		return this.#sessions.get(did) ?? null;
	}
	async list() {
		return [...this.#sessions.values()];
	}
	async put(session) {
		this.#sessions.set(session.did, { ...session });
		if (!this.#currentDid) this.#currentDid = session.did;
	}
	async setCurrent(did) {
		if (!this.#sessions.has(did)) throw new Error(`no stored session for ${did}`);
		this.#currentDid = did;
	}
	async remove(did) {
		this.#sessions.delete(did);
		if (this.#currentDid === did) this.#currentDid = null;
	}
};

//#endregion
export { ReadOnlyCredentialStoreError as i, FileCredentialStore as n, EnvCredentialStore as r, MemoryCredentialStore as t };
//# sourceMappingURL=memory-CIuLotqL.js.map