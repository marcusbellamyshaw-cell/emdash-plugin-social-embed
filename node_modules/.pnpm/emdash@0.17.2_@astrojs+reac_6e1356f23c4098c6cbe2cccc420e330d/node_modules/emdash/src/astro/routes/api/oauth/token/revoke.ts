/**
 * POST /_emdash/api/oauth/token/revoke
 *
 * Revoke an access or refresh token (RFC 7009).
 * Always returns 200, even for invalid tokens.
 * This is an unauthenticated endpoint (the caller presents the token to revoke).
 */

import type { APIRoute } from "astro";
import { z } from "zod";

import { apiError, handleError, unwrapResult } from "#api/error.js";
import { handleTokenRevoke } from "#api/handlers/device-flow.js";
import { isParseError, parseBody } from "#api/parse.js";

export const prerender = false;

const revokeSchema = z.object({
	token: z.string().min(1),
});

export const POST: APIRoute = async ({ request, locals }) => {
	const { emdash } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	try {
		const body = await parseBody(request, revokeSchema);
		if (isParseError(body)) return body;

		const result = await handleTokenRevoke(emdash.db, body);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to revoke token", "TOKEN_REVOKE_ERROR");
	}
};
