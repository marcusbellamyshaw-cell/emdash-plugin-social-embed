import { TokenRenameMap } from './types.js';
interface MigrationOptions {
    rootPath: string;
    include: string[];
    exclude: string[];
    dryRun: boolean;
    verbose: boolean;
    /** If true, also update config.ts after migration */
    updateConfig: boolean;
}
interface FileChange {
    file: string;
    changes: Array<{
        line: number;
        before: string;
        after: string;
    }>;
}
/**
 * Build regex patterns for class replacement
 */
declare function buildPatterns(renameMap: TokenRenameMap): Array<{
    pattern: RegExp;
    replacement: string;
}>;
/**
 * Migrate a single file's content
 */
declare function migrateContent(content: string, patterns: Array<{
    pattern: RegExp;
    replacement: string;
}>): {
    content: string;
    changes: Array<{
        line: number;
        before: string;
        after: string;
    }>;
};
/**
 * Simpler approach: rewrite config from scratch based on the data structure
 */
declare function rewriteConfig(renameMap: TokenRenameMap): string;
/**
 * Run the full migration
 */
declare function runMigration(options: MigrationOptions): Promise<{
    fileChanges: FileChange[];
    configUpdated: boolean;
    stats: {
        files: number;
        changes: number;
    };
}>;
export { runMigration, buildPatterns, migrateContent, rewriteConfig };
//# sourceMappingURL=migrate.d.ts.map