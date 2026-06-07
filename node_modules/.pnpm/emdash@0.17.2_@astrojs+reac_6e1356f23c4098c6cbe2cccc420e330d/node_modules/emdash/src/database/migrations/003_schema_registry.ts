import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Migration: Schema Registry Tables
 *
 * Creates the schema registry tables that store collection and field definitions.
 * This enables dynamic schema management where D1 is the source of truth.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Collection definitions (like WordPress post types, but stored in DB)
	await db.schema
		.createTable("_emdash_collections")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("slug", "text", (col) => col.notNull().unique())
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("label_singular", "text")
		.addColumn("description", "text")
		.addColumn("icon", "text")
		.addColumn("supports", "text") // JSON array: ["revisions", "drafts", "preview"]
		.addColumn("source", "text") // 'template:blog', 'import:wordpress', 'manual'
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.execute();

	// Field definitions for each collection
	await db.schema
		.createTable("_emdash_fields")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("collection_id", "text", (col) => col.notNull())
		.addColumn("slug", "text", (col) => col.notNull())
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("type", "text", (col) => col.notNull()) // 'string', 'number', 'boolean', 'portableText', etc.
		.addColumn("column_type", "text", (col) => col.notNull()) // 'TEXT', 'REAL', 'INTEGER', 'JSON'
		.addColumn("required", "integer", (col) => col.defaultTo(0)) // boolean as 0/1
		.addColumn("unique", "integer", (col) => col.defaultTo(0)) // boolean as 0/1
		.addColumn("default_value", "text") // JSON-encoded default
		.addColumn("validation", "text") // JSON: { min: 0, max: 100, pattern: "^[a-z]+$" }
		.addColumn("widget", "text") // UI widget hint: 'textarea', 'richtext', 'select'
		.addColumn("options", "text") // JSON: widget-specific config
		.addColumn("sort_order", "integer", (col) => col.defaultTo(0))
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addForeignKeyConstraint(
			"fields_collection_fk",
			["collection_id"],
			"_emdash_collections",
			["id"],
			(cb) => cb.onDelete("cascade"),
		)
		.execute();

	// Unique constraint on collection + field slug
	await db.schema
		.createIndex("idx_fields_collection_slug")
		.on("_emdash_fields")
		.columns(["collection_id", "slug"])
		.unique()
		.execute();

	// Index for faster field lookups
	await db.schema
		.createIndex("idx_fields_collection")
		.on("_emdash_fields")
		.column("collection_id")
		.execute();

	// Index for sorting
	await db.schema
		.createIndex("idx_fields_sort")
		.on("_emdash_fields")
		.columns(["collection_id", "sort_order"])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_fields").execute();
	await db.schema.dropTable("_emdash_collections").execute();
}
