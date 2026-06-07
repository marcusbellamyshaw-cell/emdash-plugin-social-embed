import { ReactNode } from 'react';
import { FieldErrorMatch } from '../field/field';
import * as React from "react";
export declare const InputArea: React.ForwardRefExoticComponent<{
    onValueChange?: (value: string) => void;
    variant?: "default" | "error";
    size?: "xs" | "sm" | "base" | "lg";
    children?: React.ReactNode;
    className?: string;
    /** Label content for the textarea (enables Field wrapper) - can be a string or any React node */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the textarea */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & React.RefAttributes<HTMLTextAreaElement>>;
/** Alias for InputArea — provided for discoverability when migrating from other libraries */
export declare const Textarea: React.ForwardRefExoticComponent<{
    onValueChange?: (value: string) => void;
    variant?: "default" | "error";
    size?: "xs" | "sm" | "base" | "lg";
    children?: React.ReactNode;
    className?: string;
    /** Label content for the textarea (enables Field wrapper) - can be a string or any React node */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the textarea */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & React.RefAttributes<HTMLTextAreaElement>>;
/**
 * InputArea component props
 * @property {ReactNode} [label] - Label content for the textarea (enables Field wrapper)
 * @property {ReactNode} [description] - Helper text displayed below the textarea
 * @property {string | { message: ReactNode, match: FieldErrorMatch }} [error] - Error message or validation error object
 */
export type InputAreaProps = {
    onValueChange?: (value: string) => void;
    variant?: "default" | "error";
    size?: "xs" | "sm" | "base" | "lg";
    children?: React.ReactNode;
    className?: string;
    /** Label content for the textarea (enables Field wrapper) - can be a string or any React node */
    label?: ReactNode;
    /** Tooltip content to display next to the label via an info icon */
    labelTooltip?: ReactNode;
    /** Helper text displayed below the textarea */
    description?: ReactNode;
    /** Error message or validation error object */
    error?: string | {
        message: ReactNode;
        match: FieldErrorMatch;
    };
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;
//# sourceMappingURL=input-area.d.ts.map