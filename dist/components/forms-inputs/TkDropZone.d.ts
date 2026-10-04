export interface TkDropZoneProps {
    /** Field label displayed above the drop area */
    label?: string;
    /** Accepted file types (e.g. ".txt,.html,.xml") */
    accept?: string;
    /** Allow multiple files */
    multiple?: boolean;
    /** Whether the field is required */
    required?: boolean;
    /** Currently selected files (controlled) */
    files?: File[];
    /** Called when files change */
    onFilesChange?: (files: File[]) => void;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes for the drop zone container */
    className?: string;
}
/**
 * TkDropZone - Drag-and-drop file upload area with file list
 *
 * Supports click-to-browse and drag-and-drop. Displays selected files
 * with size and a remove button. Accepts file type filtering.
 */
export declare function TkDropZone({ label, accept, multiple, required, files, onFilesChange, disabled, className, }: TkDropZoneProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TkDropZone.d.ts.map