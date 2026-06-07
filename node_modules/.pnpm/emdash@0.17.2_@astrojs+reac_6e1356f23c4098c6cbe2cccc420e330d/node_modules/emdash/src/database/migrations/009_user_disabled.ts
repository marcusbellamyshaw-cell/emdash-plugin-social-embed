import type { Kysely } from "kysely";
import { sql } from "kysely";

/**
 * User disabled column - for soft-disabling users
 *
 * Changes:
 * - Adds disabled column to users table (INTEGER, default 0)
 * - Disabled users cannot log in
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// SQLite supports ADD COLUMN
	await sql`ALTER TABLE users ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0`.execute(db);

	// Create index for querying active users
	await db.schema.createIndex("idx_users_disabled").on("users").column("disabled").execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// SQLite doesn't support DROP COLUMN directly, but we can drop the index
	// For full rollback, table would need to be recreated
	await db.schema.dropIndex("idx_users_disabled").execute();

	// SQLite 3.35.0+ supports DROP COLUMN, but for compatibility:
	// We'll leave the column but document that it's deprecated
	// In production, you'd recreate the table without the column
}
