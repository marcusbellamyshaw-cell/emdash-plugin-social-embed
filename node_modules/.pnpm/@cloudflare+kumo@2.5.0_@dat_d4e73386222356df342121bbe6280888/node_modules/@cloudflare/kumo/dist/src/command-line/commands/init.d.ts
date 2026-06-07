#!/usr/bin/env node
/**
 * Initialize kumo.json configuration file
 * Usage: kumo init
 */
/**
 * Prompt user for input
 */
export declare function prompt(question: string, defaultValue?: string): Promise<string>;
/**
 * Prompt user for yes/no confirmation
 */
export declare function confirm(question: string): Promise<boolean>;
/**
 * Initialize kumo.json configuration
 */
export declare function init(): Promise<void>;
//# sourceMappingURL=init.d.ts.map