import type { Kysely } from "kysely";
import { sql } from "kysely";

/**
 * Migration: Add placeholder columns to media table
 *
 * Stores blurhash and dominant_color for LQIP (Low Quality Image Placeholder)
 * support. Generated at upload time from image pixel data.
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`
		ALTER TABLE media
		ADD COLUMN blurhash TEXT
	`.execute(db);

	await sql`
		ALTER TABLE media
		ADD COLUMN dominant_color TEXT
	`.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await sql`
		ALTER TABLE media
		DROP COLUMN dominant_color
	`.execute(db);

	await sql`
		ALTER TABLE media
		DROP COLUMN blurhash
	`.execute(db);
}
