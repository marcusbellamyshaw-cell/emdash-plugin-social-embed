/**
 * URL scheme validation utilities
 *
 * Prevents XSS via dangerous URL schemes (javascript:, data:, vbscript:, etc.)
 * by allowlisting known-safe schemes before rendering into href attributes.
 */

/**
 * Matches URLs that are safe to render in href attributes.
 *
 * Allowed:
 * - http:// and https://
 * - mailto: and tel:
 * - Relative paths (starting with /)
 * - Fragment links (starting with #)
 * - Protocol-relative URLs are NOT allowed (starting with //) as they can
 *   redirect to attacker-controlled hosts.
 */
const SAFE_URL_SCHEME_RE = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;

/**
 * Returns the URL unchanged if it uses a safe scheme, otherwise returns "#".
 *
 * Use this at the render layer as the primary defense against XSS via
 * dangerous URL schemes like `javascript:`, `data:`, or `vbscript:`.
 *
 * @example
 * ```ts
 * sanitizeHref("https://example.com")        // "https://example.com"
 * sanitizeHref("/about")                      // "/about"
 * sanitizeHref("#section")                    // "#section"
 * sanitizeHref("mailto:a@b.com")              // "mailto:a@b.com"
 * sanitizeHref("javascript:alert(1)")         // "#"
 * sanitizeHref("data:text/html,<script>")     // "#"
 * sanitizeHref("")                            // "#"
 * ```
 */
export function sanitizeHref(url: string | undefined | null): string {
	if (!url) return "#";
	return SAFE_URL_SCHEME_RE.test(url) ? url : "#";
}

/**
 * Returns true if the URL uses a safe scheme for rendering in href attributes.
 */
export function isSafeHref(url: string): boolean {
	return SAFE_URL_SCHEME_RE.test(url);
}
