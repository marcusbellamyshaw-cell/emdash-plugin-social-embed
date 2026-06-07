/**
 * User enable endpoint
 *
 * POST /_emdash/api/admin/users/:id/enable - Re-enable a disabled user
 */

import { Role } from "@emdash-cms/auth";
import { createKyselyAdapter } from "@emdash-cms/auth/adapters/kysely";
import type { APIRoute } from "astro";

import { apiError, apiSuccess, handleError } from "#api/error.js";

export const prerender = false;

export const POST: APIRoute = async ({ params, locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "Database not configured", 500);
	}

	if (!user || user.role < Role.ADMIN) {
		return apiError("FORBIDDEN", "Admin privileges required", 403);
	}

	const adapter = createKyselyAdapter(emdash.db);

	const { id } = params;

	if (!id) {
		return apiError("VALIDATION_ERROR", "User ID required", 400);
	}

	try {
		// Get target user
		const targetUser = await adapter.getUserById(id);
		if (!targetUser) {
			return apiError("NOT_FOUND", "User not found", 404);
		}

		// Enable user
		await adapter.updateUser(id, { disabled: false });

		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Failed to enable user", "USER_ENABLE_ERROR");
	}
};
