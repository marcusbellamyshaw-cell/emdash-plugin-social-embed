import type { Kysely } from "kysely";
import { sql } from "kysely";

import { listTablesLike } from "../dialect-helpers.js";

/**
 * Migration: Widen scheduled publishing index
 *
 * The original partial index (013) only covered status='scheduled'.
 * Published posts can now have scheduled draft changes, so widen the
 * index to cover all rows where scheduled_at IS NOT NULL.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	const tableNames = await listTablesLike(db, "ec_%");

	for (const tableName of tableNames) {
		const table = { name: tableName };

		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);

		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)}
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL
		`.execute(db);
	}
}

export async function down(db: Kysely<unknown>): Promise<void> {
	const tableNames = await listTablesLike(db, "ec_%");

	for (const tableName of tableNames) {
		const table = { name: tableName };

		await sql`
			DROP INDEX IF EXISTS ${sql.ref(`idx_${table.name}_scheduled`)}
		`.execute(db);

		// Restore the original narrower index
		await sql`
			CREATE INDEX ${sql.ref(`idx_${table.name}_scheduled`)}
			ON ${sql.ref(table.name)} (scheduled_at)
			WHERE scheduled_at IS NOT NULL AND status = 'scheduled'
		`.execute(db);
	}
}
