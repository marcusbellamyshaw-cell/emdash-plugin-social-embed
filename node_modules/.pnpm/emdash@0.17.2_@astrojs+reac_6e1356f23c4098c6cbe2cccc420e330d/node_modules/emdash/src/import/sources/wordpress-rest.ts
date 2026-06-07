/**
 * WordPress REST API probe
 *
 * Probes self-hosted WordPress sites to detect capabilities.
 * This source is probe-only - it tells users what's available
 * and suggests next steps (usually: upload WXR file).
 */

import { ssrfSafeFetch, validateExternalUrl } from "../ssrf.js";
import type {
	ImportSource,
	ImportAnalysis,
	ImportContext,
	SourceInput,
	SourceProbeResult,
	FetchOptions,
	NormalizedItem,
} from "../types.js";

const TRAILING_SLASHES = /\/+$/;
const WP_JSON_SUFFIX = /\/wp-json\/?$/;

/** WordPress REST API discovery response */
interface WpApiDiscovery {
	name?: string;
	description?: string;
	url?: string;
	home?: string;
	gmt_offset?: number;
	timezone_string?: string;
	namespaces?: string[];
	authentication?: Record<string, unknown>;
	routes?: Record<string, unknown>;
}

export const wordpressRestSource: ImportSource = {
	id: "wordpress-rest",
	name: "WordPress Site",
	description: "Connect to a self-hosted WordPress site",
	icon: "globe",
	requiresFile: false,
	canProbe: true,

	async probe(url: string): Promise<SourceProbeResult | null> {
		try {
			const siteUrl = normalizeUrl(url);

			// SSRF protection: validate URL before any outbound requests
			validateExternalUrl(siteUrl);

			// Try to fetch the WP REST API root
			const apiUrl = `${siteUrl}/wp-json/`;
			const response = await ssrfSafeFetch(apiUrl, {
				headers: { Accept: "application/json" },
				signal: AbortSignal.timeout(10000),
			});

			if (!response.ok) {
				// Try alternate location (some sites use different prefix)
				const altResponse = await ssrfSafeFetch(`${siteUrl}/?rest_route=/`, {
					headers: { Accept: "application/json" },
					signal: AbortSignal.timeout(10000),
				});

				if (!altResponse.ok) {
					return null;
				}
			}

			const data: WpApiDiscovery = await response.json();

			// Check if this looks like WordPress
			if (!data.namespaces?.includes("wp/v2")) {
				return null;
			}

			// Get content counts (unauthenticated - published only)
			const preview = await getPublicContentCounts(siteUrl);

			// Check for authentication methods
			const hasAppPasswords = !!data.authentication?.["application-passwords"];

			return {
				sourceId: "wordpress-rest",
				confidence: "definite",
				detected: {
					platform: "wordpress",
					siteTitle: data.name,
					siteUrl: data.url || data.home || siteUrl,
				},
				capabilities: {
					publicContent: true,
					privateContent: false, // Would need auth
					customPostTypes: false, // Only if show_in_rest: true
					allMeta: false, // Only if registered for REST
					mediaStream: true,
				},
				auth: hasAppPasswords
					? {
							type: "password",
							instructions:
								"To import drafts and private content, create an Application Password in WordPress → Users → Your Profile → Application Passwords",
						}
					: undefined,
				preview,
				suggestedAction: {
					type: "upload",
					instructions:
						"For a complete import including drafts, custom post types, and all metadata, export your content from WordPress (Tools → Export) and upload the file here.",
				},
			};
		} catch {
			// Probe failed - not a WordPress site or not accessible
			return null;
		}
	},

	async analyze(_input: SourceInput, _context: ImportContext): Promise<ImportAnalysis> {
		// REST-only import not implemented - we use this for probe only
		// and suggest WXR upload for actual import
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	},

	// eslint-disable-next-line require-yield
	async *fetchContent(_input: SourceInput, _options: FetchOptions): AsyncGenerator<NormalizedItem> {
		throw new Error("Direct REST API import not implemented. Please upload a WXR export file.");
	},
};

/**
 * Normalize a URL for API requests
 */
function normalizeUrl(url: string): string {
	let normalized = url.trim();

	// Add protocol if missing
	if (!normalized.startsWith("http")) {
		normalized = `https://${normalized}`;
	}

	// Remove trailing slash
	normalized = normalized.replace(TRAILING_SLASHES, "");

	// Remove /wp-json if included
	normalized = normalized.replace(WP_JSON_SUFFIX, "");

	return normalized;
}

/**
 * Get public content counts from REST API
 */
async function getPublicContentCounts(
	siteUrl: string,
): Promise<{ posts?: number; pages?: number; media?: number }> {
	const result: { posts?: number; pages?: number; media?: number } = {};

	try {
		// Fetch with per_page=1 to get total from headers
		const [postsRes, pagesRes, mediaRes] = await Promise.allSettled([
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/posts?per_page=1`, {
				signal: AbortSignal.timeout(5000),
			}),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/pages?per_page=1`, {
				signal: AbortSignal.timeout(5000),
			}),
			ssrfSafeFetch(`${siteUrl}/wp-json/wp/v2/media?per_page=1`, {
				signal: AbortSignal.timeout(5000),
			}),
		]);

		if (postsRes.status === "fulfilled" && postsRes.value.ok) {
			const total = postsRes.value.headers.get("X-WP-Total");
			if (total) result.posts = parseInt(total, 10);
		}

		if (pagesRes.status === "fulfilled" && pagesRes.value.ok) {
			const total = pagesRes.value.headers.get("X-WP-Total");
			if (total) result.pages = parseInt(total, 10);
		}

		if (mediaRes.status === "fulfilled" && mediaRes.value.ok) {
			const total = mediaRes.value.headers.get("X-WP-Total");
			if (total) result.media = parseInt(total, 10);
		}
	} catch {
		// Counts are optional, continue without them
	}

	return result;
}
