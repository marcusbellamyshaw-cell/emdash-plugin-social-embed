import * as astro from "astro";

//#region src/astro/middleware/setup.d.ts
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
declare const onRequest: astro.MiddlewareHandler;
//#endregion
export { onRequest };
//# sourceMappingURL=setup.d.mts.map