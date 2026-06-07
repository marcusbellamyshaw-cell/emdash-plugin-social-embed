export type Platform =
	| "youtube"
	| "vimeo"
	| "twitter"
	| "reddit"
	| "spotify"
	| "bluesky"
	| "tiktok"
	| "facebook"
	| "threads"
	| "mastodon";

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
	{ platform: "reddit", pattern: /reddit\.com\/r\/\w+\/comments\//i },
	{ platform: "spotify", pattern: /open\.spotify\.com\//i },
	{ platform: "bluesky", pattern: /bsky\.app\/profile\//i },
	{ platform: "tiktok", pattern: /tiktok\.com\/@[\w.]+\/video\//i },
	{ platform: "threads", pattern: /threads\.net\/@?[\w.]+\/post\//i },
	{ platform: "facebook", pattern: /facebook\.com\/(?:permalink|photo|video|posts|story|reel)/i },
	// Mastodon: broad pattern — match /@username/digits on any domain
	{ platform: "mastodon", pattern: /\/@[\w]+\/\d{10,}/i },
];

export const PLATFORM_LABELS: Record<Platform, string> = {
	youtube: "YouTube",
	vimeo: "Vimeo",
	twitter: "Twitter / X",
	reddit: "Reddit",
	spotify: "Spotify",
	bluesky: "Bluesky",
	tiktok: "TikTok",
	facebook: "Facebook",
	threads: "Threads",
	mastodon: "Mastodon",
};

// Scripts that must be loaded as real DOM elements (stripped from oEmbed HTML,
// injected separately so they actually execute — innerHTML-injected scripts don't run)
const PLATFORM_SCRIPTS: Partial<Record<Platform, string>> = {
	twitter: "https://platform.twitter.com/widgets.js",
	tiktok: "https://www.tiktok.com/embed.js",
	facebook: "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0",
	threads: "https://www.threads.net/embed.js",
};

const SCRIPT_RE = /<script\b[^>]*>[\s\S]*?<\/script>/gi;

export function detectPlatform(url: string): Platform | null {
	for (const { platform, pattern } of PLATFORM_PATTERNS) {
		if (pattern.test(url)) return platform;
	}
	return null;
}

export async function fetchEmbed(
	url: string,
	platform: Platform,
	opts: { metaAppId?: string; metaAppSecret?: string } = {},
): Promise<EmbedResult | null> {
	const { metaAppId, metaAppSecret } = opts;

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
		case "reddit":
			oembedUrl = `https://www.reddit.com/oembed?url=${encodeURIComponent(url)}`;
			break;
		case "spotify":
			oembedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
			break;
		case "bluesky":
			oembedUrl = `https://embed.bsky.app/oembed?url=${encodeURIComponent(url)}`;
			break;
		case "tiktok":
			oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
			break;
		case "facebook":
			if (!metaAppId || !metaAppSecret) return null;
			oembedUrl = `https://graph.facebook.com/v18.0/oembed_post?url=${encodeURIComponent(url)}&access_token=${encodeURIComponent(`${metaAppId}|${metaAppSecret}`)}&format=json`;
			break;
		case "threads":
			if (!metaAppId || !metaAppSecret) return null;
			oembedUrl = `https://graph.facebook.com/v18.0/oembed_post?url=${encodeURIComponent(url)}&access_token=${encodeURIComponent(`${metaAppId}|${metaAppSecret}`)}&format=json`;
			break;
		case "mastodon": {
			try {
				const parsed = new URL(url);
				oembedUrl = `${parsed.origin}/api/oembed?url=${encodeURIComponent(url)}&format=json`;
			} catch {
				return null;
			}
			break;
		}
	}

	try {
		const res = await fetch(oembedUrl, {
			headers: { Accept: "application/json" },
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
