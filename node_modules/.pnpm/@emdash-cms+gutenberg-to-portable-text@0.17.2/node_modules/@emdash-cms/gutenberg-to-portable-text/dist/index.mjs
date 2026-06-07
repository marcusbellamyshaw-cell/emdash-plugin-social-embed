import { t as __exportAll } from "./chunk-DQk6qfdC.mjs";
import { parse } from "@wordpress/block-serialization-default-parser";
import { parseFragment } from "parse5";

//#region src/url.ts
/**
* URL scheme validation for the converter pipeline (defense-in-depth).
*
* This mirrors the canonical sanitizeHref in packages/core/src/utils/url.ts.
* The converter is a standalone zero-dependency package, so it carries its own
* copy. The render layer in core is the primary defense; this is secondary.
*/
const SAFE_URL_SCHEME_RE = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i;
/**
* Returns the URL unchanged if it uses a safe scheme, otherwise returns "".
*
* Returns empty string (not "#") because this is the converter layer — we
* strip bad URLs rather than substituting anchors. The render layer handles
* the fallback to "#".
*/
function sanitizeHref(url) {
	if (!url) return "";
	return SAFE_URL_SCHEME_RE.test(url) ? url : "";
}

//#endregion
//#region src/inline.ts
/**
* Inline HTML to Portable Text spans converter
*
* Parses inline HTML elements (strong, em, a, code, etc.) and converts
* them to Portable Text spans with marks.
*/
const WHITESPACE_PATTERN = /\S/;
const BLOCK_TAG_PATTERNS = {
	p: {
		open: /^<p[^>]*>/i,
		close: /<\/p>$/i
	},
	h1: {
		open: /^<h1[^>]*>/i,
		close: /<\/h1>$/i
	},
	h2: {
		open: /^<h2[^>]*>/i,
		close: /<\/h2>$/i
	},
	h3: {
		open: /^<h3[^>]*>/i,
		close: /<\/h3>$/i
	},
	h4: {
		open: /^<h4[^>]*>/i,
		close: /<\/h4>$/i
	},
	h5: {
		open: /^<h5[^>]*>/i,
		close: /<\/h5>$/i
	},
	h6: {
		open: /^<h6[^>]*>/i,
		close: /<\/h6>$/i
	},
	li: {
		open: /^<li[^>]*>/i,
		close: /<\/li>$/i
	},
	blockquote: {
		open: /^<blockquote[^>]*>/i,
		close: /<\/blockquote>$/i
	},
	figcaption: {
		open: /^<figcaption[^>]*>/i,
		close: /<\/figcaption>$/i
	}
};
const IMG_ALT_PATTERN = /<img[^>]+alt=["']([^"']*)["']/i;
const FIGCAPTION_PATTERN = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i;
const IMG_SRC_PATTERN = /<img[^>]+src=["']([^"']*)["']/i;
const URL_AMP_ENTITY_PATTERN = /&amp;/g;
const URL_NUMERIC_AMP_ENTITY_PATTERN = /&#0?38;/g;
const URL_HEX_AMP_ENTITY_PATTERN = /&#x26;/gi;
/**
* Parse inline HTML content into Portable Text spans
*/
function parseInlineContent(html, generateKey) {
	const children = [];
	const markDefs = [];
	const markDefMap = /* @__PURE__ */ new Map();
	if (html.length > 0 && !WHITESPACE_PATTERN.test(html)) return {
		children: [{
			_type: "span",
			_key: generateKey(),
			text: html
		}],
		markDefs: []
	};
	walkNodes(parseFragment(stripBlockTags(html)).childNodes, [], children, markDefs, markDefMap, generateKey);
	if (children.length === 0) children.push({
		_type: "span",
		_key: generateKey(),
		text: ""
	});
	return {
		children,
		markDefs
	};
}
/**
* Strip common block-level wrapper tags
*/
function stripBlockTags(html) {
	let stripped = html.trim();
	for (const tag of [
		"p",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"li",
		"blockquote",
		"figcaption"
	]) {
		const patterns = BLOCK_TAG_PATTERNS[tag];
		if (patterns && patterns.open.test(stripped) && patterns.close.test(stripped)) {
			stripped = stripped.replace(patterns.open, "").replace(patterns.close, "").trim();
			break;
		}
	}
	return stripped;
}
/**
* Recursively walk DOM nodes and build spans
*/
function walkNodes(nodes, currentMarks, children, markDefs, markDefMap, generateKey) {
	for (const node of nodes) if (isTextNode(node)) {
		const text = node.value;
		if (text) {
			const parts = text.split("\n");
			for (let i = 0; i < parts.length; i++) {
				const part = parts[i];
				if (part || i > 0) {
					if (part) children.push({
						_type: "span",
						_key: generateKey(),
						text: part,
						marks: currentMarks.length > 0 ? [...currentMarks] : void 0
					});
					if (i < parts.length - 1) if (children.length > 0) {
						const lastChild = children.at(-1);
						if (lastChild) lastChild.text += "\n";
					} else children.push({
						_type: "span",
						_key: generateKey(),
						text: "\n"
					});
				}
			}
		}
	} else if (isElement(node)) {
		if (node.tagName.toLowerCase() === "br") {
			if (children.length > 0) {
				const lastChild = children.at(-1);
				if (lastChild) lastChild.text += "\n";
			} else children.push({
				_type: "span",
				_key: generateKey(),
				text: "\n"
			});
			continue;
		}
		const markResult = getMarkForElement(node, markDefs, markDefMap, generateKey);
		const newMarks = markResult ? [...currentMarks, markResult] : currentMarks;
		walkNodes(node.childNodes, newMarks, children, markDefs, markDefMap, generateKey);
	}
}
/**
* Get the Portable Text mark for an HTML element
*/
function getMarkForElement(element, markDefs, markDefMap, generateKey) {
	switch (element.tagName.toLowerCase()) {
		case "strong":
		case "b": return "strong";
		case "em":
		case "i": return "em";
		case "u": return "underline";
		case "s":
		case "strike":
		case "del": return "strike-through";
		case "code": return "code";
		case "sup": return "superscript";
		case "sub": return "subscript";
		case "a": {
			const href = sanitizeHref(getAttr(element, "href"));
			const target = getAttr(element, "target");
			const existingKey = markDefMap.get(href);
			if (existingKey) return existingKey;
			const key = generateKey();
			const markDef = {
				_type: "link",
				_key: key,
				href
			};
			if (target === "_blank") markDef.blank = true;
			markDefs.push(markDef);
			markDefMap.set(href, key);
			return key;
		}
		default: return null;
	}
}
/**
* Get attribute value from element
*/
function getAttr(element, name) {
	return element.attrs.find((a) => a.name.toLowerCase() === name)?.value;
}
/**
* Type guard for text nodes
*/
function isTextNode(node) {
	return node.nodeName === "#text";
}
/**
* Type guard for elements
*/
function isElement(node) {
	return "tagName" in node;
}
/**
* Extract plain text from HTML (for alt text, captions)
*/
function extractText(html) {
	return getTextContent(parseFragment(html).childNodes);
}
function getTextContent(nodes) {
	let text = "";
	for (const node of nodes) if (isTextNode(node)) text += node.value;
	else if (isElement(node)) text += getTextContent(node.childNodes);
	return text.trim();
}
/**
* Extract alt text from an img element in HTML
*/
function extractAlt(html) {
	const match = html.match(IMG_ALT_PATTERN);
	if (match) return match[1];
}
/**
* Extract caption from a figcaption element
*/
function extractCaption(html) {
	const match = html.match(FIGCAPTION_PATTERN);
	if (match?.[1]) return extractText(match[1]);
}
/**
* Extract src from an img element
*/
function extractSrc(html) {
	const match = html.match(IMG_SRC_PATTERN);
	if (!match?.[1]) return void 0;
	return decodeUrlEntities$1(match[1]);
}
/**
* Decode HTML entities commonly found in URLs
*/
function decodeUrlEntities$1(url) {
	return url.replace(URL_AMP_ENTITY_PATTERN, "&").replace(URL_NUMERIC_AMP_ENTITY_PATTERN, "&").replace(URL_HEX_AMP_ENTITY_PATTERN, "&");
}

//#endregion
//#region src/types.ts
/** Extract a string attribute, returning undefined if missing or wrong type */
function attrString(attrs, key) {
	const v = attrs[key];
	return typeof v === "string" ? v : void 0;
}
/** Extract a number attribute, returning undefined if missing or wrong type */
function attrNumber(attrs, key) {
	const v = attrs[key];
	return typeof v === "number" ? v : void 0;
}
/** Extract a boolean attribute, returning undefined if missing or wrong type */
function attrBoolean(attrs, key) {
	const v = attrs[key];
	return typeof v === "boolean" ? v : void 0;
}
function isRecord(v) {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}
/** Extract an object attribute, returning undefined if missing or wrong type */
function attrObject(attrs, key) {
	const v = attrs[key];
	return isRecord(v) ? v : void 0;
}

//#endregion
//#region src/transformers/core.ts
/**
* Transformers for WordPress core/* blocks
*/
var core_exports = /* @__PURE__ */ __exportAll({
	button: () => button,
	buttons: () => buttons,
	code: () => code,
	columns: () => columns,
	cover: () => cover,
	file: () => file,
	gallery: () => gallery,
	group: () => group,
	heading: () => heading,
	html: () => html,
	image: () => image,
	list: () => list,
	mediaText: () => mediaText,
	more: () => more,
	nextpage: () => nextpage,
	paragraph: () => paragraph,
	preformatted: () => preformatted,
	pullquote: () => pullquote,
	quote: () => quote,
	separator: () => separator,
	shortcode: () => shortcode,
	table: () => table,
	verse: () => verse
});
const UOL_TAG_PATTERN = /<[uo]l[^>]*>([\s\S]*)<\/[uo]l>/i;
const LI_TAG_PATTERN = /<li[^>]*>([\s\S]*?)<\/li>/i;
const UL_TAG_PATTERN = /<ul[^>]*>([\s\S]*)<\/ul>/i;
const OL_TAG_PATTERN = /<ol[^>]*>([\s\S]*)<\/ol>/i;
const NESTED_LIST_PATTERN = /<[uo]l[^>]*>[\s\S]*<\/[uo]l>/gi;
const P_TAG_PATTERN = /<p[^>]*>([\s\S]*?)<\/p>/gi;
const P_TAG_SINGLE_PATTERN = /<p[^>]*>([\s\S]*?)<\/p>/i;
const HREF_PATTERN = /href="([^"]*)"/i;
const DATA_ID_PATTERN = /data-id=["'](\d+)["']/i;
const CODE_TAG_PATTERN_SINGLE = /<code[^>]*>([\s\S]*?)<\/code>/i;
const TABLE_TAG_PATTERN = /<table[^>]*>([\s\S]*?)<\/table>/i;
const THEAD_TAG_PATTERN = /<thead[^>]*>([\s\S]*?)<\/thead>/i;
const IMG_TAG_GLOBAL = /<img[^>]+>/gi;
const TABLE_ROW_PATTERN = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
const TABLE_CELL_PATTERN = /<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi;
const TBODY_TAG_PATTERN = /<tbody[^>]*>([\s\S]*?)<\/tbody>/i;
const CITE_TAG_PATTERN = /<cite[^>]*>([\s\S]*?)<\/cite>/i;
const LT_ENTITY_PATTERN = /&lt;/g;
const GT_ENTITY_PATTERN = /&gt;/g;
const AMP_ENTITY_PATTERN$1 = /&amp;/g;
const QUOT_ENTITY_PATTERN = /&quot;/g;
const APOS_ENTITY_PATTERN$1 = /&#039;/g;
const NBSP_ENTITY_PATTERN$1 = /&nbsp;/g;
/**
* core/paragraph → block with style "normal"
*/
const paragraph = (block, _options, context) => {
	const { children, markDefs } = context.parseInlineContent(block.innerHTML);
	if (children.length === 1 && children[0]?.text === "") return [];
	const result = {
		_type: "block",
		_key: context.generateKey(),
		style: "normal",
		children
	};
	if (markDefs.length > 0) result.markDefs = markDefs;
	return [result];
};
/**
* core/heading → block with style "h1"-"h6"
*/
const heading = (block, _options, context) => {
	const level = attrNumber(block.attrs, "level") ?? 2;
	const { children, markDefs } = context.parseInlineContent(block.innerHTML);
	const result = {
		_type: "block",
		_key: context.generateKey(),
		style: toHeadingStyle(level),
		children
	};
	if (markDefs.length > 0) result.markDefs = markDefs;
	return [result];
};
/**
* core/list → blocks with listItem
*
* Handles both old format (HTML list) and new format (innerBlocks with list-item)
*/
const list = (block, _options, context) => {
	const listItem = block.attrs.ordered === true ? "number" : "bullet";
	if (block.innerBlocks.length > 0) return parseListItemBlocks(block.innerBlocks, listItem, 1, context);
	return parseListItems(block.innerHTML.match(UOL_TAG_PATTERN)?.[1] || block.innerHTML, listItem, 1, context);
};
/**
* Parse list-item blocks (WordPress 6.x format)
*/
function parseListItemBlocks(innerBlocks, listItem, level, context) {
	const blocks = [];
	for (const itemBlock of innerBlocks) {
		if (itemBlock.blockName !== "core/list-item") continue;
		const textContent = itemBlock.innerHTML.match(LI_TAG_PATTERN)?.[1]?.trim() || "";
		if (textContent) {
			const { children, markDefs } = context.parseInlineContent(textContent);
			const block = {
				_type: "block",
				_key: context.generateKey(),
				style: "normal",
				listItem,
				level,
				children
			};
			if (markDefs.length > 0) block.markDefs = markDefs;
			blocks.push(block);
		}
		if (itemBlock.innerBlocks.length > 0) {
			for (const nested of itemBlock.innerBlocks) if (nested.blockName === "core/list") {
				const nestedListItem = nested.attrs.ordered === true ? "number" : "bullet";
				blocks.push(...parseListItemBlocks(nested.innerBlocks, nestedListItem, level + 1, context));
			}
		}
	}
	return blocks;
}
/**
* Parse list items from HTML
*/
function parseListItems(html, listItem, level, context) {
	const blocks = [];
	const liItems = extractTopLevelListItems(html);
	for (const liContent of liItems) {
		const nestedUl = liContent.match(UL_TAG_PATTERN);
		const nestedOl = liContent.match(OL_TAG_PATTERN);
		let textContent = liContent.replace(NESTED_LIST_PATTERN, "").trim();
		if (textContent) {
			const { children, markDefs } = context.parseInlineContent(textContent);
			const block = {
				_type: "block",
				_key: context.generateKey(),
				style: "normal",
				listItem,
				level,
				children
			};
			if (markDefs.length > 0) block.markDefs = markDefs;
			blocks.push(block);
		}
		if (nestedUl?.[1]) blocks.push(...parseListItems(nestedUl[1], "bullet", level + 1, context));
		if (nestedOl?.[1]) blocks.push(...parseListItems(nestedOl[1], "number", level + 1, context));
	}
	return blocks;
}
/**
* Extract top-level <li> items from HTML, handling nested lists correctly
*/
function extractTopLevelListItems(html) {
	const items = [];
	let depth = 0;
	let currentItem = "";
	let inLi = false;
	let i = 0;
	while (i < html.length) {
		if (html.substring(i, i + 3).toLowerCase() === "<li") {
			const tagEnd = html.indexOf(">", i);
			if (tagEnd === -1) break;
			if (!inLi) {
				inLi = true;
				i = tagEnd + 1;
				continue;
			} else {
				currentItem += html.substring(i, tagEnd + 1);
				depth++;
				i = tagEnd + 1;
				continue;
			}
		}
		if (html.substring(i, i + 5).toLowerCase() === "</li>") if (depth === 0) {
			items.push(currentItem);
			currentItem = "";
			inLi = false;
			i += 5;
			continue;
		} else {
			currentItem += "</li>";
			depth--;
			i += 5;
			continue;
		}
		if (html.substring(i, i + 3).toLowerCase() === "<ul" || html.substring(i, i + 3).toLowerCase() === "<ol") {
			const tagEnd = html.indexOf(">", i);
			if (tagEnd !== -1) {
				currentItem += html.substring(i, tagEnd + 1);
				i = tagEnd + 1;
				continue;
			}
		}
		if (html.substring(i, i + 5).toLowerCase() === "</ul>" || html.substring(i, i + 5).toLowerCase() === "</ol>") {
			currentItem += html.substring(i, i + 5);
			i += 5;
			continue;
		}
		if (inLi) currentItem += html[i];
		i++;
	}
	if (currentItem.trim()) items.push(currentItem);
	return items.filter((item) => item.trim().length > 0);
}
/**
* core/quote → block with style "blockquote"
*/
const quote = (block, _options, context) => {
	const blocks = [];
	let match;
	while ((match = P_TAG_PATTERN.exec(block.innerHTML)) !== null) {
		const content = match[1] || "";
		const { children, markDefs } = context.parseInlineContent(content);
		const quoteBlock = {
			_type: "block",
			_key: context.generateKey(),
			style: "blockquote",
			children
		};
		if (markDefs.length > 0) quoteBlock.markDefs = markDefs;
		blocks.push(quoteBlock);
	}
	if (blocks.length === 0) {
		const { children, markDefs } = context.parseInlineContent(block.innerHTML);
		const quoteBlock = {
			_type: "block",
			_key: context.generateKey(),
			style: "blockquote",
			children
		};
		if (markDefs.length > 0) quoteBlock.markDefs = markDefs;
		blocks.push(quoteBlock);
	}
	const citation = attrString(block.attrs, "citation");
	if (citation) {
		const { children, markDefs } = context.parseInlineContent(citation);
		const citationBlock = {
			_type: "block",
			_key: context.generateKey(),
			style: "normal",
			children: [{
				_type: "span",
				_key: context.generateKey(),
				text: "— "
			}, ...children]
		};
		if (markDefs.length > 0) citationBlock.markDefs = markDefs;
		blocks.push(citationBlock);
	}
	return blocks;
};
/**
* core/image → image block
*/
const image = (block, options, context) => {
	const wpId = attrNumber(block.attrs, "id");
	const src = attrString(block.attrs, "url") ?? extractSrc(block.innerHTML);
	const alt = attrString(block.attrs, "alt") ?? extractAlt(block.innerHTML);
	const caption = extractCaption(block.innerHTML);
	const align = attrString(block.attrs, "align");
	const ref = wpId && options.mediaMap?.get(wpId);
	return [{
		_type: "image",
		_key: context.generateKey(),
		asset: {
			_type: "reference",
			_ref: ref || String(wpId || src || ""),
			url: src
		},
		alt,
		caption,
		alignment: mapAlignment(align)
	}];
};
/**
* core/code → code block
*/
const code = (block, _options, context) => {
	const decoded = decodeHtmlEntities$1(block.innerHTML.match(CODE_TAG_PATTERN_SINGLE)?.[1] || block.innerHTML);
	return [{
		_type: "code",
		_key: context.generateKey(),
		code: decoded,
		language: attrString(block.attrs, "language")
	}];
};
/**
* core/preformatted → code block (no syntax highlighting)
*/
const preformatted = (block, _options, context) => {
	const text = extractText(block.innerHTML);
	return [{
		_type: "code",
		_key: context.generateKey(),
		code: text
	}];
};
/**
* core/separator / core/spacer → break block
*/
const separator = (_block, _options, context) => {
	return [{
		_type: "break",
		_key: context.generateKey(),
		style: "lineBreak"
	}];
};
/**
* core/gallery → gallery block
*/
const gallery = (block, options, context) => {
	const images = [];
	if (block.innerBlocks.length > 0) {
		for (const innerBlock of block.innerBlocks) if (innerBlock.blockName === "core/image") {
			const wpId = attrNumber(innerBlock.attrs, "id");
			const src = attrString(innerBlock.attrs, "url") ?? extractSrc(innerBlock.innerHTML);
			const alt = attrString(innerBlock.attrs, "alt") ?? extractAlt(innerBlock.innerHTML);
			const caption = extractCaption(innerBlock.innerHTML);
			const ref = wpId && options.mediaMap?.get(wpId);
			images.push({
				_type: "image",
				_key: context.generateKey(),
				asset: {
					_type: "reference",
					_ref: ref || String(wpId || src || ""),
					url: src
				},
				alt,
				caption
			});
		}
	} else {
		let match;
		while ((match = IMG_TAG_GLOBAL.exec(block.innerHTML)) !== null) {
			const imgHtml = match[0];
			const src = extractSrc(imgHtml);
			const alt = extractAlt(imgHtml);
			const idMatch = imgHtml.match(DATA_ID_PATTERN);
			const wpId = idMatch?.[1] ? parseInt(idMatch[1], 10) : void 0;
			const ref = wpId && options.mediaMap?.get(wpId);
			images.push({
				_type: "image",
				_key: context.generateKey(),
				asset: {
					_type: "reference",
					_ref: ref || String(wpId || src || ""),
					url: src
				},
				alt
			});
		}
	}
	return [{
		_type: "gallery",
		_key: context.generateKey(),
		images,
		columns: attrNumber(block.attrs, "columns")
	}];
};
/**
* core/columns → columns block
*/
const columns = (block, _options, context) => {
	const columnBlocks = block.innerBlocks.map((col) => ({
		_type: "column",
		_key: context.generateKey(),
		content: context.transformBlocks(col.innerBlocks)
	}));
	return [{
		_type: "columns",
		_key: context.generateKey(),
		columns: columnBlocks
	}];
};
/**
* core/group → flatten children (no special container)
*/
const group = (block, _options, context) => {
	return context.transformBlocks(block.innerBlocks);
};
/**
* core/table → table block
*/
const table = (block, _options, context) => {
	const tableMatch = block.innerHTML.match(TABLE_TAG_PATTERN);
	if (!tableMatch) return [];
	const tableContent = tableMatch[1];
	const theadMatch = tableContent.match(THEAD_TAG_PATTERN);
	const tbodyMatch = tableContent.match(TBODY_TAG_PATTERN);
	const rows = [];
	if (theadMatch?.[1]) {
		const headerRows = parseTableRows(theadMatch[1], context, true);
		rows.push(...headerRows);
	}
	if (tbodyMatch?.[1]) {
		const bodyRows = parseTableRows(tbodyMatch[1], context, false);
		rows.push(...bodyRows);
	} else if (!theadMatch) {
		const directRows = parseTableRows(tableContent, context, false);
		rows.push(...directRows);
	}
	if (rows.length === 0) return [];
	return [{
		_type: "table",
		_key: context.generateKey(),
		rows,
		hasHeaderRow: !!theadMatch
	}];
};
/**
* Parse table rows from HTML
*/
function parseTableRows(html, context, isHeader) {
	const rows = [];
	let rowMatch;
	while ((rowMatch = TABLE_ROW_PATTERN.exec(html)) !== null) {
		const rowContent = rowMatch[1];
		const cells = [];
		let cellMatch;
		while ((cellMatch = TABLE_CELL_PATTERN.exec(rowContent)) !== null) {
			const isHeaderCell = cellMatch[1].toLowerCase() === "th" || isHeader;
			const cellContent = cellMatch[2];
			const { children, markDefs } = context.parseInlineContent(cellContent);
			cells.push({
				_type: "tableCell",
				_key: context.generateKey(),
				content: children,
				markDefs: markDefs.length > 0 ? markDefs : void 0,
				isHeader: isHeaderCell || void 0
			});
		}
		if (cells.length > 0) rows.push({
			_type: "tableRow",
			_key: context.generateKey(),
			cells
		});
	}
	return rows;
}
/**
* Convert a heading level number to a PortableTextTextBlock style
*/
function toHeadingStyle(level) {
	switch (level) {
		case 1: return "h1";
		case 2: return "h2";
		case 3: return "h3";
		case 4: return "h4";
		case 5: return "h5";
		case 6: return "h6";
		default: return "h2";
	}
}
/**
* Map WordPress alignment to Portable Text alignment
*/
function mapAlignment(align) {
	switch (align) {
		case "left":
		case "center":
		case "right":
		case "wide":
		case "full": return align;
		default: return;
	}
}
/**
* Decode HTML entities
*/
function decodeHtmlEntities$1(html) {
	return html.replace(LT_ENTITY_PATTERN, "<").replace(GT_ENTITY_PATTERN, ">").replace(AMP_ENTITY_PATTERN$1, "&").replace(QUOT_ENTITY_PATTERN, "\"").replace(APOS_ENTITY_PATTERN$1, "'").replace(NBSP_ENTITY_PATTERN$1, " ");
}
/**
* core/button → button block
*/
const button = (block, _options, context) => {
	const url = sanitizeHref(attrString(block.attrs, "url"));
	const text = extractText(block.innerHTML).trim() || "Button";
	let style = "default";
	const className = attrString(block.attrs, "className");
	if (className?.includes("is-style-outline")) style = "outline";
	else if (className?.includes("is-style-fill")) style = "fill";
	return [{
		_type: "button",
		_key: context.generateKey(),
		text,
		url,
		style
	}];
};
/**
* core/buttons → buttons container block
*/
const buttons = (block, _options, context) => {
	const buttonBlocks = [];
	for (const innerBlock of block.innerBlocks) if (innerBlock.blockName === "core/button") {
		const url = attrString(innerBlock.attrs, "url");
		const text = extractText(innerBlock.innerHTML).trim() || "Button";
		let style = "default";
		const className = attrString(innerBlock.attrs, "className");
		if (className?.includes("is-style-outline")) style = "outline";
		else if (className?.includes("is-style-fill")) style = "fill";
		buttonBlocks.push({
			_type: "button",
			_key: context.generateKey(),
			text,
			url,
			style
		});
	}
	const layoutObj = attrObject(block.attrs, "layout");
	const layout = layoutObj && typeof layoutObj["type"] === "string" && layoutObj["type"] === "flex" ? "horizontal" : "vertical";
	return [{
		_type: "buttons",
		_key: context.generateKey(),
		buttons: buttonBlocks,
		layout
	}];
};
/**
* core/cover → cover block
*/
const cover = (block, _options, context) => {
	const url = attrString(block.attrs, "url");
	const overlayColor = attrString(block.attrs, "overlayColor");
	const customOverlayColor = attrString(block.attrs, "customOverlayColor");
	const dimRatio = attrNumber(block.attrs, "dimRatio");
	const minHeight = attrNumber(block.attrs, "minHeight");
	const minHeightUnit = attrString(block.attrs, "minHeightUnit");
	const contentPosition = attrString(block.attrs, "contentPosition");
	const content = context.transformBlocks(block.innerBlocks);
	let alignment;
	if (contentPosition?.includes("left")) alignment = "left";
	else if (contentPosition?.includes("right")) alignment = "right";
	else if (contentPosition?.includes("center")) alignment = "center";
	let minHeightStr;
	if (minHeight !== void 0) minHeightStr = minHeightUnit ? `${minHeight}${minHeightUnit}` : `${minHeight}px`;
	return [{
		_type: "cover",
		_key: context.generateKey(),
		backgroundImage: url,
		overlayColor: customOverlayColor || overlayColor,
		overlayOpacity: dimRatio !== void 0 ? dimRatio / 100 : void 0,
		content,
		minHeight: minHeightStr,
		alignment
	}];
};
/**
* core/file → file block
*/
const file = (block, _options, context) => {
	const href = sanitizeHref(attrString(block.attrs, "href"));
	const fileName = attrString(block.attrs, "fileName");
	const showDownloadButton = attrBoolean(block.attrs, "showDownloadButton");
	let url = href;
	if (!url) url = sanitizeHref(block.innerHTML.match(HREF_PATTERN)?.[1]);
	let filename = fileName;
	if (!filename && url) filename = url.split("/").pop()?.split("?")[0];
	return [{
		_type: "file",
		_key: context.generateKey(),
		url: url || "",
		filename,
		showDownloadButton: showDownloadButton !== false
	}];
};
/**
* core/pullquote → pullquote block
*/
const pullquote = (block, _options, context) => {
	const pMatch = block.innerHTML.match(P_TAG_SINGLE_PATTERN);
	const text = pMatch ? extractText(pMatch[1]) : extractText(block.innerHTML);
	const citeMatch = block.innerHTML.match(CITE_TAG_PATTERN);
	const citation = citeMatch ? extractText(citeMatch[1]) : attrString(block.attrs, "citation");
	return [{
		_type: "pullquote",
		_key: context.generateKey(),
		text: text.trim(),
		citation: citation?.trim()
	}];
};
/**
* core/html → htmlBlock (pass through)
*/
const html = (block, _options, context) => {
	return [{
		_type: "htmlBlock",
		_key: context.generateKey(),
		html: block.innerHTML.trim(),
		originalBlockName: "core/html"
	}];
};
/**
* core/verse → code block (preserves whitespace like preformatted)
*/
const verse = (block, _options, context) => {
	const text = extractText(block.innerHTML);
	return [{
		_type: "code",
		_key: context.generateKey(),
		code: text,
		language: "text"
	}];
};
/**
* core/more → break block with "readMore" style
*/
const more = (_block, _options, context) => {
	return [{
		_type: "break",
		_key: context.generateKey(),
		style: "lineBreak"
	}];
};
/**
* core/nextpage → break block with page break indicator
*/
const nextpage = (_block, _options, context) => {
	return [{
		_type: "break",
		_key: context.generateKey(),
		style: "lineBreak"
	}];
};
/**
* core/shortcode → htmlBlock (preserve for manual handling)
*/
const shortcode = (block, _options, context) => {
	return [{
		_type: "htmlBlock",
		_key: context.generateKey(),
		html: block.innerHTML.trim(),
		originalBlockName: "core/shortcode"
	}];
};
/**
* core/media-text → columns block with 2 columns
*/
const mediaText = (block, _options, context) => {
	const mediaId = attrNumber(block.attrs, "mediaId");
	const mediaUrl = attrString(block.attrs, "mediaUrl");
	const mediaType = attrString(block.attrs, "mediaType");
	const mediaPosition = attrString(block.attrs, "mediaPosition");
	const mediaAlt = attrString(block.attrs, "mediaAlt");
	const mediaBlock = mediaType === "video" ? [{
		_type: "embed",
		_key: context.generateKey(),
		url: mediaUrl || "",
		provider: "video"
	}] : [{
		_type: "image",
		_key: context.generateKey(),
		asset: {
			_type: "reference",
			_ref: String(mediaId || mediaUrl || ""),
			url: mediaUrl
		},
		alt: mediaAlt
	}];
	const contentBlocks = context.transformBlocks(block.innerBlocks);
	const mediaTextColumns = mediaPosition === "right" ? [{
		_type: "column",
		_key: context.generateKey(),
		content: contentBlocks
	}, {
		_type: "column",
		_key: context.generateKey(),
		content: mediaBlock
	}] : [{
		_type: "column",
		_key: context.generateKey(),
		content: mediaBlock
	}, {
		_type: "column",
		_key: context.generateKey(),
		content: contentBlocks
	}];
	return [{
		_type: "columns",
		_key: context.generateKey(),
		columns: mediaTextColumns
	}];
};

//#endregion
//#region src/transformers/embed.ts
var embed_exports = /* @__PURE__ */ __exportAll({
	audio: () => audio,
	embed: () => embed,
	twitter: () => twitter,
	video: () => video,
	vimeo: () => vimeo,
	youtube: () => youtube
});
const IFRAME_SRC_PATTERN = /<iframe[^>]+src=["']([^"']+)["']/i;
const VIDEO_SRC_PATTERN = /<video[^>]+src=["']([^"']+)["']/i;
const VIDEO_SOURCE_PATTERN = /<source[^>]+src=["']([^"']+)["']/i;
const AUDIO_SRC_PATTERN = /<audio[^>]+src=["']([^"']+)["']/i;
const AUDIO_SOURCE_PATTERN = /<source[^>]+src=["']([^"']+)["']/i;
/**
* core/embed and variants → embed block
*/
const embed = (block, _options, context) => {
	const url = attrString(block.attrs, "url");
	const providerSlug = attrString(block.attrs, "providerNameSlug");
	const iframeSrc = block.innerHTML.match(IFRAME_SRC_PATTERN)?.[1];
	return [{
		_type: "embed",
		_key: context.generateKey(),
		url: url || iframeSrc || "",
		provider: providerSlug || detectProvider(url || iframeSrc || ""),
		html: block.innerHTML.trim() || void 0
	}];
};
/**
* core-embed/youtube → embed block
*/
const youtube = (block, options, context) => {
	return embed(block, options, context);
};
/**
* core-embed/twitter → embed block
*/
const twitter = (block, options, context) => {
	return embed(block, options, context);
};
/**
* core-embed/vimeo → embed block
*/
const vimeo = (block, options, context) => {
	return embed(block, options, context);
};
/**
* core/video → embed block (self-hosted video)
*/
const video = (block, _options, context) => {
	const src = attrString(block.attrs, "src");
	const videoMatch = block.innerHTML.match(VIDEO_SRC_PATTERN);
	const sourceMatch = block.innerHTML.match(VIDEO_SOURCE_PATTERN);
	const videoSrc = src || videoMatch?.[1] || sourceMatch?.[1];
	return [{
		_type: "embed",
		_key: context.generateKey(),
		url: videoSrc || "",
		provider: "video",
		html: block.innerHTML.trim() || void 0
	}];
};
/**
* core/audio → embed block (self-hosted audio)
*/
const audio = (block, _options, context) => {
	const src = attrString(block.attrs, "src");
	const audioMatch = block.innerHTML.match(AUDIO_SRC_PATTERN);
	const sourceMatch = block.innerHTML.match(AUDIO_SOURCE_PATTERN);
	const audioSrc = src || audioMatch?.[1] || sourceMatch?.[1];
	return [{
		_type: "embed",
		_key: context.generateKey(),
		url: audioSrc || "",
		provider: "audio",
		html: block.innerHTML.trim() || void 0
	}];
};
/**
* Detect embed provider from URL
*/
function detectProvider(url) {
	if (!url) return void 0;
	const urlLower = url.toLowerCase();
	if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) return "youtube";
	if (urlLower.includes("vimeo.com")) return "vimeo";
	if (urlLower.includes("twitter.com") || urlLower.includes("x.com")) return "twitter";
	if (urlLower.includes("instagram.com")) return "instagram";
	if (urlLower.includes("facebook.com")) return "facebook";
	if (urlLower.includes("tiktok.com")) return "tiktok";
	if (urlLower.includes("spotify.com")) return "spotify";
	if (urlLower.includes("soundcloud.com")) return "soundcloud";
	if (urlLower.includes("codepen.io")) return "codepen";
	if (urlLower.includes("gist.github.com")) return "gist";
}

//#endregion
//#region src/transformers/index.ts
/**
* Default block transformers for core WordPress blocks
*/
const defaultTransformers = {
	"core/paragraph": paragraph,
	"core/heading": heading,
	"core/list": list,
	"core/quote": quote,
	"core/code": code,
	"core/preformatted": preformatted,
	"core/pullquote": pullquote,
	"core/verse": verse,
	"core/image": image,
	"core/gallery": gallery,
	"core/file": file,
	"core/media-text": mediaText,
	"core/cover": cover,
	"core/columns": columns,
	"core/group": group,
	"core/separator": separator,
	"core/spacer": separator,
	"core/table": table,
	"core/buttons": buttons,
	"core/button": button,
	"core/more": more,
	"core/nextpage": nextpage,
	"core/html": html,
	"core/shortcode": shortcode,
	"core/embed": embed,
	"core/video": video,
	"core/audio": audio,
	"core-embed/youtube": youtube,
	"core-embed/twitter": twitter,
	"core-embed/vimeo": vimeo,
	"core-embed/facebook": embed,
	"core-embed/instagram": embed,
	"core-embed/soundcloud": embed,
	"core-embed/spotify": embed
};
/**
* Fallback transformer for unknown blocks
* Stores the original HTML for manual review
*/
const fallbackTransformer = (block, _options, context) => {
	if (!block.innerHTML.trim() && block.innerBlocks.length === 0) return [];
	if (block.innerBlocks.length > 0) return context.transformBlocks(block.innerBlocks);
	return [{
		_type: "htmlBlock",
		_key: context.generateKey(),
		html: block.innerHTML,
		originalBlockName: block.blockName,
		originalAttrs: Object.keys(block.attrs).length > 0 ? block.attrs : void 0
	}];
};
/**
* Get transformer for a block
*/
function getTransformer(blockName, customTransformers) {
	if (!blockName) return fallbackTransformer;
	if (customTransformers?.[blockName]) return customTransformers[blockName];
	if (defaultTransformers[blockName]) return defaultTransformers[blockName];
	return fallbackTransformer;
}

//#endregion
//#region src/index.ts
/**
* Gutenberg to Portable Text Converter
*
* Converts WordPress Gutenberg block content to Portable Text format.
* Uses @wordpress/block-serialization-default-parser to parse the hybrid
* HTML+JSON format that WordPress uses.
*/
const BLOCK_ELEMENT_PATTERN = /<(p|h[1-6]|blockquote|pre|ul|ol|figure|div|hr)[^>]*>([\s\S]*?)<\/\1>|<(hr|br)\s*\/?>|<img\s+[^>]+\/?>/gu;
const LINKED_IMAGE_PATTERN = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>\s*<img\s+([^>]+)\/?>\s*<\/a>/gu;
const STANDALONE_IMAGE_PATTERN = /<img\s+[^>]+\/?>/gu;
const IMG_TAG_PATTERN = /<img[^>]+>/i;
const SRC_ATTR_PATTERN = /src=["']([^"']+)["']/i;
const ALT_ATTR_PATTERN = /alt=["']([^"']*)["']/i;
const LIST_ITEM_PATTERN = /<li[^>]*>([\s\S]*?)<\/li>/gu;
const CODE_TAG_PATTERN = /<code[^>]*>([\s\S]*?)<\/code>/i;
const HTML_TAG_PATTERN = /<[^>]+>/g;
const FIGCAPTION_TAG_PATTERN = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i;
const AMP_ENTITY_PATTERN = /&amp;/g;
const LESS_THAN_ENTITY_PATTERN = /&lt;/g;
const GREATER_THAN_ENTITY_PATTERN = /&gt;/g;
const QUOTE_ENTITY_PATTERN = /&quot;/g;
const APOS_ENTITY_PATTERN = /&#039;/g;
const NUMERIC_AMP_ENTITY_PATTERN = /&#0?38;/g;
const HEX_AMP_ENTITY_PATTERN = /&#x26;/gi;
const NBSP_ENTITY_PATTERN = /&nbsp;/g;
/**
* Default key generator
*/
function createKeyGenerator() {
	let counter = 0;
	return () => {
		counter++;
		return `key-${counter}-${Math.random().toString(36).substring(2, 7)}`;
	};
}
/**
* Normalize parsed blocks from the WP parser into our GutenbergBlock type.
* The WP parser returns `attrs: Record<string, any> | null`, so we normalize
* null attrs to empty objects and recursively process innerBlocks.
*/
function normalizeBlocks(blocks) {
	return blocks.map((block) => ({
		blockName: block.blockName,
		attrs: block.attrs ?? {},
		innerHTML: block.innerHTML,
		innerBlocks: normalizeBlocks(block.innerBlocks),
		innerContent: block.innerContent
	}));
}
/**
* Convert WordPress Gutenberg content to Portable Text
*
* @param content - WordPress post content (HTML with Gutenberg block comments)
* @param options - Conversion options
* @returns Array of Portable Text blocks
*
* @example
* ```ts
* const portableText = gutenbergToPortableText(`
*   <!-- wp:paragraph -->
*   <p>Hello <strong>world</strong>!</p>
*   <!-- /wp:paragraph -->
* `);
* // → [{ _type: "block", style: "normal", children: [...] }]
* ```
*/
function gutenbergToPortableText(content, options = {}) {
	if (!content || !content.trim()) return [];
	if (!content.includes("<!-- wp:")) return htmlToPortableText(content, options);
	const blocks = normalizeBlocks(parse(content));
	const context = createTransformContext(options, options.keyGenerator || createKeyGenerator());
	return blocks.flatMap((block) => transformBlock(block, options, context));
}
/**
* Convert plain HTML (classic editor) to Portable Text
*/
function htmlToPortableText(html, options = {}) {
	const generateKey = options.keyGenerator || createKeyGenerator();
	const blocks = [];
	let lastIndex = 0;
	let match;
	while ((match = BLOCK_ELEMENT_PATTERN.exec(html)) !== null) {
		const fullMatch = match[0];
		const tag = (match[1] || match[3] || "").toLowerCase();
		const content = match[2] || "";
		const between = html.slice(lastIndex, match.index).trim();
		if (between) {
			const { children, markDefs } = parseInlineContent(between, generateKey);
			if (children.some((c) => c.text.trim())) blocks.push({
				_type: "block",
				_key: generateKey(),
				style: "normal",
				children,
				markDefs: markDefs.length > 0 ? markDefs : void 0
			});
		}
		lastIndex = match.index + match[0].length;
		if (fullMatch.toLowerCase().startsWith("<img")) {
			const srcMatch = fullMatch.match(SRC_ATTR_PATTERN);
			const altMatch = fullMatch.match(ALT_ATTR_PATTERN);
			if (srcMatch?.[1]) {
				const imgUrl = decodeUrlEntities(srcMatch[1]);
				blocks.push({
					_type: "image",
					_key: generateKey(),
					asset: {
						_type: "reference",
						_ref: imgUrl,
						url: imgUrl
					},
					alt: altMatch?.[1]
				});
			}
			continue;
		}
		switch (tag) {
			case "p":
			case "div": {
				const linkedImgPositions = [];
				let linkedMatch;
				while ((linkedMatch = LINKED_IMAGE_PATTERN.exec(content)) !== null) {
					const linkUrl = decodeUrlEntities(linkedMatch[1]);
					const imgAttrs = linkedMatch[2];
					const srcMatch = imgAttrs.match(SRC_ATTR_PATTERN);
					const altMatch = imgAttrs.match(ALT_ATTR_PATTERN);
					if (srcMatch?.[1]) {
						const imgUrl = decodeUrlEntities(srcMatch[1]);
						blocks.push({
							_type: "image",
							_key: generateKey(),
							asset: {
								_type: "reference",
								_ref: imgUrl,
								url: imgUrl
							},
							alt: altMatch?.[1],
							link: linkUrl
						});
					}
					linkedImgPositions.push({
						start: linkedMatch.index,
						end: linkedMatch.index + linkedMatch[0].length
					});
				}
				let imgMatch;
				while ((imgMatch = STANDALONE_IMAGE_PATTERN.exec(content)) !== null) {
					if (linkedImgPositions.some((pos) => imgMatch.index >= pos.start && imgMatch.index < pos.end)) continue;
					const srcMatch = imgMatch[0].match(SRC_ATTR_PATTERN);
					const altMatch = imgMatch[0].match(ALT_ATTR_PATTERN);
					if (srcMatch?.[1]) {
						const imgUrl = decodeUrlEntities(srcMatch[1]);
						blocks.push({
							_type: "image",
							_key: generateKey(),
							asset: {
								_type: "reference",
								_ref: imgUrl,
								url: imgUrl
							},
							alt: altMatch?.[1]
						});
					}
				}
				let textContent = content.replace(LINKED_IMAGE_PATTERN, "").replace(STANDALONE_IMAGE_PATTERN, "").trim();
				if (textContent) {
					const { children, markDefs } = parseInlineContent(textContent, generateKey);
					if (children.some((c) => c.text.trim())) blocks.push({
						_type: "block",
						_key: generateKey(),
						style: "normal",
						children,
						markDefs: markDefs.length > 0 ? markDefs : void 0
					});
				}
				break;
			}
			case "h1":
			case "h2":
			case "h3":
			case "h4":
			case "h5":
			case "h6": {
				const { children, markDefs } = parseInlineContent(content, generateKey);
				blocks.push({
					_type: "block",
					_key: generateKey(),
					style: tag,
					children,
					markDefs: markDefs.length > 0 ? markDefs : void 0
				});
				break;
			}
			case "blockquote": {
				const { children, markDefs } = parseInlineContent(content, generateKey);
				blocks.push({
					_type: "block",
					_key: generateKey(),
					style: "blockquote",
					children,
					markDefs: markDefs.length > 0 ? markDefs : void 0
				});
				break;
			}
			case "pre": {
				const code = content.match(CODE_TAG_PATTERN)?.[1] || content;
				blocks.push({
					_type: "code",
					_key: generateKey(),
					code: decodeHtmlEntities(code)
				});
				break;
			}
			case "ul":
			case "ol": {
				const listItem = tag === "ol" ? "number" : "bullet";
				let liMatch;
				while ((liMatch = LIST_ITEM_PATTERN.exec(content)) !== null) {
					const { children, markDefs } = parseInlineContent(liMatch[1] || "", generateKey);
					blocks.push({
						_type: "block",
						_key: generateKey(),
						style: "normal",
						listItem,
						level: 1,
						children,
						markDefs: markDefs.length > 0 ? markDefs : void 0
					});
				}
				break;
			}
			case "hr":
				blocks.push({
					_type: "break",
					_key: generateKey(),
					style: "lineBreak"
				});
				break;
			case "figure": {
				const imgMatch = content.match(IMG_TAG_PATTERN);
				if (imgMatch) {
					const srcMatch = imgMatch[0].match(SRC_ATTR_PATTERN);
					const altMatch = imgMatch[0].match(ALT_ATTR_PATTERN);
					const captionMatch = content.match(FIGCAPTION_TAG_PATTERN);
					const imgUrl = srcMatch?.[1] ? decodeUrlEntities(srcMatch[1]) : "";
					blocks.push({
						_type: "image",
						_key: generateKey(),
						asset: {
							_type: "reference",
							_ref: imgUrl,
							url: imgUrl || void 0
						},
						alt: altMatch?.[1],
						caption: captionMatch?.[1]?.replace(HTML_TAG_PATTERN, "").trim()
					});
				}
				break;
			}
		}
	}
	const remaining = html.slice(lastIndex).trim();
	if (remaining) {
		const { children, markDefs } = parseInlineContent(remaining, generateKey);
		if (children.some((c) => c.text.trim())) blocks.push({
			_type: "block",
			_key: generateKey(),
			style: "normal",
			children,
			markDefs: markDefs.length > 0 ? markDefs : void 0
		});
	}
	return blocks;
}
/**
* Create transform context for recursive block transformation
*/
function createTransformContext(options, generateKey) {
	const context = {
		generateKey,
		parseInlineContent: (html) => parseInlineContent(html, generateKey),
		transformBlocks: (blocks) => blocks.flatMap((block) => transformBlock(block, options, context))
	};
	return context;
}
/**
* Transform a single block
*/
function transformBlock(block, options, context) {
	return getTransformer(block.blockName, options.customTransformers)(block, options, context);
}
/**
* Decode HTML entities
*/
function decodeHtmlEntities(html) {
	return html.replace(LESS_THAN_ENTITY_PATTERN, "<").replace(GREATER_THAN_ENTITY_PATTERN, ">").replace(AMP_ENTITY_PATTERN, "&").replace(QUOTE_ENTITY_PATTERN, "\"").replace(APOS_ENTITY_PATTERN, "'").replace(NUMERIC_AMP_ENTITY_PATTERN, "&").replace(HEX_AMP_ENTITY_PATTERN, "&").replace(NBSP_ENTITY_PATTERN, " ");
}
/**
* Decode HTML entities in URLs (used for image src attributes)
*/
function decodeUrlEntities(url) {
	return url.replace(AMP_ENTITY_PATTERN, "&").replace(NUMERIC_AMP_ENTITY_PATTERN, "&").replace(HEX_AMP_ENTITY_PATTERN, "&");
}
/**
* Parse Gutenberg blocks without converting to Portable Text
* Useful for inspection and debugging
*/
function parseGutenbergBlocks(content) {
	if (!content || !content.trim()) return [];
	return normalizeBlocks(parse(content));
}

//#endregion
export { core_exports as coreTransformers, defaultTransformers, embed_exports as embedTransformers, extractAlt, extractCaption, extractSrc, extractText, fallbackTransformer, gutenbergToPortableText, htmlToPortableText, parseGutenbergBlocks, parseInlineContent };
//# sourceMappingURL=index.mjs.map