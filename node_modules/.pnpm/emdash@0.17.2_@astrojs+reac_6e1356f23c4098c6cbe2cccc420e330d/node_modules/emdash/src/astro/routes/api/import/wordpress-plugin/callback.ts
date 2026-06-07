/**
 * WordPress Application Password OAuth callback
 *
 * GET /_emdash/api/import/wordpress-plugin/callback
 *
 * WordPress redirects here after user approves the application password.
 * We receive the credentials and redirect to the admin import UI with a token.
 */

import type { APIRoute } from "astro";

import { encodeBase64 } from "#utils/base64.js";

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
	// WordPress sends these params on success:
	// - site_url: The WordPress site URL
	// - user_login: The username
	// - password: The newly created application password
	//
	// On rejection, it redirects to reject_url (if provided) or just doesn't include credentials

	const siteUrl = url.searchParams.get("site_url");
	const userLogin = url.searchParams.get("user_login");
	const password = url.searchParams.get("password");

	// Check if this is a rejection (no credentials)
	if (!siteUrl || !userLogin || !password) {
		return redirect("/_emdash/admin/import/wordpress?error=auth_rejected");
	}

	// Create the Basic Auth token
	const token = encodeBase64(`${userLogin}:${password}`);

	// Store credentials in a short-lived cookie (5 minutes)
	// This allows the import UI to retrieve them
	const authData = JSON.stringify({
		siteUrl,
		userLogin,
		token,
		timestamp: Date.now(),
	});

	// Base64 encode the auth data for cookie storage
	const encodedAuth = encodeBase64(authData);

	cookies.set("emdash_wp_auth", encodedAuth, {
		path: "/_emdash/",
		maxAge: 300, // 5 minutes
		httpOnly: false, // Needs to be readable by JS
		secure: url.protocol === "https:",
		sameSite: "lax",
	});

	// Redirect to import UI - it will pick up the cookie
	return redirect("/_emdash/admin/import/wordpress?auth=success");
};
