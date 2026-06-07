/**
 * Runtime exports - for use during rendering (not config time)
 *
 * This module exports the loader and other runtime utilities that depend
 * on virtual modules. These are only available after Astro/Vite has set up
 * the virtual module infrastructure.
 *
 * Use in live.config.ts:
 *   import { defineLiveCollection } from "astro:content";
 *   import { emdashLoader } from "emdash/runtime";
 *
 *   export const collections = {
 *     _emdash: defineLiveCollection({ loader: emdashLoader() }),
 *   };
 */

export { emdashLoader, getDb } from "./loader.js";
export type { EntryData, EntryFilter, CollectionFilter } from "./loader.js";

// Media provider runtime
export { getMediaProvider } from "./media/provider-loader.js";
