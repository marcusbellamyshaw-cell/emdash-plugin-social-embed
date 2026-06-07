/**
 * Search stats endpoint
 *
 * GET /_emdash/api/search/stats
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, apiSuccess, handleError } from "#api/error.js";
import { getSearchStats } from "#search/index.js";

export const prerender = false;

/**
 * Get search index statistics
 */
export const GET: APIRoute = async ({ locals }) => {
	const { emdash, user } = locals;

	const denied = requirePerm(user, "search:manage");
	if (denied) return denied;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash not configured", 500);
	}

	try {
		const stats = await getSearchStats(emdash.db);

		return apiSuccess(stats);
	} catch (error) {
		return handleError(error, "Failed to get stats", "STATS_ERROR");
	}
};
