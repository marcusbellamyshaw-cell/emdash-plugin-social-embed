import type { RouteContext } from "emdash";

export type Platform = "youtube" | "vimeo" | "twitter" | "spotify" | "tiktok";

export interface EmbedResult {
	html: string;
	scriptSrc?: string;
	platform: Platform;
	title?: string;
	authorName?: string;
}

export const PLATFORM_LABELS: Record<Platform, string> = {
	youtube: "YouTube",
	vimeo: "Vimeo",
	twitter: "Twitter / X",
	spotify: "Spotify",
	tiktok: "TikTok",
};

// Scripts that must be loaded as real DOM elements (stripped from oEmbed HTML,
// injected separately so they actually execute)
const PLATFORM_SCRIPTS: Partial<Record<Platform, string>> = {
	twitter: "https://platform.twitter.com/widgets.js",
	tiktok: "https://www.tiktok.com/embed.js",
};

// Platforms whose oEmbed returns a landscape video iframe — use 16:9 ratio wrapper.
// All other platforms render at their natural size.
export const VIDEO_EMBED_PLATFORMS: Platform[] = ["youtube", "vimeo"];

const SCRIPT_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;

function hostMatches(host: string, base: string): boolean {
	return host === base || host.endsWith("." + base);
}

// Parse the URL and match on the real hostname + path rather than substring-
// testing the whole string, so query/fragment injection (e.g.
// https://evil.test/#open.spotify.com/) can't misclassify a URL.
export function detectPlatform(url: string): Platform | null {
	let u: URL;
	try {
		u = new URL(url);
	} catch {
		return null;
	}
	if (u.protocol !== "http:" && u.protocol !== "https:") return null;
	const host = u.hostname.toLowerCase();
	const path = u.pathname;

	if (host === "youtu.be" || (hostMatches(host, "youtube.com") && /^\/(watch|shorts)/.test(path))) return "youtube";
	if (hostMatches(host, "vimeo.com") && /^\/\d/.test(path)) return "vimeo";
	if ((hostMatches(host, "twitter.com") || hostMatches(host, "x.com")) && path.includes("/status/")) return "twitter";
	if (hostMatches(host, "spotify.com")) return "spotify";
	if (hostMatches(host, "tiktok.com") && /^\/@[\w.]+\/video\//.test(path)) return "tiktok";
	return null;
}

export async function fetchEmbed(ctx: RouteContext, url: string, platform: Platform): Promise<EmbedResult | null> {
	let oembedUrl: string;

	switch (platform) {
		case "youtube":
			oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
			break;
		case "vimeo":
			oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
			break;
		case "twitter":
			oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&dnt=true&theme=auto&omit_script=true`;
			break;
		case "spotify":
			oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
			break;
		case "tiktok":
			oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
			break;
		default:
			// Exhaustiveness guard: a new Platform without a case fails safe.
			platform satisfies never;
			return null;
	}

	try {
		// Prefer the capability-gated ctx.http.fetch (enforces allowedHosts when
		// the plugin runs sandboxed); fall back to global fetch for the native
		// runtime.
		const doFetch: typeof fetch = ctx.http?.fetch
			? (ctx.http.fetch.bind(ctx.http) as typeof fetch)
			: fetch;
		// Do NOT pass an AbortSignal here. When sandboxed, doFetch is the
		// ctx.http.fetch RPC stub, whose init is structured-cloned across the
		// isolate boundary — and Workers cannot serialize an AbortSignal
		// ("DataCloneError: AbortSignal serialization is not enabled"), which
		// silently broke every embed. Race against a timer instead so a slow
		// provider still can't stall SSR.
		let timer: ReturnType<typeof setTimeout> | undefined;
		const request = doFetch(oembedUrl, {
			headers: {
				Accept: "application/json",
				"User-Agent": "Mozilla/5.0 (compatible; oEmbed/1.0; +https://everybittexas.com)",
			},
			// @ts-ignore — Cloudflare Workers cf option, ignored in Node.js dev
			cf: { cacheTtl: 86400, cacheEverything: true },
		});
		// Swallow late settlement if the timer wins the race below, so the
		// pending request can't surface as an unhandled rejection.
		void request.then(
			() => {},
			() => {},
		);
		const res = await Promise.race([
			request,
			new Promise<never>((_, reject) => {
				timer = setTimeout(() => reject(new Error("oEmbed request timed out after 5000ms")), 5000);
			}),
		]).finally(() => clearTimeout(timer));
		if (!res.ok) return null;

		const data = (await res.json()) as {
			html?: string;
			title?: string;
			author_name?: string;
		};
		if (!data.html) return null;

		// Strip script tags — innerHTML-injected scripts don't execute in browsers.
		// We inject the platform script separately as a real DOM element.
		const html = data.html.replace(SCRIPT_RE, "").trim();
		const scriptSrc = PLATFORM_SCRIPTS[platform];

		return { html, scriptSrc, platform, title: data.title, authorName: data.author_name };
	} catch {
		return null;
	}
}
