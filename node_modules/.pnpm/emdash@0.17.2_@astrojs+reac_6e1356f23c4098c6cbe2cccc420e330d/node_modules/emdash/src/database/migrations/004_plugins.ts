import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Migration: Plugin System Tables
 *
 * Creates the plugin storage table and plugin state tracking.
 * Plugin storage uses a document store with declared indexes.
 *
 * @see PLUGIN-SYSTEM.md § Plugin Storage
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Core storage table for plugin documents
	await db.schema
		.createTable("_plugin_storage")
		.addColumn("plugin_id", "text", (col) => col.notNull())
		.addColumn("collection", "text", (col) => col.notNull())
		.addColumn("id", "text", (col) => col.notNull())
		.addColumn("data", "text", (col) => col.notNull()) // JSON
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addPrimaryKeyConstraint("pk_plugin_storage", ["plugin_id", "collection", "id"])
		.execute();

	// Base index for listing
	await db.schema
		.createIndex("idx_plugin_storage_list")
		.on("_plugin_storage")
		.columns(["plugin_id", "collection", "created_at"])
		.execute();

	// Plugin state tracking for lifecycle hooks
	await db.schema
		.createTable("_plugin_state")
		.addColumn("plugin_id", "text", (col) => col.primaryKey())
		.addColumn("version", "text", (col) => col.notNull())
		.addColumn("status", "text", (col) => col.notNull().defaultTo("installed")) // installed, active, inactive
		.addColumn("installed_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("activated_at", "text")
		.addColumn("deactivated_at", "text")
		.addColumn("data", "text") // JSON for plugin-specific state
		.execute();

	// Index tracking for dynamic expression indexes on plugin storage
	// This tracks which indexes have been created so we can manage them
	await db.schema
		.createTable("_plugin_indexes")
		.addColumn("plugin_id", "text", (col) => col.notNull())
		.addColumn("collection", "text", (col) => col.notNull())
		.addColumn("index_name", "text", (col) => col.notNull())
		.addColumn("fields", "text", (col) => col.notNull()) // JSON array of field paths
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addPrimaryKeyConstraint("pk_plugin_indexes", ["plugin_id", "collection", "index_name"])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_plugin_indexes").execute();
	await db.schema.dropTable("_plugin_state").execute();
	await db.schema.dropTable("_plugin_storage").execute();
}
