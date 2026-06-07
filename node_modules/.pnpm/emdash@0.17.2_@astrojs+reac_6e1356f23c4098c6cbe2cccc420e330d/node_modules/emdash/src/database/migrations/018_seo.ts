import type { Kysely } from "kysely";
import { sql } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Migration: SEO support
 *
 * Creates:
 * - `_emdash_seo` table: per-content SEO metadata (separate from content tables)
 * - `has_seo` column on `_emdash_collections`: opt-in flag per collection
 *
 * SEO is not a universal concern — only collections representing web pages
 * need it. The `has_seo` flag controls whether the admin shows SEO fields
 * and whether the collection's content appears in sitemaps.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Create the SEO table
	await db.schema
		.createTable("_emdash_seo")
		.addColumn("collection", "text", (col) => col.notNull())
		.addColumn("content_id", "text", (col) => col.notNull())
		.addColumn("seo_title", "text")
		.addColumn("seo_description", "text")
		.addColumn("seo_image", "text")
		.addColumn("seo_canonical", "text")
		.addColumn("seo_no_index", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("created_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.notNull().defaultTo(currentTimestamp(db)))
		.addPrimaryKeyConstraint("_emdash_seo_pk", ["collection", "content_id"])
		.execute();

	// Index for batch lookups by collection (PK covers point lookups).
	// Sitemap queries join on (collection, content_id) which the PK covers,
	// and filter seo_no_index. This index supports getMany() batch queries.
	await sql`
		CREATE INDEX idx_emdash_seo_collection
		ON _emdash_seo (collection)
	`.execute(db);

	// Add has_seo flag to collections
	await sql`
		ALTER TABLE _emdash_collections
		ADD COLUMN has_seo INTEGER NOT NULL DEFAULT 0
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await sql`DROP TABLE IF EXISTS _emdash_seo`.execute(db);

	// SQLite doesn't support DROP COLUMN before 3.35.0, but D1 does
	await sql`
		ALTER TABLE _emdash_collections
		DROP COLUMN has_seo
	`.execute(db);
}
