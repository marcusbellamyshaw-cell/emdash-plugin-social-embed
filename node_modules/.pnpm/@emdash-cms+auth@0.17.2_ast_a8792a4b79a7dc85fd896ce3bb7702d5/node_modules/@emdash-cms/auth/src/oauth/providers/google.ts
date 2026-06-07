/**
 * Google OAuth provider (using OIDC)
 */

import { z } from "zod";

import type { OAuthProvider, OAuthProfile } from "../types.js";

const googleUserSchema = z.object({
	sub: z.string(),
	email: z.string(),
	email_verified: z.boolean(),
	name: z.string(),
	picture: z.string(),
});

export const google: OAuthProvider = {
	name: "google",
	authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
	tokenUrl: "https://oauth2.googleapis.com/token",
	userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
	scopes: ["openid", "email", "profile"],

	parseProfile(data: unknown): OAuthProfile {
		const user = googleUserSchema.parse(data);
		return {
			id: user.sub,
			email: user.email,
			name: user.name,
			avatarUrl: user.picture,
			emailVerified: user.email_verified,
		};
	},
};
