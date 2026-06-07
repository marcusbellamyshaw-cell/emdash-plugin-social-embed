/**
 * GET/POST /_emdash/api/admin/allowed-domains
 *
 * Admin endpoints for managing allowed signup domains.
 * GET - List all allowed domains
 * POST - Add a new allowed domain
 */

import type { APIRoute } from "astro";

export const prerender = false;

import { Role, roleFromLevel } from "@emdash-cms/auth";
import { createKyselyAdapter } from "@emdash-cms/auth/adapters/kysely";

import { apiError, apiSuccess, handleError } from "#api/error.js";
import { isParseError, parseBody } from "#api/parse.js";
import { allowedDomainCreateBody } from "#api/schemas.js";

const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z0-9-]+)+$/;

/**
 * GET - List all allowed domains
 */
export const GET: APIRoute = async ({ locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "Database not configured", 500);
	}

	if (!user || user.role < Role.ADMIN) {
		return apiError("FORBIDDEN", "Admin privileges required", 403);
	}

	const adapter = createKyselyAdapter(emdash.db);

	try {
		const domains = await adapter.getAllowedDomains();

		return apiSuccess({
			domains: domains.map((d) => ({
				domain: d.domain,
				defaultRole: d.defaultRole,
				roleName: roleFromLevel(d.defaultRole),
				enabled: d.enabled,
				createdAt: d.createdAt.toISOString(),
			})),
		});
	} catch (error) {
		return handleError(error, "Failed to list allowed domains", "DOMAIN_LIST_ERROR");
	}
};

/**
 * POST - Add a new allowed domain
 */
export const POST: APIRoute = async ({ request, locals }) => {
	const { emdash, user } = locals;

	if (!emdash?.db) {
		return apiError("NOT_CONFIGURED", "Database not configured", 500);
	}

	if (!user || user.role < Role.ADMIN) {
		return apiError("FORBIDDEN", "Admin privileges required", 403);
	}

	const adapter = createKyselyAdapter(emdash.db);

	try {
		const body = await parseBody(request, allowedDomainCreateBody);
		if (isParseError(body)) return body;

		// Role is already validated as RoleLevel by Zod schema
		const defaultRole = body.defaultRole;

		// Validate domain format (no protocol, just domain)
		const cleanDomain = body.domain.toLowerCase().trim();
		if (!DOMAIN_REGEX.test(cleanDomain)) {
			return apiError("VALIDATION_ERROR", "Invalid domain format", 400);
		}

		// Check if domain already exists
		const existing = await adapter.getAllowedDomain(cleanDomain);
		if (existing) {
			return apiError("CONFLICT", "Domain already exists", 409);
		}

		const domain = await adapter.createAllowedDomain(cleanDomain, defaultRole);

		return apiSuccess(
			{
				success: true,
				domain: {
					domain: domain.domain,
					defaultRole: domain.defaultRole,
					roleName: roleFromLevel(domain.defaultRole),
					enabled: domain.enabled,
					createdAt: domain.createdAt.toISOString(),
				},
			},
			201,
		);
	} catch (error) {
		return handleError(error, "Failed to create allowed domain", "DOMAIN_CREATE_ERROR");
	}
};
