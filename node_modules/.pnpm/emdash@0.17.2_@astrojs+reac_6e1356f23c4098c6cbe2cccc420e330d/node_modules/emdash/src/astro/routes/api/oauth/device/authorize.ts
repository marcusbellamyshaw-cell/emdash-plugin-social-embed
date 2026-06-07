/**
 * POST /_emdash/api/oauth/device/authorize
 *
 * User submits the user code after logging in via the browser.
 * This endpoint requires authentication (the user must be logged in).
 */

/// <reference types="emdash/locals" />

import type { APIRoute } from "astro";
import { z } from "zod";

import { apiError, handleError, unwrapResult } from "#api/error.js";
import { handleDeviceAuthorize } from "#api/handlers/device-flow.js";
import { isParseError, parseBody } from "#api/parse.js";

export const prerender = false;

const authorizeSchema = z.object({
	user_code: z.string().min(1),
	action: z.enum(["approve", "deny"]).optional(),
});

export const POST: APIRoute = async ({ request, locals }) => {
	const { emdash } = locals;
	const { user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	if (!user) {
		return apiError("NOT_AUTHENTICATED", "Authentication required", 401);
	}

	try {
		const body = await parseBody(request, authorizeSchema);
		if (isParseError(body)) return body;

		const result = await handleDeviceAuthorize(emdash.db, user.id, user.role, body);
		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to authorize device", "AUTHORIZE_ERROR");
	}
};
