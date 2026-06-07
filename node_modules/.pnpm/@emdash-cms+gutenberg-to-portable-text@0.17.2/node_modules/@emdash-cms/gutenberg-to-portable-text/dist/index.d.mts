//#region src/types.d.ts
/**
 * Types for Gutenberg to Portable Text conversion
 */
/**
 * Gutenberg block as parsed by @wordpress/block-serialization-default-parser
 */
interface GutenbergBlock {
  /** Block name like "core/paragraph" or null for freeform HTML */
  blockName: string | null;
  /** Block attributes from the JSON comment */
  attrs: Record<string, unknown>;
  /** Inner HTML content */
  innerHTML: string;
  /** Nested blocks (for columns, groups, etc.) */
  innerBlocks: GutenbergBlock[];
  /** Content parts between inner blocks */
  innerContent: Array<string | null>;
}
/**
 * Portable Text span (inline text with marks)
 */
interface PortableTextSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}
/**
 * Portable Text mark definition (for links, annotations)
 */
interface PortableTextMarkDef {
  _type: string;
  _key: string;
  [key: string]: unknown;
}
/**
 * Portable Text text block
 */
interface PortableTextTextBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}
/**
 * Portable Text image block
 */
interface PortableTextImageBlock {
  _type: "image";
  _key: string;
  asset: {
    _type: "reference";
    _ref: string;
    url?: string;
  };
  alt?: string;
  caption?: string;
  alignment?: "left" | "center" | "right" | "wide" | "full";
  link?: string;
}
/**
 * Portable Text code block
 */
interface PortableTextCodeBlock {
  _type: "code";
  _key: string;
  code: string;
  language?: string;
}
/**
 * Portable Text embed block (YouTube, Twitter, etc.)
 */
interface PortableTextEmbedBlock {
  _type: "embed";
  _key: string;
  url: string;
  provider?: string;
  html?: string;
}
/**
 * Portable Text gallery block
 */
interface PortableTextGalleryBlock {
  _type: "gallery";
  _key: string;
  images: Array<{
    _type: "image";
    _key: string;
    asset: {
      _type: "reference";
      _ref: string;
      url?: string;
    };
    alt?: string;
    caption?: string;
  }>;
  columns?: number;
}
/**
 * Portable Text columns block
 */
interface PortableTextColumnsBlock {
  _type: "columns";
  _key: string;
  columns: Array<{
    _type: "column";
    _key: string;
    content: PortableTextBlock[];
  }>;
}
/**
 * Portable Text break/divider block
 */
interface PortableTextBreakBlock {
  _type: "break";
  _key: string;
  style: "lineBreak";
}
/**
 * Portable Text table block
 */
interface PortableTextTableBlock {
  _type: "table";
  _key: string;
  rows: Array<{
    _type: "tableRow";
    _key: string;
    cells: Array<{
      _type: "tableCell";
      _key: string;
      content: PortableTextSpan[];
      markDefs?: PortableTextMarkDef[];
      isHeader?: boolean;
    }>;
  }>;
  hasHeaderRow?: boolean;
}
/**
 * Fallback HTML block for unconvertible content
 */
interface PortableTextHtmlBlock {
  _type: "htmlBlock";
  _key: string;
  html: string;
  originalBlockName?: string | null;
  originalAttrs?: Record<string, unknown>;
}
/**
 * Portable Text button block
 */
interface PortableTextButtonBlock {
  _type: "button";
  _key: string;
  text: string;
  url?: string;
  style?: "default" | "outline" | "fill";
}
/**
 * Portable Text buttons container block
 */
interface PortableTextButtonsBlock {
  _type: "buttons";
  _key: string;
  buttons: PortableTextButtonBlock[];
  layout?: "horizontal" | "vertical";
}
/**
 * Portable Text cover block (image/video with text overlay)
 */
interface PortableTextCoverBlock {
  _type: "cover";
  _key: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  content: PortableTextBlock[];
  minHeight?: string;
  alignment?: "left" | "center" | "right";
}
/**
 * Portable Text file download block
 */
interface PortableTextFileBlock {
  _type: "file";
  _key: string;
  url: string;
  filename?: string;
  showDownloadButton?: boolean;
}
/**
 * Portable Text pullquote block
 */
interface PortableTextPullquoteBlock {
  _type: "pullquote";
  _key: string;
  text: string;
  citation?: string;
}
/**
 * Union of all Portable Text block types
 */
type PortableTextBlock = PortableTextTextBlock | PortableTextImageBlock | PortableTextCodeBlock | PortableTextEmbedBlock | PortableTextGalleryBlock | PortableTextColumnsBlock | PortableTextBreakBlock | PortableTextTableBlock | PortableTextHtmlBlock | PortableTextButtonBlock | PortableTextButtonsBlock | PortableTextCoverBlock | PortableTextFileBlock | PortableTextPullquoteBlock;
/**
 * Options for the conversion
 */
interface ConvertOptions {
  /** Map of WordPress media IDs to EmDash media IDs/URLs */
  mediaMap?: Map<number, string>;
  /** Custom block transformers */
  customTransformers?: Record<string, BlockTransformer>;
  /** Whether to generate keys (default: true) */
  generateKeys?: boolean;
  /** Custom key generator */
  keyGenerator?: () => string;
}
/**
 * Block transformer function
 */
type BlockTransformer = (block: GutenbergBlock, options: ConvertOptions, context: TransformContext) => PortableTextBlock[];
/**
 * Context passed to transformers
 */
interface TransformContext {
  /** Transform child blocks recursively */
  transformBlocks: (blocks: GutenbergBlock[]) => PortableTextBlock[];
  /** Parse inline HTML to spans */
  parseInlineContent: (html: string) => {
    children: PortableTextSpan[];
    markDefs: PortableTextMarkDef[];
  };
  /** Generate a unique key */
  generateKey: () => string;
}
//#endregion
//#region src/transformers/index.d.ts
/**
 * Default block transformers for core WordPress blocks
 */
declare const defaultTransformers: Record<string, BlockTransformer>;
/**
 * Fallback transformer for unknown blocks
 * Stores the original HTML for manual review
 */
declare const fallbackTransformer: BlockTransformer;
declare namespace core_d_exports {
  export { button, buttons, code, columns, cover, file, gallery, group, heading, html, image, list, mediaText, more, nextpage, paragraph, preformatted, pullquote, quote, separator, shortcode, table, verse };
}
/**
 * core/paragraph → block with style "normal"
 */
declare const paragraph: BlockTransformer;
/**
 * core/heading → block with style "h1"-"h6"
 */
declare const heading: BlockTransformer;
/**
 * core/list → blocks with listItem
 *
 * Handles both old format (HTML list) and new format (innerBlocks with list-item)
 */
declare const list: BlockTransformer;
/**
 * core/quote → block with style "blockquote"
 */
declare const quote: BlockTransformer;
/**
 * core/image → image block
 */
declare const image: BlockTransformer;
/**
 * core/code → code block
 */
declare const code: BlockTransformer;
/**
 * core/preformatted → code block (no syntax highlighting)
 */
declare const preformatted: BlockTransformer;
/**
 * core/separator / core/spacer → break block
 */
declare const separator: BlockTransformer;
/**
 * core/gallery → gallery block
 */
declare const gallery: BlockTransformer;
/**
 * core/columns → columns block
 */
declare const columns: BlockTransformer;
/**
 * core/group → flatten children (no special container)
 */
declare const group: BlockTransformer;
/**
 * core/table → table block
 */
declare const table: BlockTransformer;
/**
 * core/button → button block
 */
declare const button: BlockTransformer;
/**
 * core/buttons → buttons container block
 */
declare const buttons: BlockTransformer;
/**
 * core/cover → cover block
 */
declare const cover: BlockTransformer;
/**
 * core/file → file block
 */
declare const file: BlockTransformer;
/**
 * core/pullquote → pullquote block
 */
declare const pullquote: BlockTransformer;
/**
 * core/html → htmlBlock (pass through)
 */
declare const html: BlockTransformer;
/**
 * core/verse → code block (preserves whitespace like preformatted)
 */
declare const verse: BlockTransformer;
/**
 * core/more → break block with "readMore" style
 */
declare const more: BlockTransformer;
/**
 * core/nextpage → break block with page break indicator
 */
declare const nextpage: BlockTransformer;
/**
 * core/shortcode → htmlBlock (preserve for manual handling)
 */
declare const shortcode: BlockTransformer;
/**
 * core/media-text → columns block with 2 columns
 */
declare const mediaText: BlockTransformer;
declare namespace embed_d_exports {
  export { audio, embed, twitter, video, vimeo, youtube };
}
/**
 * core/embed and variants → embed block
 */
declare const embed: BlockTransformer;
/**
 * core-embed/youtube → embed block
 */
declare const youtube: BlockTransformer;
/**
 * core-embed/twitter → embed block
 */
declare const twitter: BlockTransformer;
/**
 * core-embed/vimeo → embed block
 */
declare const vimeo: BlockTransformer;
/**
 * core/video → embed block (self-hosted video)
 */
declare const video: BlockTransformer;
/**
 * core/audio → embed block (self-hosted audio)
 */
declare const audio: BlockTransformer;
//#endregion
//#region src/inline.d.ts
interface ParseResult {
  children: PortableTextSpan[];
  markDefs: PortableTextMarkDef[];
}
/**
 * Parse inline HTML content into Portable Text spans
 */
declare function parseInlineContent(html: string, generateKey: () => string): ParseResult;
/**
 * Extract plain text from HTML (for alt text, captions)
 */
declare function extractText(html: string): string;
/**
 * Extract alt text from an img element in HTML
 */
declare function extractAlt(html: string): string | undefined;
/**
 * Extract caption from a figcaption element
 */
declare function extractCaption(html: string): string | undefined;
/**
 * Extract src from an img element
 */
declare function extractSrc(html: string): string | undefined;
//#endregion
//#region src/index.d.ts
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
declare function gutenbergToPortableText(content: string, options?: ConvertOptions): PortableTextBlock[];
/**
 * Convert plain HTML (classic editor) to Portable Text
 */
declare function htmlToPortableText(html: string, options?: ConvertOptions): PortableTextBlock[];
/**
 * Parse Gutenberg blocks without converting to Portable Text
 * Useful for inspection and debugging
 */
declare function parseGutenbergBlocks(content: string): GutenbergBlock[];
//#endregion
export { type BlockTransformer, type ConvertOptions, type GutenbergBlock, type PortableTextBlock, type PortableTextBreakBlock, type PortableTextButtonBlock, type PortableTextButtonsBlock, type PortableTextCodeBlock, type PortableTextColumnsBlock, type PortableTextCoverBlock, type PortableTextEmbedBlock, type PortableTextFileBlock, type PortableTextGalleryBlock, type PortableTextHtmlBlock, type PortableTextImageBlock, type PortableTextMarkDef, type PortableTextPullquoteBlock, type PortableTextSpan, type PortableTextTextBlock, type TransformContext, core_d_exports as coreTransformers, defaultTransformers, embed_d_exports as embedTransformers, extractAlt, extractCaption, extractSrc, extractText, fallbackTransformer, gutenbergToPortableText, htmlToPortableText, parseGutenbergBlocks, parseInlineContent };
//# sourceMappingURL=index.d.mts.map