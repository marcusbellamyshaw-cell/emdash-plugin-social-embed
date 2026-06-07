//#region src/auth/providers/google.ts
/**
* Configure Google OAuth as an auth provider.
*
* Requires `EMDASH_OAUTH_GOOGLE_CLIENT_ID` and `EMDASH_OAUTH_GOOGLE_CLIENT_SECRET`
* (or `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`) environment variables.
*/
function google() {
	return {
		id: "google",
		label: "Google",
		adminEntry: "emdash/auth/providers/google-admin"
	};
}

//#endregion
export { google };
//# sourceMappingURL=google.mjs.map