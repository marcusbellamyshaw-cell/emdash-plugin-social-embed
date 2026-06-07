/**
 * Site settings import functions
 *
 * Import site settings from WordPress (title, tagline, logo, favicon, etc.)
 */

import type { Kysely } from "kysely";

import type { Database } from "../database/types.js";

/**
 * Site settings analysis from import source
 */
export interface SiteSettingsAnalysis {
	/** Site title */
	title?: string;
	/** Site tagline/description */
	tagline?: string;
	/** Custom logo */
	logo?: { url: string; id?: number };
	/** Favicon/site icon */
	favicon?: { url: string; id?: number };
	/** Front page settings */
	frontPage?: { type: "posts" | "page"; pageId?: number };
	/** SEO settings (Yoast, RankMath, etc.) */
	seo?: Record<string, unknown>;
}

/**
 * Widget area analysis
 */
export interface WidgetAreaAnalysis {
	/** Widget area ID */
	id: string;
	/** Widget area name */
	name: string;
	/** Widget area label */
	label: string;
	/** Number of widgets */
	widgetCount: number;
	/** Widget summaries */
	widgets: Array<{ type: string; title?: string }>;
}

/**
 * Result of site settings import
 */
export interface SettingsImportResult {
	/** Settings that were applied */
	applied: string[];
	/** Settings that were skipped (already set) */
	skipped: string[];
	/** Errors encountered */
	errors: Array<{ setting: string; error: string }>;
}

/**
 * Import site settings from analysis
 *
 * @param settings - Site settings analysis
 * @param db - Database connection
 * @param overwrite - Whether to overwrite existing settings
 * @returns Import result
 */
export async function importSiteSettings(
	settings: SiteSettingsAnalysis,
	db: Kysely<Database>,
	overwrite = false,
): Promise<SettingsImportResult> {
	const result: SettingsImportResult = {
		applied: [],
		skipped: [],
		errors: [],
	};

	// Import title
	if (settings.title) {
		try {
			const applied = await setOption(db, "site_title", settings.title, overwrite);
			if (applied) {
				result.applied.push("site_title");
			} else {
				result.skipped.push("site_title");
			}
		} catch (error) {
			result.errors.push({
				setting: "site_title",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	// Import tagline
	if (settings.tagline) {
		try {
			const applied = await setOption(db, "site_tagline", settings.tagline, overwrite);
			if (applied) {
				result.applied.push("site_tagline");
			} else {
				result.skipped.push("site_tagline");
			}
		} catch (error) {
			result.errors.push({
				setting: "site_tagline",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	// Import logo URL (actual media import handled separately)
	if (settings.logo?.url) {
		try {
			const applied = await setOption(db, "site_logo_url", settings.logo.url, overwrite);
			if (applied) {
				result.applied.push("site_logo_url");
			} else {
				result.skipped.push("site_logo_url");
			}
		} catch (error) {
			result.errors.push({
				setting: "site_logo_url",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	// Import favicon URL
	if (settings.favicon?.url) {
		try {
			const applied = await setOption(db, "site_favicon_url", settings.favicon.url, overwrite);
			if (applied) {
				result.applied.push("site_favicon_url");
			} else {
				result.skipped.push("site_favicon_url");
			}
		} catch (error) {
			result.errors.push({
				setting: "site_favicon_url",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	// Import front page settings
	if (settings.frontPage) {
		try {
			const applied = await setOption(db, "front_page_type", settings.frontPage.type, overwrite);
			if (applied) {
				result.applied.push("front_page_type");
			} else {
				result.skipped.push("front_page_type");
			}

			if (settings.frontPage.pageId) {
				const pageApplied = await setOption(
					db,
					"front_page_id",
					String(settings.frontPage.pageId),
					overwrite,
				);
				if (pageApplied) {
					result.applied.push("front_page_id");
				} else {
					result.skipped.push("front_page_id");
				}
			}
		} catch (error) {
			result.errors.push({
				setting: "front_page",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	// Import SEO settings as JSON blob
	if (settings.seo && Object.keys(settings.seo).length > 0) {
		try {
			const applied = await setOption(db, "seo_settings", JSON.stringify(settings.seo), overwrite);
			if (applied) {
				result.applied.push("seo_settings");
			} else {
				result.skipped.push("seo_settings");
			}
		} catch (error) {
			result.errors.push({
				setting: "seo_settings",
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	return result;
}

/**
 * Set an option in the database
 *
 * @returns true if the option was set, false if skipped (already exists and !overwrite)
 */
async function setOption(
	db: Kysely<Database>,
	key: string,
	value: string,
	overwrite: boolean,
): Promise<boolean> {
	const existing = await db
		.selectFrom("options")
		.select("value")
		.where("name", "=", key)
		.executeTakeFirst();

	if (existing && !overwrite) {
		return false;
	}

	if (existing) {
		await db.updateTable("options").set({ value }).where("name", "=", key).execute();
	} else {
		await db.insertInto("options").values({ name: key, value }).execute();
	}

	return true;
}

/**
 * Parse site settings from WordPress plugin options response
 */
export function parseSiteSettingsFromPlugin(
	options: Record<string, unknown>,
): SiteSettingsAnalysis {
	const settings: SiteSettingsAnalysis = {};

	// Basic settings
	if (typeof options.blogname === "string") {
		settings.title = options.blogname;
	}
	if (typeof options.blogdescription === "string") {
		settings.tagline = options.blogdescription;
	}

	// Logo and favicon
	if (typeof options.custom_logo_url === "string") {
		settings.logo = {
			url: options.custom_logo_url,
			id: typeof options.custom_logo === "number" ? options.custom_logo : undefined,
		};
	}
	if (typeof options.site_icon_url === "string") {
		settings.favicon = {
			url: options.site_icon_url,
			id: typeof options.site_icon === "number" ? options.site_icon : undefined,
		};
	}

	// Front page settings
	if (options.show_on_front === "page") {
		settings.frontPage = {
			type: "page",
			pageId: typeof options.page_on_front === "number" ? options.page_on_front : undefined,
		};
	} else {
		settings.frontPage = { type: "posts" };
	}

	// SEO settings (Yoast)
	const seo: Record<string, unknown> = {};
	if (typeof options.wpseo === "object" && options.wpseo !== null) {
		seo.yoast = options.wpseo;
	}
	if (typeof options.wpseo_titles === "object" && options.wpseo_titles !== null) {
		seo.yoast_titles = options.wpseo_titles;
	}
	if (typeof options.wpseo_social === "object" && options.wpseo_social !== null) {
		seo.yoast_social = options.wpseo_social;
	}
	if (Object.keys(seo).length > 0) {
		settings.seo = seo;
	}

	return settings;
}
