export { Input, inputVariants, type InputProps } from './input';
export { InputArea, Textarea, type InputAreaProps } from './input-area';
export { InputGroup, KUMO_INPUT_GROUP_VARIANTS, KUMO_INPUT_GROUP_DEFAULT_VARIANTS, } from '../input-group';
/**
 * @deprecated `focusMode` is no longer a public prop — it is auto-detected by
 * `InputGroup` based on its children. This type will be removed in a future
 * major version.
 */
export type KumoInputGroupFocusMode = "container" | "individual";
/**
 * @deprecated `focusMode` is no longer a public prop — it is auto-detected by
 * `InputGroup` based on its children. Use `InputGroupRootProps` from
 * `@cloudflare/kumo` instead. This type will be removed in a future major
 * version.
 */
export interface KumoInputGroupVariantsProps {
    focusMode?: KumoInputGroupFocusMode;
}
//# sourceMappingURL=index.d.ts.map