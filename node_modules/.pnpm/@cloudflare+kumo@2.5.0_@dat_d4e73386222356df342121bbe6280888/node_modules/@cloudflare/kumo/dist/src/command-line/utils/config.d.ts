/**
 * Kumo CLI configuration utilities
 * Handles reading and writing kumo.json config files
 */
/**
 * Configuration schema for kumo.json
 */
export interface KumoConfig {
    /**
     * Directory where blocks will be installed (relative to project root)
     * @default "src/components/kumo"
     */
    blocksDir: string;
    /**
     * Version of the config schema
     * @default "1.0.0"
     */
    version?: string;
}
/**
 * Default configuration values
 */
export declare const DEFAULT_CONFIG: Required<KumoConfig>;
/**
 * Read kumo.json from the specified directory
 * @param projectRoot - Path to project root (defaults to cwd)
 * @returns Parsed config or null if not found
 */
export declare function readConfig(projectRoot?: string): KumoConfig | null;
/**
 * Write kumo.json to the specified directory
 * @param config - Configuration to write
 * @param projectRoot - Path to project root (defaults to cwd)
 */
export declare function writeConfig(config: KumoConfig, projectRoot?: string): void;
/**
 * Check if kumo.json exists in the specified directory
 * @param projectRoot - Path to project root (defaults to cwd)
 * @returns true if kumo.json exists
 */
export declare function configExists(projectRoot?: string): boolean;
//# sourceMappingURL=config.d.ts.map