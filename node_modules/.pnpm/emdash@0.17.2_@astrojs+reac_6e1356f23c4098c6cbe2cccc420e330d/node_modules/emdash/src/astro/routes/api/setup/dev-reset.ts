/**
 * POST /_emdash/api/setup/dev-reset
 *
 * Development-only endpoint to reset setup state for testing.
 * Clears the setup_complete flag and deletes all users,
 * returning the site to the pre-setup state.
 *
 * ONLY available when import.meta.env.DEV is true.
 */

import type { APIRoute } from "astro";

export const prerender = false;

import { apiError, apiSuccess, handleError } from "#api/error.js";
import { OptionsRepository } from "#db/repositories/options.js";

export const POST: APIRoute = async ({ locals }) => {
	if (!import.meta.env.DEV) {
		return apiError("FORBIDDEN", "Dev reset is only available in development mode", 403);
	}

	const { emdash } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	try {
		const options = new OptionsRepository(emdash.db);

		await options.delete("emdash:setup_complete");
		await options.delete("emdash:setup_state");
		await emdash.db.deleteFrom("users").execute();

		return apiSuccess({ success: true });
	} catch (error) {
		return handleError(error, "Dev reset failed", "DEV_RESET_ERROR");
	}
};
