/**
 * GET /_emdash/api/auth/signup/verify
 *
 * Validate a signup verification token (called when user clicks email link).
 * Returns the email and role for the UI to display.
 */

import type { APIRoute } from "astro";

export const prerender = false;

import { validateSignupToken, SignupError, roleFromLevel } from "@emdash-cms/auth";
import { createKyselyAdapter } from "@emdash-cms/auth/adapters/kysely";

import { apiError, apiSuccess, handleError } from "#api/error.js";

export const GET: APIRoute = async ({ url, locals }) => {
	const { emdash } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	const token = url.searchParams.get("token");

	if (!token) {
		return apiError("MISSING_PARAM", "Token is required", 400);
	}

	try {
		const adapter = createKyselyAdapter(emdash.db);
		const result = await validateSignupToken(adapter, token);

		return apiSuccess({
			success: true,
			email: result.email,
			role: result.role,
			roleName: roleFromLevel(result.role),
		});
	} catch (error) {
		if (error instanceof SignupError) {
			const statusMap: Record<string, number> = {
				invalid_token: 404,
				token_expired: 410,
				user_exists: 409,
				domain_not_allowed: 403,
			};
			return apiError(error.code.toUpperCase(), error.message, statusMap[error.code] ?? 400);
		}

		return handleError(error, "Failed to validate signup token", "SIGNUP_VERIFY_ERROR");
	}
};
