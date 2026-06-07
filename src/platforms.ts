export type Platform = "youtube" | "vimeo" | "twitter" | "spotify" | "tiktok";

export interface EmbedResult {
	html: string;
	scriptSrc?: string;
	platform: Platform;
	title?: string;
	authorName?: string;
}

const PLATFORM_PATTERNS: Array<{ platform: Platform; pattern: RegExp }> = [
	{ platform: "youtube", pattern: /(?:youtube\.com\/(?:watch|shorts)|youtu\.be\/)/i },
	{ platform: "vimeo", pattern: /vimeo\.com\/\d/i },
	{ platform: "twitter", pattern: /(?:twitter\.com|x\.com)\/\w+\/status\//i },
	{ platform: "spotify", pattern: /open\.spotify\.com\//i },
	{ platform: "tiktok", pattern: /tiktok\.com\/@[\w.]+\/video\//i },
];

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

export function detectPlatform(url: string): Platform | null {
	for (const { platform, pattern } of PLATFORM_PATTERNS) {
		if (pattern.test(url)) return platform;
	}
	return null;
}

export async function fetchEmbed(url: string, platform: Platform): Promise<EmbedResult | null> {
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
	}

	try {
		const res = await fetch(oembedUrl, {
			headers: {
				Accept: "application/json",
				"User-Agent": "Mozilla/5.0 (compatible; oEmbed/1.0; +https://everybittexas.com)",
			},
			// @ts-ignore — Cloudflare Workers cf option, ignored in Node.js dev
			cf: { cacheTtl: 86400, cacheEverything: true },
		});
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
