import * as _tiptap_core from '@tiptap/core';
import { Extension } from '@tiptap/core';

/**
 * Configuration for directional quotes (open/close pair).
 */
interface DirectionalQuotes {
    open: string;
    close: string;
}
interface TypographyOptions {
    /**
     * The em dash character.
     * @default '—'
     */
    emDash: false | string;
    /**
     * The ellipsis character.
     * @default '…'
     */
    ellipsis: false | string;
    /**
     * The open double quote character.
     * @default '“'
     */
    openDoubleQuote: false | string;
    /**
     * The close double quote character.
     * @default '”'
     */
    closeDoubleQuote: false | string;
    /**
     * The open single quote character.
     * @default '‘'
     */
    openSingleQuote: false | string;
    /**
     * The close single quote character.
     * @default '’'
     */
    closeSingleQuote: false | string;
    /**
     * The left arrow character.
     * @default '←'
     */
    leftArrow: false | string;
    /**
     * The right arrow character.
     * @default '→'
     */
    rightArrow: false | string;
    /**
     * The copyright character.
     * @default '©'
     */
    copyright: false | string;
    /**
     * The trademark character.
     * @default '™'
     */
    trademark: false | string;
    /**
     * The servicemark character.
     * @default '℠'
     */
    servicemark: false | string;
    /**
     * The registered trademark character.
     * @default '®'
     */
    registeredTrademark: false | string;
    /**
     * The one half character.
     * @default '½'
     */
    oneHalf: false | string;
    /**
     * The plus minus character.
     * @default '±'
     */
    plusMinus: false | string;
    /**
     * The not equal character.
     * @default '≠'
     */
    notEqual: false | string;
    /**
     * The laquo character.
     * @default '«'
     */
    laquo: false | string;
    /**
     * The raquo character.
     * @default '»'
     */
    raquo: false | string;
    /**
     * The multiplication character.
     * @default '×'
     */
    multiplication: false | string;
    /**
     * The superscript two character.
     * @default '²'
     */
    superscriptTwo: false | string;
    /**
     * The superscript three character.
     * @default '³'
     */
    superscriptThree: false | string;
    /**
     * The one quarter character.
     * @default '¼'
     */
    oneQuarter: false | string;
    /**
     * The three quarters character.
     * @default '¾'
     */
    threeQuarters: false | string;
    /**
     * Directional double quotes configuration.
     * Use this for explicit LTR/RTL quote control.
     * When `rtl` is configured, RTL-specific quote rules are used instead of default LTR.
     * @example
     * ```ts
     * Typography.configure({
     *   doubleQuotes: {
     *     rtl: { open: '\u201D', close: '\u201C' } // Swapped for RTL
     *   }
     * })
     * ```
     */
    doubleQuotes?: {
        rtl?: DirectionalQuotes;
    };
    /**
     * Directional single quotes configuration.
     * Use this for explicit LTR/RTL quote control.
     * When `rtl` is configured, RTL-specific quote rules are used instead of default LTR.
     * @example
     * ```ts
     * Typography.configure({
     *   singleQuotes: {
     *     rtl: { open: '\u2019', close: '\u2018' } // Swapped for RTL
     *   }
     * })
     * ```
     */
    singleQuotes?: {
        rtl?: DirectionalQuotes;
    };
}
declare const emDash: (override?: string) => _tiptap_core.InputRule;
declare const ellipsis: (override?: string) => _tiptap_core.InputRule;
declare const openDoubleQuote: (override?: string) => _tiptap_core.InputRule;
declare const closeDoubleQuote: (override?: string) => _tiptap_core.InputRule;
declare const openSingleQuote: (override?: string) => _tiptap_core.InputRule;
declare const closeSingleQuote: (override?: string) => _tiptap_core.InputRule;
declare const leftArrow: (override?: string) => _tiptap_core.InputRule;
declare const rightArrow: (override?: string) => _tiptap_core.InputRule;
declare const copyright: (override?: string) => _tiptap_core.InputRule;
declare const trademark: (override?: string) => _tiptap_core.InputRule;
declare const servicemark: (override?: string) => _tiptap_core.InputRule;
declare const registeredTrademark: (override?: string) => _tiptap_core.InputRule;
declare const oneHalf: (override?: string) => _tiptap_core.InputRule;
declare const plusMinus: (override?: string) => _tiptap_core.InputRule;
declare const notEqual: (override?: string) => _tiptap_core.InputRule;
declare const laquo: (override?: string) => _tiptap_core.InputRule;
declare const raquo: (override?: string) => _tiptap_core.InputRule;
declare const multiplication: (override?: string) => _tiptap_core.InputRule;
declare const superscriptTwo: (override?: string) => _tiptap_core.InputRule;
declare const superscriptThree: (override?: string) => _tiptap_core.InputRule;
declare const oneQuarter: (override?: string) => _tiptap_core.InputRule;
declare const threeQuarters: (override?: string) => _tiptap_core.InputRule;
/**
 * This extension allows you to add typography replacements for specific characters.
 * @see https://www.tiptap.dev/api/extensions/typography
 */
declare const Typography: Extension<TypographyOptions, any>;

export { type DirectionalQuotes, Typography, type TypographyOptions, closeDoubleQuote, closeSingleQuote, copyright, Typography as default, ellipsis, emDash, laquo, leftArrow, multiplication, notEqual, oneHalf, oneQuarter, openDoubleQuote, openSingleQuote, plusMinus, raquo, registeredTrademark, rightArrow, servicemark, superscriptThree, superscriptTwo, threeQuarters, trademark };
