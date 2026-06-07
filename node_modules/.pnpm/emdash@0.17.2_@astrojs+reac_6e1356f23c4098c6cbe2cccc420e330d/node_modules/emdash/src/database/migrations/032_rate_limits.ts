import type { Kysely } from "kysely";

/**
 * Migration: Rate limits table + device code polling tracking.
 *
 * 1. Create _emdash_rate_limits for database-backed rate limiting
 *    of unauthenticated endpoints (device code, magic link, passkey).
 *
 * 2. Add last_polled_at column to _emdash_device_codes for
 *    RFC 8628 slow_down enforcement.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// ── Rate limits table ────────────────────────────────────────────
	await db.schema
		.createTable("_emdash_rate_limits")
		.addColumn("key", "text", (col) => col.notNull())
		.addColumn("window", "text", (col) => col.notNull())
		.addColumn("count", "integer", (col) => col.notNull().defaultTo(1))
		.addPrimaryKeyConstraint("pk_rate_limits", ["key", "window"])
		.execute();

	// Index on window for efficient cleanup of expired entries
	await db.schema
		.createIndex("idx_rate_limits_window")
		.on("_emdash_rate_limits")
		.column("window")
		.execute();

	// ── Device code polling tracking ─────────────────────────────────
	await db.schema.alterTable("_emdash_device_codes").addColumn("last_polled_at", "text").execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_rate_limits").execute();

	// SQLite doesn't support DROP COLUMN before 3.35.0, but since this is
	// dev-only (v0, no migrations in production), we accept the limitation.
	await db.schema.alterTable("_emdash_device_codes").dropColumn("last_polled_at").execute();
}
