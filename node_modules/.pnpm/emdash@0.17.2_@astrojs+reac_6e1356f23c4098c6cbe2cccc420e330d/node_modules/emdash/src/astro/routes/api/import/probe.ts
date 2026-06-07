/**
 * URL probe endpoint
 *
 * POST /_emdash/api/import/probe
 *
 * Probes a URL to detect what import source can handle it.
 */

import type { APIRoute } from "astro";

import { requirePerm } from "#api/authorize.js";
import { apiError, apiSuccess, handleError } from "#api/error.js";
import { isParseError, parseBody } from "#api/parse.js";
import { importProbeBody } from "#api/schemas.js";
import { probeUrl, type ProbeResult } from "#import/index.js";
import { SsrfError } from "#import/ssrf.js";

export const prerender = false;

export interface ProbeResponse {
	success: boolean;
	result?: ProbeResult;
	error?: { message: string };
}

export const POST: APIRoute = async ({ request, locals }) => {
	const { user } = locals;
	const denied = requirePerm(user, "import:execute");
	if (denied) return denied;

	try {
		const body = await parseBody(request, importProbeBody);
		if (isParseError(body)) return body;

		const result = await probeUrl(body.url);

		return apiSuccess({
			success: true,
			result,
		});
	} catch (error) {
		if (error instanceof SsrfError) {
			return apiError("SSRF_BLOCKED", error.message, 400);
		}
		return handleError(error, "Failed to probe URL", "PROBE_ERROR");
	}
};
