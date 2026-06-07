import type { Kysely } from "kysely";

/**
 * Migration: Search Support
 *
 * Adds search configuration to collections and searchable flag to fields.
 * FTS5 tables are created dynamically when search is enabled for a collection.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Add search_config to collections (JSON: { enabled, weights })
	await db.schema.alterTable("_emdash_collections").addColumn("search_config", "text").execute();

	// Add searchable flag to fields
	await db.schema
		.alterTable("_emdash_fields")
		.addColumn("searchable", "integer", (col) => col.defaultTo(0))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// SQLite doesn't support DROP COLUMN in older versions, but modern SQLite does
	// These columns are safe to drop
	await db.schema.alterTable("_emdash_fields").dropColumn("searchable").execute();
	await db.schema.alterTable("_emdash_collections").dropColumn("search_config").execute();
}
