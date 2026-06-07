import { execFile } from "node:child_process";
import { promisify } from "node:util";

//#region src/client/cf-access.ts
/**
* Custom headers + Cloudflare Access support for the EmDash client.
*
* Two concerns live here:
*
* 1. **Custom headers** — injects user-provided headers on every request.
*    Used for reverse proxy auth (CF Access service tokens, Tailscale, etc.)
*    Headers come from three sources (all merged, later wins):
*    - EMDASH_HEADERS env var (newline-separated "Name: Value" pairs)
*    - --header CLI flags (repeatable, "Name: Value" format)
*    - Stored credentials (persisted during `emdash login --header`)
*
* 2. **Cloudflare Access detection** — when the login command hits an Access
*    redirect, it tries `cloudflared access token` for a cached JWT, or
*    prompts the user to run `cloudflared access login <url>`.
*
* @example CF Access service token:
*   emdash login --url https://cms.example.com \
*     --header "CF-Access-Client-Id: xxx" \
*     --header "CF-Access-Client-Secret: yyy"
*
* @example Via env var:
*   EMDASH_HEADERS="CF-Access-Client-Id: xxx\nCF-Access-Client-Secret: yyy"
*/
const execFileAsync = promisify(execFile);
/**
* Parse a single "Name: Value" header string. Returns null if malformed.
*/
function parseHeaderLine(line) {
	const idx = line.indexOf(":");
	if (idx === -1) return null;
	const name = line.slice(0, idx).trim();
	const value = line.slice(idx + 1).trim();
	if (!name) return null;
	return [name, value];
}
/**
* Parse headers from the EMDASH_HEADERS env var.
* Format: newline-separated "Name: Value" pairs.
* Blank lines and malformed entries are silently skipped.
*/
function parseHeadersFromEnv() {
	const raw = process.env["EMDASH_HEADERS"];
	if (!raw) return {};
	return parseHeaderStrings(raw.split("\n"));
}
/**
* Parse an array of "Name: Value" strings into a headers record.
* Malformed entries are silently skipped. Later values override earlier ones.
*/
function parseHeaderStrings(headers) {
	const result = {};
	for (const h of headers) {
		const parsed = parseHeaderLine(h);
		if (parsed) result[parsed[0]] = parsed[1];
	}
	return result;
}
/**
* Collect all --header flag values from process.argv.
*
* citty doesn't support repeatable string args, so we parse argv directly.
* Handles both `--header "Name: Value"` and `--header="Name: Value"`.
*/
function parseHeadersFromArgv() {
	const headers = [];
	const argv = process.argv;
	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];
		if (arg === "--header" || arg === "-H") {
			const next = argv[i + 1];
			if (next && !next.startsWith("-")) {
				headers.push(next);
				i++;
			}
		} else if (arg.startsWith("--header=")) headers.push(arg.slice(9));
		else if (arg.startsWith("-H=")) headers.push(arg.slice(3));
	}
	return headers;
}
/**
* Resolve custom headers from all sources.
* Priority: env var < CLI flags (later wins).
*/
function resolveCustomHeaders() {
	const envHeaders = parseHeadersFromEnv();
	const cliHeaders = parseHeaderStrings(parseHeadersFromArgv());
	return {
		...envHeaders,
		...cliHeaders
	};
}
/**
* Creates a transport interceptor that injects custom headers on every request.
*/
function customHeadersInterceptor(headers) {
	const entries = Object.entries(headers);
	if (entries.length === 0) return (request, next) => next(request);
	return (request, next) => {
		const h = new Headers(request.headers);
		for (const [name, value] of entries) h.set(name, value);
		return next(new Request(request, { headers: h }));
	};
}
/**
* Creates a fetch wrapper that injects custom headers.
* Used by the login command for raw fetch calls before the client is created.
*/
function createHeaderAwareFetch(headers) {
	if (Object.keys(headers).length === 0) return globalThis.fetch.bind(globalThis);
	return (input, init) => {
		const h = new Headers(init?.headers);
		for (const [name, value] of Object.entries(headers)) h.set(name, value);
		return globalThis.fetch(input, {
			...init,
			headers: h
		});
	};
}
const ACCESS_LOGIN_PATTERN = /cloudflareaccess\.com\/cdn-cgi\/access\/login/;
/**
* Check whether a response (fetched with `redirect: "manual"`) is a
* Cloudflare Access redirect.
*/
function isAccessRedirect(response) {
	if (response.status !== 301 && response.status !== 302) return false;
	const location = response.headers.get("location") ?? "";
	return ACCESS_LOGIN_PATTERN.test(location);
}
/**
* Try to get a cached Cloudflare Access JWT via `cloudflared access token`.
*
* Returns the JWT string if cloudflared is installed and has a cached token.
* Returns null if cloudflared is not installed or has no cached token.
*/
async function getCachedAccessToken(appUrl) {
	const origin = new URL(appUrl).origin;
	try {
		const { stdout } = await execFileAsync("cloudflared", [
			"access",
			"token",
			"-app",
			origin
		]);
		return stdout.trim() || null;
	} catch {
		return null;
	}
}
/**
* Launch `cloudflared access login` for interactive browser-based auth.
*
* This opens a browser window for the user to authenticate with their IdP.
* On success, cloudflared caches the JWT locally. Call `getCachedAccessToken`
* afterwards to retrieve it.
*
* Returns true if the command succeeded, false otherwise.
*/
async function runCloudflaredLogin(appUrl) {
	const origin = new URL(appUrl).origin;
	try {
		await execFileAsync("cloudflared", [
			"access",
			"login",
			origin
		]);
		return true;
	} catch {
		return false;
	}
}

//#endregion
export { createHeaderAwareFetch, customHeadersInterceptor, getCachedAccessToken, isAccessRedirect, parseHeaderStrings, parseHeadersFromArgv, parseHeadersFromEnv, resolveCustomHeaders, runCloudflaredLogin };
//# sourceMappingURL=cf-access.mjs.map