import type { Kysely } from "kysely";

/**
 * Add status column to media table for tracking upload state.
 * Status values: 'pending' | 'ready' | 'failed'
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable("media")
		.addColumn("status", "text", (col) => col.notNull().defaultTo("ready"))
		.execute();

	await db.schema.createIndex("idx_media_status").on("media").column("status").execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex("idx_media_status").execute();

	// Note: SQLite doesn't support DROP COLUMN directly
	// For a proper down migration in SQLite, you'd need to:
	// 1. Create a new table without the column
	// 2. Copy data over
	// 3. Drop old table
	// 4. Rename new table
	// For simplicity, we'll leave this as a no-op since down migrations are rarely used
}
