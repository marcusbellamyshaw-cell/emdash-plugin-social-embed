//#region src/astro/routes/api/import/wordpress/rewrite-url-helpers.ts
const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
const WORDPRESS_IMAGE_SIZE_SUFFIX = /-\d+x\d+(?=\.[^./?#]+$)/;
const BASE_URL_EXTENSION = /^(.+)(\.[^./?#]+)$/;
/**
* Strip query parameters from a URL for base matching
*/
function getBaseUrl(url) {
	try {
		const parsed = new URL(url);
		return `${parsed.origin}${parsed.pathname}`;
	} catch {
		return url.split("?")[0] || url;
	}
}
/**
* Build a map of base URLs to new URLs for flexible matching
*/
function buildBaseUrlMap(urlMap) {
	const baseMap = /* @__PURE__ */ new Map();
	for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
		const baseUrl = getBaseUrl(oldUrl);
		baseMap.set(baseUrl, newUrl);
	}
	return baseMap;
}
/**
* Extract the URL to match from a stored media field value.
*
* Image/file columns hold a JSON-stringified MediaValue
* (e.g. `{"provider":"external","id":"","src":"https://.../hero.jpg"}`), but legacy
* rows may hold a bare URL string. Returns the inner `src` for a MediaValue, otherwise
* the value unchanged. Without this, the whole JSON blob is passed to findMatchingUrl()
* and the embedded URL is never matched.
*/
function extractMediaUrl(value) {
	try {
		const parsed = JSON.parse(value);
		if (parsed && typeof parsed.src === "string") return parsed.src;
	} catch {}
	return value;
}
/**
* Find matching new URL for a given URL, checking exact, base, and WordPress image-size matches
*/
function findMatchingUrl(url, exactMap, baseMap) {
	if (exactMap[url]) return exactMap[url];
	const baseUrl = getBaseUrl(url);
	const baseMatch = baseMap.get(baseUrl);
	if (baseMatch) return baseMatch;
	const wordPressImageMatch = baseMap.get(stripWordPressImageSizeSuffix(baseUrl));
	if (wordPressImageMatch) return wordPressImageMatch;
	return null;
}
/**
* Rewrite URLs in a Portable Text array, returning whether any changes were made
*/
function rewritePortableTextUrls(blocks, exactMap, baseMap) {
	let changed = false;
	let urlsRewritten = 0;
	for (const block of blocks) {
		if (block._type === "image" && block.asset?.url) {
			const newUrl = findMatchingUrl(block.asset.url, exactMap, baseMap);
			if (newUrl) {
				block.asset.url = newUrl;
				block.asset._ref = newUrl;
				changed = true;
				urlsRewritten++;
			}
		}
		if (block._type === "image" && block.link) {
			const newUrl = findMatchingUrl(block.link, exactMap, baseMap);
			if (newUrl) {
				block.link = newUrl;
				changed = true;
				urlsRewritten++;
			}
		}
		if (block._type === "gallery" && Array.isArray(block.images)) {
			const result = rewritePortableTextUrls(block.images, exactMap, baseMap);
			if (result.changed) {
				changed = true;
				urlsRewritten += result.urlsRewritten;
			}
		}
		if (block._type === "columns" && Array.isArray(block.columns)) {
			for (const column of block.columns) if (Array.isArray(column.content)) {
				const result = rewritePortableTextUrls(column.content, exactMap, baseMap);
				if (result.changed) {
					changed = true;
					urlsRewritten += result.urlsRewritten;
				}
			}
		}
	}
	return {
		changed,
		urlsRewritten
	};
}
/**
* Rewrite URLs in a string field using simple string replacement
*/
function rewriteStringUrls(value, exactMap, baseMap) {
	let newValue = value;
	let changed = false;
	let urlsRewritten = 0;
	for (const [oldUrl, newUrl] of Object.entries(exactMap)) if (newValue.includes(oldUrl)) {
		newValue = newValue.split(oldUrl).join(newUrl);
		changed = true;
		urlsRewritten++;
	}
	for (const [baseUrl, newUrl] of baseMap.entries()) {
		const regex = buildBaseUrlMatchRegex(baseUrl);
		const matches = newValue.match(regex);
		if (matches) {
			for (const match of matches) if (!exactMap[match]) {
				newValue = newValue.split(match).join(newUrl);
				changed = true;
				urlsRewritten++;
			}
		}
	}
	return {
		newValue,
		changed,
		urlsRewritten
	};
}
/**
* Escape special regex characters in a string
*/
function escapeRegExp(string) {
	return string.replace(REGEX_SPECIAL_CHARS, "\\$&");
}
function stripWordPressImageSizeSuffix(url) {
	return url.replace(WORDPRESS_IMAGE_SIZE_SUFFIX, "");
}
function buildBaseUrlMatchRegex(baseUrl) {
	const extensionMatch = BASE_URL_EXTENSION.exec(baseUrl);
	const basePattern = extensionMatch ? `${escapeRegExp(extensionMatch[1])}(?:-\\d+x\\d+)?${escapeRegExp(extensionMatch[2])}` : escapeRegExp(baseUrl);
	return new RegExp(`${basePattern}(\\?[^"'\\s]*)?(?=$|["'\\s<>)\\],;:!?]|\\.(?=$|["'\\s<>)\\]]))`, "g");
}

//#endregion
export { buildBaseUrlMap, extractMediaUrl, findMatchingUrl, getBaseUrl, rewritePortableTextUrls, rewriteStringUrls };
//# sourceMappingURL=rewrite-url-helpers.mjs.map