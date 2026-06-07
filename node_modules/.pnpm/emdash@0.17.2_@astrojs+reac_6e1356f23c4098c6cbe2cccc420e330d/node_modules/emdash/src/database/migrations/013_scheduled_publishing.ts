import type { Kysely } from "kysely";
import { sql } from "kysely";

import { listTablesLike } from "../dialect-helpers.js";

/**
 * Migration: Add scheduled publishing support
 *
 * Adds scheduled_at column to all ec_* content tables.
 * When scheduled_at is set and status is 'scheduled', the content
 * will be auto-published when the scheduled time is reached.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	// Get all ec_* content tables
	const tableNames = await listTablesLike(db, "ec_%");

	// Add scheduled_at column to each content table
	for (const tableName of tableNames) {
		const table = { name: tableName };
		await sql`
			ALTER TABLE ${sql.ref(table.name)} 
			ADD COLUMN scheduled_at TEXT
		`.execute(db);

		// Create index for efficient scheduled content queries
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)} 
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL AND status = 'scheduled'
		`.execute(db);
	}
}

export async function down(db: Kysely<unknown>): Promise<void> {
	// Get all ec_* content tables
	const tableNames = await listTablesLike(db, "ec_%");

	// Drop scheduled_at column from each content table
	for (const tableName of tableNames) {
		const table = { name: tableName };
		// Drop index first
		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);

		await sql`
			ALTER TABLE ${sql.ref(table.name)} 
			DROP COLUMN scheduled_at
		`.execute(db);
	}
}
