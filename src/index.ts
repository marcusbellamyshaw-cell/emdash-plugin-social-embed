import type { PluginDescriptor } from "emdash";

export { createPlugin } from "./sandbox-entry.js";

export function socialEmbedPlugin(options: Record<string, unknown> = {}): PluginDescriptor {
	return {
		id: "social-embed",
		version: "1.3.1",
		entrypoint: "emdash-plugin-social-embed",
		componentsEntry: "emdash-plugin-social-embed/astro",
		options,
		// The plugin only fetches five fixed oEmbed provider hosts, so an explicit
		// allowlist replaces the previous network:request:unrestricted grant.
		capabilities: ["network:request"],
		allowedHosts: [
			"www.youtube.com",
			"vimeo.com",
			"publish.twitter.com",
			"open.spotify.com",
			"www.tiktok.com",
		],
		// No settings page is shipped (all five providers need no credentials), so
		// the previous /settings nav entry pointed at a non-existent page.
	};
}
