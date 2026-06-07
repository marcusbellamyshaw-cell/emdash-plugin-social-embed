/**
 * EmDash Preview System
 *
 * Enables secure preview of unpublished content via signed tokens.
 *
 * Usage:
 * 1. Generate a preview URL for draft content
 * 2. Share the URL (includes signed token)
 * 3. Visitor sees the draft content with a preview banner
 *
 * @example
 * ```astro
 * ---
 * import { getEmDashEntry, verifyPreviewToken } from "emdash";
 *
 * const { entry, isPreview } = await getEmDashEntry("posts", slug, {
 *   preview: await verifyPreviewToken({
 *     url: Astro.url,
 *     secret: import.meta.env.PREVIEW_SECRET,
 *   }),
 * });
 * ---
 *
 * <h1>{entry?.data.title}</h1>
 * ```
 */

export {
	generatePreviewToken,
	verifyPreviewToken,
	parseContentId,
	type PreviewTokenPayload,
	type GeneratePreviewTokenOptions,
	type VerifyPreviewTokenResult,
	type VerifyPreviewTokenOptions,
} from "./tokens.js";

export { getPreviewUrl, buildPreviewUrl, type GetPreviewUrlOptions } from "./urls.js";

export { isPreviewRequest, getPreviewToken } from "./helpers.js";
