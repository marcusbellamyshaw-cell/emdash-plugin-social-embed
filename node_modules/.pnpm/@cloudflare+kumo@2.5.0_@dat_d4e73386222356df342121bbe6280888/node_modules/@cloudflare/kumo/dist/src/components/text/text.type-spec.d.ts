/**
 * Type-level specification for the Text component.
 *
 * This file is NOT a vitest test file (no `.test.tsx` suffix) — it lives in
 * the regular tsconfig `include` glob so `tsc --noEmit` (i.e.
 * `pnpm typecheck`) evaluates every `@ts-expect-error` directive. If one of
 * the "should be a compile error" cases below stops being an error, tsc
 * will fail with "Unused '@ts-expect-error' directive" and CI goes red.
 *
 * This mirrors the DefinitelyTyped / type-fest convention of keeping
 * type-only assertions alongside the implementation, checked at the type
 * layer rather than at runtime.
 */
export declare const __typeSpec: {
    _headingH1: import("react/jsx-runtime").JSX.Element;
    _headingH2: import("react/jsx-runtime").JSX.Element;
    _headingH3: import("react/jsx-runtime").JSX.Element;
    _decorativeHeading: import("react/jsx-runtime").JSX.Element;
    _bodyDefault: import("react/jsx-runtime").JSX.Element;
    _bodyExplicit: import("react/jsx-runtime").JSX.Element;
    _bodyInline: import("react/jsx-runtime").JSX.Element;
    _secondary: import("react/jsx-runtime").JSX.Element;
    _success: import("react/jsx-runtime").JSX.Element;
    _error: import("react/jsx-runtime").JSX.Element;
    _mono: import("react/jsx-runtime").JSX.Element;
    _monoSecondary: import("react/jsx-runtime").JSX.Element;
    _dt: import("react/jsx-runtime").JSX.Element;
    _dd: import("react/jsx-runtime").JSX.Element;
    _label: import("react/jsx-runtime").JSX.Element;
    _code: import("react/jsx-runtime").JSX.Element;
    _pre: import("react/jsx-runtime").JSX.Element;
    _li: import("react/jsx-runtime").JSX.Element;
    _figcaption: import("react/jsx-runtime").JSX.Element;
    _legend: import("react/jsx-runtime").JSX.Element;
    _em: import("react/jsx-runtime").JSX.Element;
    _strong: import("react/jsx-runtime").JSX.Element;
    _small: import("react/jsx-runtime").JSX.Element;
    _time: import("react/jsx-runtime").JSX.Element;
    _headingAsLabel: import("react/jsx-runtime").JSX.Element;
    _missingAsH1: import("react/jsx-runtime").JSX.Element;
    _missingAsH2: import("react/jsx-runtime").JSX.Element;
    _missingAsH3: import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=text.type-spec.d.ts.map