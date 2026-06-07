import type { PluginDescriptor } from "emdash";

export { createPlugin } from "./sandbox-entry.js";

export function socialEmbedPlugin(options: Record<string, unknown> = {}): PluginDescriptor {
	return {
		id: "social-embed",
		version: "1.1.2",
		entrypoint: "emdash-plugin-social-embed",
		componentsEntry: "emdash-plugin-social-embed/astro",
		options,
		// network:request:unrestricted — oEmbed endpoints span many hosts including
		// arbitrary Mastodon instances, so a fixed allowedHosts list isn't feasible
		capabilities: ["network:request:unrestricted"],
		adminPages: [{ path: "/settings", label: "Social Embed", icon: "link-external" }],
	};
}
