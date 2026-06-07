/**
 * Widget components registry endpoint
 *
 * GET /_emdash/api/widget-components - List available widget components
 */

import type { APIRoute } from "astro";

import { apiSuccess, handleError } from "#api/error.js";
import { getWidgetComponents } from "#widgets/components.js";

export const prerender = false;

export const GET: APIRoute = async () => {
	try {
		const components = getWidgetComponents();

		return apiSuccess({ items: components });
	} catch (error) {
		return handleError(error, "Failed to fetch widget components", "WIDGET_COMPONENTS_ERROR");
	}
};
