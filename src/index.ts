import { definePlugin } from "emdash";
import type { PluginContext, PluginDescriptor } from "emdash";

export function socialEmbedPlugin(options: Record<string, unknown> = {}): PluginDescriptor {
	return {
		id: "social-embed",
		version: "1.0.0",
		entrypoint: "emdash-plugin-social-embed",
		componentsEntry: "emdash-plugin-social-embed/astro",
		options,
		// network:request:unrestricted — oEmbed endpoints span many hosts including
		// arbitrary Mastodon instances, so a fixed allowedHosts list isn't feasible
		capabilities: ["network:request:unrestricted"],
		adminPages: [{ path: "/settings", label: "Social Embed", icon: "link-external" }],
	};
}

export function createPlugin() {
	return definePlugin({
		id: "social-embed",
		version: "1.0.0",

		admin: {
			portableTextBlocks: [
				{
					type: "socialEmbed",
					label: "Social Embed",
					icon: "link-external",
					description:
						"Embed a post from YouTube, Vimeo, Twitter/X, Reddit, Spotify, Bluesky, TikTok, Facebook, Threads, or Mastodon",
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
			admin: {
				handler: async (routeCtx: unknown, _ctx: PluginContext) => {
					const interaction = (routeCtx as { input: { type: string; page?: string } }).input;

					if (interaction.type === "page_load" && interaction.page === "/settings") {
						return {
							blocks: [
								{ type: "header", text: "Social Embed Settings" },
								{
									type: "section",
									text: "**YouTube, Vimeo, Twitter/X, Reddit, Spotify, Bluesky, TikTok, and Mastodon** work with no credentials — just paste a URL.\n\n**Facebook and Threads** require a Meta App access token.",
								},
								{
									type: "section",
									text: "### Enabling Facebook & Threads\n\n1. Create an app at [developers.facebook.com](https://developers.facebook.com) and enable the **oEmbed** product.\n2. Add these to your `.dev.vars` and `wrangler.jsonc` (`[vars]` section):\n\n```\nSOCIAL_EMBED_META_APP_ID=your_app_id\nSOCIAL_EMBED_META_APP_SECRET=your_app_secret\n```\n\nThe plugin reads these at render time — no restart needed after a Cloudflare deploy.",
								},
								{
									type: "section",
									text: "### Performance\n\nEmbed scripts (Twitter widgets.js, TikTok embed.js, Facebook SDK) are only injected on pages that actually contain that type of embed. Pages with no social embeds receive no extra JavaScript.",
								},
							],
						};
					}

					return { blocks: [] };
				},
			},
		},
	});
}

export default createPlugin;
