//#region src/auth/providers/github.ts
/**
* Configure GitHub OAuth as an auth provider.
*
* Requires `EMDASH_OAUTH_GITHUB_CLIENT_ID` and `EMDASH_OAUTH_GITHUB_CLIENT_SECRET`
* (or `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`) environment variables.
*/
function github() {
	return {
		id: "github",
		label: "GitHub",
		adminEntry: "emdash/auth/providers/github-admin"
	};
}

//#endregion
export { github };
//# sourceMappingURL=github.mjs.map