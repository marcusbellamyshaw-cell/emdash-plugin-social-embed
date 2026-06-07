/**
 * Storage Adapters
 *
 * Re-exports config-time adapter functions and types.
 * Runtime entrypoints are in the emdash core package.
 *
 * For Cloudflare R2 bindings, use `r2()` from `@emdash-cms/cloudflare`.
 */

// Config-time adapter functions
export { s3, local } from "./adapters.js";

// Types
export type {
	StorageDescriptor,
	CreateStorageFn,
	S3StorageConfig,
	LocalStorageConfig,
} from "./types.js";
