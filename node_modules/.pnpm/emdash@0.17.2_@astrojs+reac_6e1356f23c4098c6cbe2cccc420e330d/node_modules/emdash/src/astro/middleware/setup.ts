/**
 * Setup detection middleware
 *
 * Redirects to setup wizard if the site hasn't been set up yet.
 * Checks both "emdash:setup_complete" option AND user existence.
 *
 * Detection logic (in order):
 * 1. Does options table exist? No → setup needed
 * 2. Is setup_complete true? No → setup needed
 * 3. In passkey mode: Are there any users? No → setup needed
 *    In Access mode: Skip user check (first user created on first login)
 * 4. Proceed to admin
 */

import { defineMiddleware } from "astro:middleware";

import { getAuthMode } from "../../auth/mode.js";

export const onRequest = defineMiddleware(async (context, next) => {
	// Only check setup on admin routes (but not the setup page itself)
	const isAdminRoute = context.url.pathname.startsWith("/_emdash/admin");
	const isSetupRoute = context.url.pathname.startsWith("/_emdash/admin/setup");

	if (isAdminRoute && !isSetupRoute) {
		// Check if setup is complete
		const { emdash } = context.locals;

		if (!emdash?.db) {
			// No database configured - let the admin handle this error
			return next();
		}

		try {
			// Check setup_complete flag
			const setupComplete = await emdash.db
				.selectFrom("options")
				.select("value")
				.where("name", "=", "emdash:setup_complete")
				.executeTakeFirst();

			// Value is JSON-encoded, parse it. Accepts both boolean true and string "true"
			const isComplete =
				setupComplete &&
				(() => {
					try {
						const parsed = JSON.parse(setupComplete.value);
						return parsed === true || parsed === "true";
					} catch {
						return false;
					}
				})();

			if (!isComplete) {
				// Redirect to setup wizard
				return context.redirect("/_emdash/admin/setup");
			}

			// Check auth mode - user verification differs by mode
			const authMode = getAuthMode(emdash.config);

			// In passkey mode, verify users exist
			// In Access mode, skip this check - first user is created on first Access login
			if (authMode.type === "passkey") {
				// Setup is marked complete, but verify users exist
				// This catches edge case where setup_complete is true but no users
				const userCount = await emdash.db
					.selectFrom("users")
					.select((eb) => eb.fn.countAll<number>().as("count"))
					.executeTakeFirstOrThrow();

				if (userCount.count === 0) {
					// No users - need to complete admin creation
					return context.redirect("/_emdash/admin/setup");
				}
			}
		} catch (error) {
			// If the options table doesn't exist yet, redirect to setup
			// This handles fresh installations where migrations haven't run
			if (error instanceof Error && error.message.includes("no such table")) {
				return context.redirect("/_emdash/admin/setup");
			}

			// Other errors - let the admin handle them
			console.error("Setup middleware error:", error);
		}
	}

	return next();
});
