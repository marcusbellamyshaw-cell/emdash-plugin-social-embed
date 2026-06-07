export declare const KUMO_DELETE_RESOURCE_VARIANTS: {
    readonly size: {
        readonly sm: {
            readonly classes: "";
            readonly description: "Small dialog for simple delete confirmations";
        };
        readonly base: {
            readonly classes: "";
            readonly description: "Default delete confirmation dialog size";
        };
    };
};
export declare const KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS: {
    readonly size: "base";
};
export type KumoDeleteResourceSize = keyof typeof KUMO_DELETE_RESOURCE_VARIANTS.size;
export interface KumoDeleteResourceVariantsProps {
    size?: KumoDeleteResourceSize;
}
export interface DeleteResourceProps extends KumoDeleteResourceVariantsProps {
    /** Whether the dialog is open */
    open: boolean;
    /** Callback when open state changes */
    onOpenChange: (open: boolean) => void;
    /** The type of resource being deleted (e.g., "Zone", "Worker", "KV Namespace") */
    resourceType: string;
    /** The name of the specific resource being deleted */
    resourceName: string;
    /** Callback when delete is confirmed */
    onDelete: () => void | Promise<void>;
    /** Whether the delete action is in progress */
    isDeleting?: boolean;
    /** Whether the confirmation input should be case-sensitive (default: true) */
    caseSensitive?: boolean;
    /** Custom delete button text (defaults to "Delete {resourceType}") */
    deleteButtonText?: string;
    /** Additional className for the dialog */
    className?: string;
    /** Error message to display if the delete action fails */
    errorMessage?: string;
}
export declare function DeleteResource({ open, onOpenChange, resourceType, resourceName, onDelete, isDeleting, caseSensitive, deleteButtonText, size, errorMessage, className, }: DeleteResourceProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DeleteResource {
    var displayName: string;
}
//# sourceMappingURL=delete-resource.d.ts.map