import type { Kysely } from "kysely";
import { sql } from "kysely";

/**
 * Migration: Add marketplace fields to _plugin_state
 *
 * Adds `source` and `marketplace_version` columns to track
 * whether a plugin was installed from config or marketplace,
 * and which marketplace version is installed.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// source: 'config' (declared in astro.config) or 'marketplace' (installed from registry)
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN source TEXT NOT NULL DEFAULT 'config'
	`.execute(db);

	// marketplace_version: tracks installed version for update checking
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN marketplace_version TEXT
	`.execute(db);

	// Index for efficient marketplace plugin queries on cold start
	await sql`
		CREATE INDEX idx_plugin_state_source
		ON _plugin_state (source)
		WHERE source = 'marketplace'
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await sql`
		DROP INDEX IF EXISTS idx_plugin_state_source
	`.execute(db);

	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN marketplace_version
	`.execute(db);

	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN source
	`.execute(db);
}
