/**
 * Marketplace search proxy endpoint
 *
 * GET /_emdash/api/admin/plugins/marketplace - Search marketplace plugins
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, unwrapResult } from "#api/error.js";
import { handleMarketplaceSearch } from "#api/index.js";

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	const denied = requirePerm(user, "plugins:read");
	if (denied) return denied;

	const query = url.searchParams.get("q") ?? undefined;
	const category = url.searchParams.get("category") ?? undefined;
	const cursor = url.searchParams.get("cursor") ?? undefined;
	const limitParam = url.searchParams.get("limit");
	const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10) || 50), 100) : undefined;

	const result = await handleMarketplaceSearch(emdash.config.marketplace, query, {
		category,
		cursor,
		limit,
	});

	return unwrapResult(result);
};
