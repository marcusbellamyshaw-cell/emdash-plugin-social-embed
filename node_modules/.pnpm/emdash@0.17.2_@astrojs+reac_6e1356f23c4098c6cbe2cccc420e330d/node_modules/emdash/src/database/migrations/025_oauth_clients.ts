import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Migration: Create OAuth clients table
 *
 * Implements the oauth_clients registry so that the authorization endpoint
 * can validate client_id and enforce a per-client redirect URI allowlist.
 *
 * Each client has a set of pre-registered redirect URIs (JSON array).
 * The authorize endpoint rejects any redirect_uri not in the client's list.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable("_emdash_oauth_clients")
		.addColumn("id", "text", (col) => col.primaryKey()) // Client ID (e.g. URL or opaque string)
		.addColumn("name", "text", (col) => col.notNull()) // Human-readable name
		.addColumn("redirect_uris", "text", (col) => col.notNull()) // JSON array of allowed redirect URIs
		.addColumn("scopes", "text") // JSON array of allowed scopes (null = all)
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_oauth_clients").execute();
}
