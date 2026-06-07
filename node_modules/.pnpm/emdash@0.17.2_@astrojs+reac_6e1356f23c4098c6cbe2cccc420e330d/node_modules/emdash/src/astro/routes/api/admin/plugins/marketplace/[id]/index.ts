/**
 * Marketplace plugin detail proxy endpoint
 *
 * GET /_emdash/api/admin/plugins/marketplace/:id - Get plugin details
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, unwrapResult } from "#api/error.js";
import { handleMarketplaceGetPlugin } from "#api/index.js";

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
		return apiError("INVALID_REQUEST", "Plugin ID required", 400);
	}

	const result = await handleMarketplaceGetPlugin(emdash.config.marketplace, id);

	return unwrapResult(result);
};
