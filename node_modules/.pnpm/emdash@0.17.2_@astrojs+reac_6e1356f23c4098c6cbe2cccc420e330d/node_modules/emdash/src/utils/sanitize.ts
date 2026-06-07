import sanitizeHtml from "sanitize-html";

/**
 * Sanitize HTML content to prevent XSS attacks.
 *
 * Allows standard formatting tags, images, iframes (from specific providers),
 * and basic attributes.
 */
export function sanitizeContent(html: string): string {
	return sanitizeHtml(html, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "span", "iframe"],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			"*": ["class", "id", "data-*"],
			iframe: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
			img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
		},
		allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"],
	});
}
