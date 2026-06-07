import { i as ReadOnlyCredentialStoreError, n as FileCredentialStore, r as EnvCredentialStore, t as MemoryCredentialStore } from "../memory-CIuLotqL.js";

//#region src/credentials/index.ts
/**
* Credential storage for the EmDash plugin registry.
*
* This module provides three implementations of `CredentialStore` and a small
* factory that picks the right one based on the runtime environment.
*
* Picking the right store:
*   - In CI, prefer `EnvCredentialStore` (set `EMDASH_PUBLISHER_*` env vars).
*   - On a developer machine, prefer `FileCredentialStore` (default path:
*     `~/.emdash/credentials.json`).
*   - In tests, use `MemoryCredentialStore`.
*
* The `defaultCredentialStore()` helper applies that policy: if the env vars
* are set, it returns the env store; otherwise it falls through to the file
* store.
*/
/**
* Returns the credential store appropriate to the current environment.
*
* If `EMDASH_PUBLISHER_DID`, `EMDASH_PUBLISHER_HANDLE`, and
* `EMDASH_PUBLISHER_PDS` are all set, returns an `EnvCredentialStore`.
* Otherwise returns a `FileCredentialStore` at the default path.
*
* Tests should not use this helper -- they should pass a `MemoryCredentialStore`
* explicitly. Calling this from a test is a code smell.
*/
function defaultCredentialStore(env = process.env) {
	if (env["EMDASH_PUBLISHER_DID"] && env["EMDASH_PUBLISHER_HANDLE"] && env["EMDASH_PUBLISHER_PDS"]) return new EnvCredentialStore({ env });
	return new FileCredentialStore();
}

//#endregion
export { EnvCredentialStore, FileCredentialStore, MemoryCredentialStore, ReadOnlyCredentialStoreError, defaultCredentialStore };
//# sourceMappingURL=index.js.map