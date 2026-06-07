/**
 * Media Providers List Endpoint
 *
 * GET /_emdash/api/media/providers - List all configured media providers
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, apiSuccess } from "#api/error.js";

export const prerender = false;

/**
 * List all configured media providers
 */
export const GET: APIRoute = async ({ locals }) => {
	const { emdash, user } = locals;

	const denied = requirePerm(user, "media:read");
	if (denied) return denied;

	if (!emdash?.getMediaProviderList) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	const providers = emdash.getMediaProviderList();

	return apiSuccess({ items: providers });
};
