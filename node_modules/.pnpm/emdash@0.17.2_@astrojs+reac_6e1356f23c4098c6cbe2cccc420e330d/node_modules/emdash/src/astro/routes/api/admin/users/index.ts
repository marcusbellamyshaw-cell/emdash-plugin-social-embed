/**
 * User management list endpoint
 *
 * GET /_emdash/api/admin/users - List users with search, filter, pagination
 */

import { Role } from "@emdash-cms/auth";
import { createKyselyAdapter } from "@emdash-cms/auth/adapters/kysely";
import type { APIRoute } from "astro";

import { apiError, apiSuccess, handleError } from "#api/error.js";
import { isParseError, parseQuery } from "#api/parse.js";
import { usersListQuery } from "#api/schemas.js";

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "EmDash is not initialized", 500);
	}

	if (!user || user.role < Role.ADMIN) {
		return apiError("FORBIDDEN", "Admin privileges required", 403);
	}

	const adapter = createKyselyAdapter(emdash.db);

	try {
		// Parse query parameters
		const query = parseQuery(url, usersListQuery);
		if (isParseError(query)) return query;

		// Fetch users
		const result = await adapter.getUsers({
			search: query.search,
			role: query.role ? parseInt(query.role, 10) : undefined,
			cursor: query.cursor,
			limit: query.limit,
		});

		// Transform dates to ISO strings for JSON serialization
		const items = result.items.map((u) => ({
			id: u.id,
			email: u.email,
			name: u.name,
			avatarUrl: u.avatarUrl,
			role: u.role,
			emailVerified: u.emailVerified,
			disabled: u.disabled,
			createdAt: u.createdAt.toISOString(),
			updatedAt: u.updatedAt.toISOString(),
			lastLogin: u.lastLogin?.toISOString() ?? null,
			credentialCount: u.credentialCount,
			oauthProviders: u.oauthProviders,
		}));

		return apiSuccess({
			items,
			nextCursor: result.nextCursor,
		});
	} catch (error) {
		return handleError(error, "Failed to list users", "USER_LIST_ERROR");
	}
};
