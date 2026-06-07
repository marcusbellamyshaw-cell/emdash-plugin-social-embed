import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Navigation Menus migration
 *
 * Creates tables for admin-editable navigation menus.
 * Menu items can reference content entries, taxonomy terms, or custom URLs.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Menu definitions
	await db.schema
		.createTable("_emdash_menus")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("name", "text", (col) => col.notNull().unique())
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addColumn("updated_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.execute();

	// Menu items (ordered, hierarchical)
	await db.schema
		.createTable("_emdash_menu_items")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("menu_id", "text", (col) => col.notNull())
		.addColumn("parent_id", "text")
		.addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("type", "text", (col) => col.notNull()) // 'page', 'post', 'custom', 'taxonomy', 'collection'
		.addColumn("reference_collection", "text")
		.addColumn("reference_id", "text")
		.addColumn("custom_url", "text")
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("title_attr", "text")
		.addColumn("target", "text")
		.addColumn("css_classes", "text")
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addForeignKeyConstraint("menu_items_menu_fk", ["menu_id"], "_emdash_menus", ["id"], (cb) =>
			cb.onDelete("cascade"),
		)
		.addForeignKeyConstraint(
			"menu_items_parent_fk",
			["parent_id"],
			"_emdash_menu_items",
			["id"],
			(cb) => cb.onDelete("cascade"),
		)
		.execute();

	// Index for efficient menu item queries
	await db.schema
		.createIndex("idx_menu_items_menu")
		.on("_emdash_menu_items")
		.columns(["menu_id", "sort_order"])
		.execute();

	await db.schema
		.createIndex("idx_menu_items_parent")
		.on("_emdash_menu_items")
		.column("parent_id")
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_menu_items").execute();
	await db.schema.dropTable("_emdash_menus").execute();
}
