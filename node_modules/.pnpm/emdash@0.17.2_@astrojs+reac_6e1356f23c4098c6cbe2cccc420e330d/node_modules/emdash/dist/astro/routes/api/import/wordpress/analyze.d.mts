import { APIRoute } from "astro";

//#region src/astro/routes/api/import/wordpress/analyze.d.ts
declare const prerender = false;
/** Field compatibility status */
type FieldCompatibility = "compatible" | "type_mismatch" | "missing";
/** Single field definition for import */
interface ImportFieldDef {
  slug: string;
  label: string;
  type: string;
  required: boolean;
  searchable?: boolean;
}
/** Schema status for a collection */
interface CollectionSchemaStatus {
  /** Whether collection exists */
  exists: boolean;
  /** If exists, per-field compatibility */
  fieldStatus: Record<string, {
    status: FieldCompatibility;
    existingType?: string;
    requiredType: string;
  }>;
  /** Can we safely import to this collection? */
  canImport: boolean;
  /** Human-readable reason if canImport is false */
  reason?: string;
}
/** Post type with full schema info */
interface PostTypeAnalysis {
  /** WordPress post type name */
  name: string;
  /** Number of items to import */
  count: number;
  /** Suggested collection slug */
  suggestedCollection: string;
  /** Fields we need to create */
  requiredFields: ImportFieldDef[];
  /** Schema compatibility status */
  schemaStatus: CollectionSchemaStatus;
}
/** Individual attachment info for media import */
interface AttachmentInfo {
  id?: number;
  title?: string;
  url?: string;
  filename?: string;
  mimeType?: string;
}
/** Author info from WordPress */
interface WpAuthorInfo {
  id?: number;
  login?: string;
  email?: string;
  displayName?: string;
  postCount: number;
}
interface WxrAnalysis {
  site: {
    title: string;
    url: string;
  };
  postTypes: PostTypeAnalysis[];
  attachments: {
    count: number;
    items: AttachmentInfo[];
  };
  categories: number;
  tags: number;
  authors: WpAuthorInfo[];
  customFields: Array<{
    key: string;
    count: number;
    samples: string[];
    suggestedField: string;
    suggestedType: "string" | "number" | "boolean" | "date" | "json";
    isInternal: boolean;
  }>;
}
declare const POST: APIRoute;
declare function sanitizeSlug(slug: string): string;
declare function mapPostTypeToCollection(postType: string): string;
declare function capitalize(str: string): string;
declare function singularize(str: string): string;
//#endregion
export { AttachmentInfo, CollectionSchemaStatus, FieldCompatibility, ImportFieldDef, POST, PostTypeAnalysis, WpAuthorInfo, WxrAnalysis, capitalize, mapPostTypeToCollection, prerender, sanitizeSlug, singularize };
//# sourceMappingURL=analyze.d.mts.map