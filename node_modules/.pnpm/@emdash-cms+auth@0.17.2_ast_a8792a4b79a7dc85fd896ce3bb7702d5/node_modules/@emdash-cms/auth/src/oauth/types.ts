/**
 * OAuth types
 */

export interface OAuthProfile {
	id: string;
	email: string;
	name: string | null;
	avatarUrl: string | null;
	emailVerified: boolean;
}

export interface OAuthProvider {
	name: string;
	authorizeUrl: string;
	tokenUrl: string;
	userInfoUrl?: string;
	scopes: string[];

	/**
	 * Parse the user profile from the provider's response
	 */
	parseProfile(data: unknown): OAuthProfile;
}

export interface OAuthConfig {
	clientId: string;
	clientSecret: string;
}

export interface OAuthState {
	provider: string;
	redirectUri: string;
	codeVerifier?: string; // For PKCE
	nonce?: string;
}
