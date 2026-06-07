import type { Kysely } from "kysely";
import { sql } from "kysely";

/**
 * Migration: Add display metadata to _plugin_state
 *
 * Stores display_name and description for marketplace plugins
 * so the admin UI can show meaningful info without re-fetching
 * from the marketplace on every page load.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN display_name TEXT
	`.execute(db);

	await sql`
		ALTER TABLE _plugin_state
		ADD COLUMN description TEXT
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN description
	`.execute(db);

	await sql`
		ALTER TABLE _plugin_state
		DROP COLUMN display_name
	`.execute(db);
}
