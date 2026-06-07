/**
 * Resolve the canonical site base URL for use in outbound links (emails, etc.).
 *
 * Uses the stored `emdash:site_url` (set during setup on the real domain)
 * so that Host header spoofing in later requests cannot redirect users to
 * attacker-controlled domains.
 *
 * Falls back to the request URL only if no stored value exists (pre-setup).
 */

import type { Kysely } from "kysely";

import { OptionsRepository } from "../database/repositories/options.js";
import type { Database } from "../database/types.js";

export async function getSiteBaseUrl(db: Kysely<Database>, request: Request): Promise<string> {
	const options = new OptionsRepository(db);
	const storedUrl = await options.get<string>("emdash:site_url");
	if (storedUrl) {
		return `${storedUrl}/_emdash`;
	}
	// Fallback: derive from request (only reached before setup completes)
	const url = new URL(request.url);
	return `${url.protocol}//${url.host}/_emdash`;
}
