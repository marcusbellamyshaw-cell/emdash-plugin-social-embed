import { definePlugin, PluginRouteError } from "emdash";
import type { RouteContext } from "emdash";
import { detectPlatform, fetchEmbed } from "./platforms.js";

export function createPlugin() {
	return definePlugin({
		id: "social-embed",
		version: "1.3.1",

		admin: {
			portableTextBlocks: [
				{
					type: "socialEmbed",
					label: "Social Embed",
					icon: "link-external",
					description:
						"Embed a post from YouTube, Vimeo, Twitter/X, Spotify, or TikTok",
					placeholder: "Paste a social media post URL…",
					fields: [
						{
							type: "text_input",
							action_id: "url",
							label: "Post URL",
							placeholder: "https://…",
						},
					],
				},
			],
		},

		routes: {
			oembed: {
				public: true,
				handler: async (ctx: RouteContext) => {
					const urlParam = new URL(ctx.request.url).searchParams.get("url");

					if (!urlParam) throw PluginRouteError.badRequest("Missing url parameter");

					const platform = detectPlatform(urlParam);
					if (!platform) return { error: "Unrecognized platform" };

					const embed = await fetchEmbed(ctx, urlParam, platform);

					if (!embed) return { error: "Failed to fetch embed", platform };

					return {
						html: embed.html,
						scriptSrc: embed.scriptSrc ?? null,
						platform: embed.platform,
					};
				},
			},
		},
	});
}

export default createPlugin;
