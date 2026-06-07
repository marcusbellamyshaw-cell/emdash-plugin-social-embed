import { type Kysely, sql } from "kysely";

/**
 * Migration: Remove section categories
 *
 * Section categories had a complete backend but no UI to create or manage them.
 * Rather than building the missing UI for a feature with very little need at this stage,
 * we're removing the feature entirely.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Drop index before column — SQLite requires this order
	await db.schema.dropIndex("idx_sections_category").ifExists().execute();

	await db.schema.alterTable("_emdash_sections").dropColumn("category_id").execute();

	await db.schema.dropTable("_emdash_section_categories").execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// Recreate section categories table
	await db.schema
		.createTable("_emdash_section_categories")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("slug", "text", (col) => col.notNull().unique())
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("sort_order", "integer", (col) => col.defaultTo(0))
		.addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
		.execute();

	// Re-add category_id column to sections
	await db.schema
		.alterTable("_emdash_sections")
		.addColumn("category_id", "text", (col) =>
			col.references("_emdash_section_categories.id").onDelete("set null"),
		)
		.execute();

	await db.schema
		.createIndex("idx_sections_category")
		.on("_emdash_sections")
		.columns(["category_id"])
		.execute();
}
