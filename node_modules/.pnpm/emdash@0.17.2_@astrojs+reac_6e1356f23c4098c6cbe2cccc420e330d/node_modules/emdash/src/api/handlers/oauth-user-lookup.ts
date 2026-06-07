/**
 * Shared user lookup for OAuth token operations.
 *
 * Extracts user role and disabled status from the database. Used by
 * handleTokenRefresh() to revalidate scopes against the user's current
 * role and reject disabled users.
 */

import { toRoleLevel, type RoleLevel } from "@emdash-cms/auth";
import type { Kysely } from "kysely";

import type { Database } from "../../database/types.js";

export interface UserRoleAndStatus {
	role: RoleLevel;
	disabled: boolean;
}

/**
 * Look up a user's current role and disabled status.
 * Returns null if the user doesn't exist.
 */
export async function lookupUserRoleAndStatus(
	db: Kysely<Database>,
	userId: string,
): Promise<UserRoleAndStatus | null> {
	const row = await db
		.selectFrom("users")
		.select(["role", "disabled"])
		.where("id", "=", userId)
		.executeTakeFirst();

	if (!row) return null;

	return {
		role: toRoleLevel(row.role),
		disabled: row.disabled === 1,
	};
}
