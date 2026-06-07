import { APIRoute } from "astro";

//#region src/astro/routes/api/settings/email.d.ts
declare const prerender = false;
/**
 * GET /_emdash/api/settings/email
 *
 * Returns the email configuration state:
 * - Current provider selection
 * - Available providers (plugins with email:deliver)
 * - Active middleware (email:beforeSend / email:afterSend plugins)
 * - Whether email is available
 */
declare const GET: APIRoute;
declare const POST: APIRoute;
//#endregion
export { GET, POST, prerender };
//# sourceMappingURL=email.d.mts.map