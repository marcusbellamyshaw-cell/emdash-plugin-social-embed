import { i as __toESM, n as require_valid, r as require_satisfies, t as require_valid$1 } from "../valid-EldeUiw4.js";

//#region src/env/index.ts
var import_satisfies = /* @__PURE__ */ __toESM(require_satisfies(), 1);
var import_valid = /* @__PURE__ */ __toESM(require_valid(), 1);
var import_valid$1 = /* @__PURE__ */ __toESM(require_valid$1(), 1);
/** `env:<name>` keys, where `<name>` is one or more non-colon characters. */
const ENV_KEY_RE = /^env:[^:]+$/;
/** Structural DID shape: `did:<method>:<id>` (forward-compat for package deps). */
const DID_KEY_RE = /^did:[a-z]+:.+$/;
/**
* Build the host-environment map the install/update gate compares a release's
* `requires` against, from the EmDash and Astro versions the host advertises.
*
* An environment whose version is unknown is omitted so the gate skips it
* rather than blocking on a version it can't evaluate: an uncompiled build
* reporting `"dev"` for EmDash, or an unresolved Astro version. Shared by the
* server install/update gate and the admin's client-side compat warning so the
* dev-skip / astro-omit rule lives in exactly one place.
*/
function hostEnvFromVersions(emdashVersion, astroVersion) {
	const host = {};
	if (emdashVersion && emdashVersion !== "dev") host["env:emdash"] = emdashVersion;
	if (astroVersion) host["env:astro"] = astroVersion;
	return host;
}
/**
* Guard the lexicon-`unknown` `requires` value into a string-valued record of
* recognised keys. Drops any entry whose key is not `env:*`/DID-shaped or whose
* value is not a string. Never throws.
*/
function parseRequires(value) {
	if (value === null || typeof value !== "object" || Array.isArray(value)) return {};
	const out = {};
	for (const [key, raw] of Object.entries(value)) {
		if (typeof raw !== "string") continue;
		if (!ENV_KEY_RE.test(key) && !DID_KEY_RE.test(key)) continue;
		out[key] = raw;
	}
	return out;
}
/**
* True when `range` is a syntactically valid version range we can evaluate.
*
* The empty string is rejected: node-semver normalises it to `*` (match any),
* which is never what a publisher means when they write a constraint.
*/
function isValidVersionRange(range) {
	if (range.trim() === "") return false;
	return (0, import_valid$1.default)(range) !== null;
}
/**
* True when `version` satisfies `range`.
*
* Fails open (returns `true`) when either input is unparseable: an unparseable
* host version cannot be proven incompatible, and an unparseable range is
* garbage we decline to enforce. Both cases are non-blocking by design — the
* gate only refuses on a definite mismatch.
*
* `includePrerelease` evaluates a prerelease host version (a beta EmDash/Astro
* build) by its precedence rather than excluding it from release-only ranges.
* Without it, node-semver would refuse `1.0.0-rc.1` against `*` or `>=0.13.0`,
* blocking a prerelease host that is not a definite mismatch.
*/
function satisfiesRange(version, range) {
	if ((0, import_valid.default)(version) === null) return true;
	if ((0, import_valid$1.default)(range) === null) return true;
	return (0, import_satisfies.default)(version, range, { includePrerelease: true });
}
/**
* Compare a release's `requires` against the host environment and return the
* env keys whose host version does not satisfy the required range.
*
* Entries the host doesn't advertise (no known version for that key) are
* skipped — we can't evaluate a constraint against an environment we don't
* know we're running in. The `requires` argument is the raw lexicon-`unknown`
* value; it is guarded internally.
*/
function checkEnvCompatibility(requires, host) {
	const parsed = parseRequires(requires);
	const mismatches = [];
	for (const [key, range] of Object.entries(parsed)) {
		const hostVersion = host[key];
		if (hostVersion === void 0) continue;
		if (!satisfiesRange(hostVersion, range)) mismatches.push({
			key,
			required: range,
			host: hostVersion
		});
	}
	return mismatches;
}
/**
* Find the `env:*` constraints in `requires` that {@link checkEnvCompatibility}
* silently skips because the host can't evaluate them: the host advertises no
* version for that env, or advertises one that isn't parseable semver. These
* are the cases where a hard gate degrades to a no-op, so the server can log
* them rather than bypass silently.
*
* DID-keyed constraints are excluded — those are forward-compat package deps,
* not host environments, and their absence from the host map is expected.
*/
function findSkippedEnvConstraints(requires, host) {
	const parsed = parseRequires(requires);
	const skipped = [];
	for (const [key, range] of Object.entries(parsed)) {
		if (!ENV_KEY_RE.test(key)) continue;
		const hostVersion = host[key];
		if (hostVersion === void 0) skipped.push({
			key,
			required: range,
			reason: "unknown"
		});
		else if ((0, import_valid.default)(hostVersion) === null) skipped.push({
			key,
			required: range,
			reason: "unparseable"
		});
	}
	return skipped;
}

//#endregion
export { checkEnvCompatibility, findSkippedEnvConstraints, hostEnvFromVersions, isValidVersionRange, parseRequires, satisfiesRange };
//# sourceMappingURL=index.js.map