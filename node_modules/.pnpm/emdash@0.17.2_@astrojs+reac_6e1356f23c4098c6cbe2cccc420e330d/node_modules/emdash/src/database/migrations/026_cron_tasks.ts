import type { Kysely } from "kysely";

import { currentTimestamp } from "../dialect-helpers.js";

/**
 * Migration: Create cron tasks table for plugin scheduled tasks.
 *
 * Each plugin can register cron tasks (recurring or one-shot) which are
 * stored here and executed by the platform-specific scheduler.
 *
 * The `next_run_at` + `status` + `enabled` index drives the "find overdue
 * tasks" query used by CronExecutor.tick().
 */
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable("_emdash_cron_tasks")
		.addColumn("id", "text", (col) => col.primaryKey())
		.addColumn("plugin_id", "text", (col) => col.notNull())
		.addColumn("task_name", "text", (col) => col.notNull())
		.addColumn("schedule", "text", (col) => col.notNull())
		.addColumn("is_oneshot", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("data", "text") // JSON
		.addColumn("next_run_at", "text", (col) => col.notNull())
		.addColumn("last_run_at", "text")
		.addColumn("status", "text", (col) => col.notNull().defaultTo("idle"))
		.addColumn("locked_at", "text")
		.addColumn("enabled", "integer", (col) => col.notNull().defaultTo(1))
		.addColumn("created_at", "text", (col) => col.defaultTo(currentTimestamp(db)))
		.addUniqueConstraint("uq_cron_tasks_plugin_task", ["plugin_id", "task_name"])
		.execute();

	// Equality columns first (enabled, status), then range column (next_run_at)
	// for optimal B-tree index usage in the tick query.
	await db.schema
		.createIndex("idx_cron_tasks_due")
		.on("_emdash_cron_tasks")
		.columns(["enabled", "status", "next_run_at"])
		.execute();

	await db.schema
		.createIndex("idx_cron_tasks_plugin")
		.on("_emdash_cron_tasks")
		.column("plugin_id")
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("_emdash_cron_tasks").execute();
}
