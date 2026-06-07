/**
 * GET /_emdash/api/auth/invite/accept
 *
 * Validate an invite token and return invite data for the UI.
 * This is called when the invitee clicks the email link.
 */

import type { APIRoute } from "astro";

export const prerender = false;

import { validateInvite, InviteError, roleFromLevel } from "@emdash-cms/auth";
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
		const invite = await validateInvite(adapter, token);

		return apiSuccess({
			success: true,
			email: invite.email,
			role: invite.role,
			roleName: roleFromLevel(invite.role),
		});
	} catch (error) {
		if (error instanceof InviteError) {
			const statusMap: Record<string, number> = {
				invalid_token: 404,
				token_expired: 410,
				user_exists: 409,
			};
			return apiError(error.code.toUpperCase(), error.message, statusMap[error.code] ?? 400);
		}

		return handleError(error, "Failed to validate invite", "INVITE_VALIDATE_ERROR");
	}
};
