import { z } from "zod";

import { httpUrl } from "./common.js";

// ---------------------------------------------------------------------------
// Import
// ---------------------------------------------------------------------------

export const importProbeBody = z.object({
	url: httpUrl,
});

export const wpPluginAnalyzeBody = z.object({
	url: httpUrl,
	token: z.string().min(1),
});

export const wpPluginExecuteBody = z.object({
	url: httpUrl,
	token: z.string().min(1),
	config: z.record(z.string(), z.unknown()),
});

export const wpPrepareBody = z.object({
	postTypes: z.array(
		z.object({
			name: z.string().min(1),
			collection: z.string().min(1),
			fields: z
				.array(
					z.object({
						slug: z.string().min(1),
						label: z.string().min(1),
						type: z.string().min(1),
						required: z.boolean(),
						searchable: z.boolean().optional(),
					}),
				)
				.optional(),
		}),
	),
});

export const wpMediaImportBody = z.object({
	attachments: z.array(z.record(z.string(), z.unknown())),
	stream: z.boolean().optional(),
});

export const wpRewriteUrlsBody = z.object({
	urlMap: z.record(z.string(), z.string()),
	collections: z.array(z.string()).optional(),
});
