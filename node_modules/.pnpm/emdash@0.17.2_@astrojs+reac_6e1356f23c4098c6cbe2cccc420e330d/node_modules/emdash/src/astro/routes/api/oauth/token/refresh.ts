/**
 * POST /_emdash/api/oauth/token/refresh
 *
 * Exchange a refresh token for a new access token.
 * This is an unauthenticated endpoint (the caller presents the refresh token).
 */

import type { APIRoute } from "astro";
import { z } from "zod";

import { apiError, handleError, unwrapResult } from "#api/error.js";
import { handleTokenRefresh } from "#api/handlers/device-flow.js";
import { isParseError, parseBody } from "#api/parse.js";

export const prerender = false;

const refreshSchema = z.object({
	refresh_token: z.string().min(1),
	grant_type: z.string().min(1),
});

export const POST: APIRoute = async ({ request, locals }) => {
	const { emdash } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	try {
		const body = await parseBody(request, refreshSchema);
		if (isParseError(body)) return body;

		const result = await handleTokenRefresh(emdash.db, body);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to refresh token", "TOKEN_REFRESH_ERROR");
	}
};
