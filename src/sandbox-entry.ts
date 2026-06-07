import { definePlugin, PluginRouteError } from "emdash";
import type { PluginContext, RouteContext } from "emdash";
import { detectPlatform, fetchEmbed } from "./platforms.js";

export function createPlugin() {
	return definePlugin({
		id: "social-embed",
		version: "1.1.2",

		admin: {
			pages: [{ path: "/settings", label: "Social Embed Settings", icon: "gear" }],
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
			// Public route called by the Astro component during SSR.
			// Reads Meta credentials from KV so they never need to be in env vars.
			oembed: {
				public: true,
				handler: async (ctx: RouteContext) => {
					const urlParam = new URL(ctx.request.url).searchParams.get("url");

					if (!urlParam) throw PluginRouteError.badRequest("Missing url parameter");

					const platform = detectPlatform(urlParam);
					if (!platform) return { error: "Unrecognized platform", url: urlParam };

					const metaAppId = (await ctx.kv.get<string>("settings:metaAppId")) ?? undefined;
					const metaAppSecret =
						(await ctx.kv.get<string>("settings:metaAppSecret")) ?? undefined;

					const embed = await fetchEmbed(urlParam, platform, { metaAppId, metaAppSecret });

					if (!embed) {
						return {
							error: "Failed to fetch embed",
							platform,
							needsCredentials:
								(platform === "facebook" || platform === "threads") &&
								(!metaAppId || !metaAppSecret),
						};
					}

					return {
						html: embed.html,
						scriptSrc: embed.scriptSrc ?? null,
						platform: embed.platform,
					};
				},
			},

			admin: {
				handler: async (ctx: RouteContext) => {
					const interaction = ctx.input as Record<string, unknown>;

					if (interaction.type === "page_load" && interaction.page === "/settings") {
						const currentAppId = await ctx.kv.get<string>("settings:metaAppId");

						return {
							blocks: [
								{ type: "header", text: "Social Embed Settings" },
								{
									type: "section",
									text: "YouTube, Vimeo, Twitter/X, Reddit, Spotify, Bluesky, TikTok, and Mastodon work without any credentials.\n\n**Facebook and Threads** require a Meta App with the oEmbed product enabled. Get your credentials at [developers.facebook.com](https://developers.facebook.com).",
								},
								{
									type: "form",
									blockId: "meta-settings",
									submit: { text: "Save" },
									fields: [
										{
											type: "text_input",
											action_id: "metaAppId",
											label: "Meta App ID",
											placeholder: "e.g. 1234567890",
											initial_value: currentAppId ?? "",
										},
										{
											type: "secret_input",
											action_id: "metaAppSecret",
											label: "Meta App Secret",
											placeholder: currentAppId
												? "Leave blank to keep existing secret"
												: "Enter your app secret",
										},
									],
								},
								{
									type: "context",
									text: currentAppId
										? "✓ Meta credentials are configured. Facebook and Threads embeds are enabled."
										: "No Meta credentials saved. Facebook and Threads embeds will fall back to plain links.",
								},
							],
						};
					}

					if (
						interaction.type === "form_submit" &&
						interaction.blockId === "meta-settings"
					) {
						const values = interaction.values as {
							metaAppId?: string;
							metaAppSecret?: string;
						};

						if (values.metaAppId?.trim()) {
							await ctx.kv.set("settings:metaAppId", values.metaAppId.trim());
						}
						if (values.metaAppSecret?.trim()) {
							await ctx.kv.set("settings:metaAppSecret", values.metaAppSecret.trim());
						}

						return {
							toast: { type: "success", message: "Social embed settings saved" },
							blocks: [
								{
									type: "banner",
									style: "success",
									text: "Settings saved.",
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
