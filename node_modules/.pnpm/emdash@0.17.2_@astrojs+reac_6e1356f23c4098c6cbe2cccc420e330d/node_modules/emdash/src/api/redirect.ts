/**
 * Validate that a redirect URL is a safe local path.
 *
 * Rejects:
 * - Protocol-relative URLs (`//evil.com`)
 * - Backslash bypass (`/\evil.com` — browsers normalize `\` to `/` in Location headers)
 * - Absolute URLs (`https://evil.com`)
 * - Empty / nullish values
 */
export function isSafeRedirect(url: string | null | undefined): url is string {
	return (
		typeof url === "string" && url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")
	);
}
