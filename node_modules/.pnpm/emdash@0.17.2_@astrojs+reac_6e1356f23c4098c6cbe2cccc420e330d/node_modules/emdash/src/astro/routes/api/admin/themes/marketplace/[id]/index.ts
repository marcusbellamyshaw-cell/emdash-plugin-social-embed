/**
 * Theme marketplace detail proxy endpoint
 *
 * GET /_emdash/api/admin/themes/marketplace/:id - Get theme details
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, unwrapResult } from "#api/error.js";
import { handleThemeGetDetail } from "#api/index.js";

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
	const { emdash, user } = locals;
	const { id } = params;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;

	if (!id) {
		return apiError("INVALID_REQUEST", "Theme ID required", 400);
	}

	const result = await handleThemeGetDetail(emdash.config.marketplace, id);

	return unwrapResult(result);
};
