import { InputProps } from '../input/input';
/** Props for InputGroup.Input — omits Field props since InputGroup handles them. */
export type InputGroupInputProps = Omit<InputProps, "label" | "labelTooltip" | "description" | "error" | "size" | "disabled">;
/**
 * Text input that inherits size, disabled, and error state from InputGroup context.
 * Automatically sets `aria-invalid` when parent has an error.
 */
export declare const Input: import('react').ForwardRefExoticComponent<InputGroupInputProps & import('react').RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=input-group-input.d.ts.map