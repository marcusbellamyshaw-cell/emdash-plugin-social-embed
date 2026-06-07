import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	// Widget areas table
	await db.schema
		.createTable("_emdash_widget_areas")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("name", "text", (col) => col.notNull().unique())
		.addColumn("label", "text", (col) => col.notNull())
		.addColumn("description", "text")
		.addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
		.execute();

	// Widgets table
	await db.schema
		.createTable("_emdash_widgets")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("area_id", "text", (col) =>
			col.notNull().references("_emdash_widget_areas.id").onDelete("cascade"),
		)
		.addColumn("sort_order", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("type", "text", (col) => col.notNull()) // 'content', 'menu', 'component'
		.addColumn("title", "text")
		.addColumn("content", "text") // JSON: Portable Text for content type
		.addColumn("menu_name", "text") // For menu type
		.addColumn("component_id", "text") // For component type: 'core:recent-posts'
		.addColumn("component_props", "text") // JSON: props for component
		.addColumn("created_at", "text", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
		.execute();

	// Index for efficient lookups by area and order
	await db.schema
		.createIndex("idx_widgets_area")
		.on("_emdash_widgets")
		.columns(["area_id", "sort_order"])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_widgets").execute();
	await db.schema.dropTable("_emdash_widget_areas").execute();
}
