/**
 * Bulk comment operations
 *
 * POST /_emdash/api/admin/comments/bulk - Bulk status change or delete
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { handleError, requireDb, unwrapResult } from "#api/error.js";
import { handleCommentBulk } from "#api/handlers/comments.js";
import { isParseError, parseBody } from "#api/parse.js";
import { commentBulkBody } from "#api/schemas.js";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
	const { emdash, user } = locals;

	const dbErr = requireDb(emdash?.db);
	if (dbErr) return dbErr;

	try {
		const body = await parseBody(request, commentBulkBody);
		if (isParseError(body)) return body;

		// Bulk delete requires ADMIN, bulk status change requires EDITOR
		if (body.action === "delete") {
			const denied = requirePerm(user, "comments:delete");
			if (denied) return denied;
		} else {
			const denied = requirePerm(user, "comments:moderate");
			if (denied) return denied;
		}

		const result = await handleCommentBulk(emdash.db, body.ids, body.action);

		return unwrapResult(result);
	} catch (error) {
		return handleError(error, "Failed to perform bulk operation", "COMMENT_BULK_ERROR");
	}
};
