import { default as React } from 'react';
import { ShikiProviderProps, SupportedLanguage } from './types';
/**
 * Normalize a language identifier to its canonical SupportedLanguage name.
 * Returns the canonical name if the input is a known alias or already canonical,
 * otherwise returns null.
 */
export declare function normalizeLanguage(lang: string): SupportedLanguage | null;
export declare function ShikiProvider({ engine, languages, labels, children, }: ShikiProviderProps): React.JSX.Element;
export declare namespace ShikiProvider {
    var displayName: string;
}
//# sourceMappingURL=provider.d.ts.map