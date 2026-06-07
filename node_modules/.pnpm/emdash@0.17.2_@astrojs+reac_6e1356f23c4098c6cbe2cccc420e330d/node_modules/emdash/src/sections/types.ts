/**
 * Section types
 *
 * Sections are reusable content blocks that can be inserted into any Portable Text field.
 */

import type { PortableTextBlock } from "../fields/index.js";

/**
 * Section source types
 */
export type SectionSource = "theme" | "user" | "import";

/**
 * Section as returned to templates/admin
 */
export interface Section {
	id: string;
	slug: string;
	title: string;
	description?: string;
	keywords: string[];
	content: PortableTextBlock[];
	previewUrl?: string;
	source: SectionSource;
	themeId?: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * Section as stored in database
 */
export interface SectionRow {
	id: string;
	slug: string;
	title: string;
	description: string | null;
	keywords: string | null; // JSON array
	content: string; // JSON: Portable Text array
	preview_media_id: string | null;
	source: SectionSource;
	theme_id: string | null;
	created_at: string;
	updated_at: string;
}

/**
 * Input for creating a section
 */
export interface CreateSectionInput {
	slug: string;
	title: string;
	description?: string;
	keywords?: string[];
	content: PortableTextBlock[];
	previewMediaId?: string;
	source?: SectionSource;
	themeId?: string;
}

/**
 * Input for updating a section
 */
export interface UpdateSectionInput {
	slug?: string;
	title?: string;
	description?: string;
	keywords?: string[];
	content?: PortableTextBlock[];
	previewMediaId?: string | null;
}

/**
 * Options for querying sections
 */
export interface GetSectionsOptions {
	/** Filter by source */
	source?: SectionSource;
	/** Search title, description, keywords */
	search?: string;
	/** Limit results */
	limit?: number;
	/** Cursor for pagination */
	cursor?: string;
}
