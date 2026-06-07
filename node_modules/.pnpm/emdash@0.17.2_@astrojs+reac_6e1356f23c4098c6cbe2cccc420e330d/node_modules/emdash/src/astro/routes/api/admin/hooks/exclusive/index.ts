/**
 * Exclusive hooks list endpoint
 *
 * GET /_emdash/api/admin/hooks/exclusive
 *
 * Lists all exclusive hooks with their providers and current selections.
 * Requires admin role.
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, apiSuccess, handleError } from "#api/error.js";
import { OptionsRepository } from "#db/repositories/options.js";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	const denied = requirePerm(user, "settings:manage");
	if (denied) return denied;

	try {
		const pipeline = emdash.hooks;
		const exclusiveHookNames = pipeline.getRegisteredExclusiveHooks();
		const optionsRepo = new OptionsRepository(emdash.db);

		const hooks = [];
		for (const hookName of exclusiveHookNames) {
			const providers = pipeline.getExclusiveHookProviders(hookName);
			const selection = await optionsRepo.get<string>(`emdash:exclusive_hook:${hookName}`);

			hooks.push({
				hookName,
				providers: providers.map((provider: { pluginId: string }) => ({
					pluginId: provider.pluginId,
				})),
				selectedPluginId: selection,
			});
		}

		return apiSuccess({ items: hooks });
	} catch (error) {
		return handleError(error, "Failed to list exclusive hooks", "EXCLUSIVE_HOOKS_LIST_ERROR");
	}
};
