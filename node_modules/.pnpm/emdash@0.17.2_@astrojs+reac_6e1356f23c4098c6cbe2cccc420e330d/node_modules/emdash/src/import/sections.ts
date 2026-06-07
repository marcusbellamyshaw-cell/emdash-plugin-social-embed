/**
 * Sections import functions
 *
 * Import reusable blocks from WordPress WXR exports as EmDash sections.
 */

import type { PortableTextBlock } from "@emdash-cms/gutenberg-to-portable-text";
import { gutenbergToPortableText } from "@emdash-cms/gutenberg-to-portable-text";
import type { Kysely } from "kysely";
import { ulid } from "ulidx";

import type { WxrPost } from "../cli/wxr/parser.js";
import type { Database } from "../database/types.js";
import { slugify } from "../utils/slugify.js";

/**
 * Result of sections import operation
 */
export interface SectionsImportResult {
	/** Number of sections created */
	sectionsCreated: number;
	/** Number of sections skipped (already exist) */
	sectionsSkipped: number;
	/** Errors encountered during import */
	errors: Array<{ title: string; error: string }>;
}

/**
 * Import reusable blocks (wp_block post type) from WXR as sections
 *
 * @param posts - All posts from WXR (will filter to wp_block)
 * @param db - Database connection
 * @returns Import result with counts
 */
export async function importReusableBlocksAsSections(
	posts: WxrPost[],
	db: Kysely<Database>,
): Promise<SectionsImportResult> {
	const result: SectionsImportResult = {
		sectionsCreated: 0,
		sectionsSkipped: 0,
		errors: [],
	};

	// Filter to only wp_block posts
	const reusableBlocks = posts.filter((post) => post.postType === "wp_block");

	if (reusableBlocks.length === 0) {
		return result;
	}

	for (const block of reusableBlocks) {
		try {
			const slug = block.postName || slugify(block.title || `block-${block.id || Date.now()}`);

			// Check if section already exists
			const existing = await db
				.selectFrom("_emdash_sections")
				.select("id")
				.where("slug", "=", slug)
				.executeTakeFirst();

			if (existing) {
				result.sectionsSkipped++;
				continue;
			}

			// Convert Gutenberg content to Portable Text
			const content: PortableTextBlock[] = block.content
				? gutenbergToPortableText(block.content)
				: [];

			const id = ulid();
			const now = new Date().toISOString();

			await db
				.insertInto("_emdash_sections")
				.values({
					id,
					slug,
					title: block.title || "Untitled Block",
					description: null,
					keywords: null,
					content: JSON.stringify(content),
					preview_media_id: null,
					source: "import",
					theme_id: null,
					created_at: now,
					updated_at: now,
				})
				.execute();

			result.sectionsCreated++;
		} catch (error) {
			result.errors.push({
				title: block.title || "Untitled Block",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	return result;
}
