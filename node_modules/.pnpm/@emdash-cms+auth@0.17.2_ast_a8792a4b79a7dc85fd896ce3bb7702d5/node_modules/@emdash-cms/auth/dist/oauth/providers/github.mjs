import { z } from "zod";

//#region src/oauth/providers/github.ts
/**
* GitHub OAuth provider
*/
const gitHubUserSchema = z.object({
	id: z.number(),
	login: z.string(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	avatar_url: z.string()
});
const gitHubEmailSchema = z.object({
	email: z.string(),
	primary: z.boolean(),
	verified: z.boolean()
});
const github = {
	name: "github",
	authorizeUrl: "https://github.com/login/oauth/authorize",
	tokenUrl: "https://github.com/login/oauth/access_token",
	userInfoUrl: "https://api.github.com/user",
	scopes: ["read:user", "user:email"],
	parseProfile(data) {
		const user = gitHubUserSchema.parse(data);
		return {
			id: String(user.id),
			email: user.email || "",
			name: user.name,
			avatarUrl: user.avatar_url,
			emailVerified: true
		};
	}
};
/**
* Fetch the user's primary email from GitHub
* (needed because email may not be returned in the basic user endpoint)
*/
async function fetchGitHubEmail(accessToken) {
	const response = await fetch("https://api.github.com/user/emails", { headers: {
		Authorization: `Bearer ${accessToken}`,
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "emdash-cms"
	} });
	if (!response.ok) throw new Error(`Failed to fetch GitHub emails: ${response.status}`);
	const json = await response.json();
	const primary = z.array(gitHubEmailSchema).parse(json).find((e) => e.primary && e.verified);
	if (!primary) throw new Error("No verified primary email found on GitHub account");
	return primary.email;
}

//#endregion
export { fetchGitHubEmail, github };
//# sourceMappingURL=github.mjs.map