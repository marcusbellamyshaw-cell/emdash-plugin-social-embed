import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

export async function up(db: Kysely<unknown>): Promise<void> {
	// Redirect rules table
	await db.schema
		.createTable("_emdash_redirects")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("source", "text", (col) => col.notNull())
		.addColumn("destination", "text", (col) => col.notNull())
		.addColumn("type", "integer", (col) => col.notNull().defaultTo(301))
		.addColumn("is_pattern", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("enabled", "integer", (col) => col.notNull().defaultTo(1))
		.addColumn("hits", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("last_hit_at", "text")
		.addColumn("group_name", "text")
		.addColumn("auto", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.execute();

	// Unique source for exact (non-pattern) rules
	// SQLite doesn't support partial indexes with WHERE on all versions,
	// so we use a regular index and enforce uniqueness in the application layer
	await db.schema
		.createIndex("idx_redirects_source")
		.on("_emdash_redirects")
		.column("source")
		.execute();

	await db.schema
		.createIndex("idx_redirects_enabled")
		.on("_emdash_redirects")
		.column("enabled")
		.execute();

	await db.schema
		.createIndex("idx_redirects_group")
		.on("_emdash_redirects")
		.column("group_name")
		.execute();

	// 404 log table
	await db.schema
		.createTable("_emdash_404_log")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("path", "text", (col) => col.notNull())
		.addColumn("referrer", "text")
		.addColumn("user_agent", "text")
		.addColumn("ip", "text")
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.execute();

	await db.schema.createIndex("idx_404_log_path").on("_emdash_404_log").column("path").execute();

	await db.schema
		.createIndex("idx_404_log_created")
		.on("_emdash_404_log")
		.column("created_at")
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_404_log").execute();
	await db.schema.dropTable("_emdash_redirects").execute();
}
