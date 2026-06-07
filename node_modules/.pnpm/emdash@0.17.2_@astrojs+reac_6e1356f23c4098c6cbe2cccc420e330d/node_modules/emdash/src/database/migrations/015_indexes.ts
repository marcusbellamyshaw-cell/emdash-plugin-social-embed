import type { Kysely } from "kysely";
import { sql } from "kysely";

import { listTablesLike } from "../dialect-helpers.js";

/**
 * Add performance indexes for common query patterns.
 *
 * Covers:
 * 1. Media table: mime_type, filename, created_at
 * 2. content_taxonomies: reverse lookup by taxonomy_id
 * 3. taxonomies: parent_id FK
 * 4. audit_logs: compound (resource_type, resource_id)
 * 5. Retroactive author_id + updated_at on existing ec_* content tables
 *    (new tables get these from createContentTable() in registry.ts)
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// ── Media indexes ────────────────────────────────────────────────
	await db.schema.createIndex("idx_media_mime_type").on("media").column("mime_type").execute();
	await db.schema.createIndex("idx_media_filename").on("media").column("filename").execute();
	await db.schema.createIndex("idx_media_created_at").on("media").column("created_at").execute();

	// ── Taxonomy indexes ─────────────────────────────────────────────
	// Reverse lookup: find entries with a specific term
	await db.schema
		.createIndex("idx_content_taxonomies_term")
		.on("content_taxonomies")
		.column("taxonomy_id")
		.execute();

	// Hierarchical queries filter on parent_id FK
	await db.schema
		.createIndex("idx_taxonomies_parent")
		.on("taxonomies")
		.column("parent_id")
		.execute();

	// ── Audit log indexes ────────────────────────────────────────────
	// findByResource() compound query
	await db.schema
		.createIndex("idx_audit_resource")
		.on("audit_logs")
		.columns(["resource_type", "resource_id"])
		.execute();

	// ── Retroactive content table indexes ────────────────────────────
	// Add author_id and updated_at indexes to all existing ec_* tables.
	// New tables created after this migration get these from createContentTable().
	const tableNames = await listTablesLike(db, "ec_%");

	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_author`)} 
			ON ${sql.ref(table.name)} (author_id)
		`.execute(db);

		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_updated`)} 
			ON ${sql.ref(table.name)} (updated_at)
		`.execute(db);
	}
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// Drop retroactive content table indexes
	const tableNames = await listTablesLike(db, "ec_%");

	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_updated`)}`.execute(db);
		await sql`DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_author`)}`.execute(db);
	}

	// Drop system table indexes
	await db.schema.dropIndex("idx_audit_resource").execute();
	await db.schema.dropIndex("idx_taxonomies_parent").execute();
	await db.schema.dropIndex("idx_content_taxonomies_term").execute();
	await db.schema.dropIndex("idx_media_created_at").execute();
	await db.schema.dropIndex("idx_media_filename").execute();
	await db.schema.dropIndex("idx_media_mime_type").execute();
}
