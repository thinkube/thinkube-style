import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { useCallback, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Upload, X, File as FileIcon } from "lucide-react";
/**
 * TkDropZone - Drag-and-drop file upload area with file list
 *
 * Supports click-to-browse and drag-and-drop. Displays selected files
 * with size and a remove button. Accepts file type filtering.
 */
export function TkDropZone({ label, accept, multiple = false, required = false, files = [], onFilesChange, disabled = false, className, }) {
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef(null);
    const acceptExtensions = accept?.split(",").map((s) => s.trim().toLowerCase()) ?? [];
    const filterFiles = useCallback((incoming) => {
        if (acceptExtensions.length === 0 || accept === "*")
            return incoming;
        return incoming.filter((file) => {
            const ext = "." + file.name.split(".").pop()?.toLowerCase();
            return acceptExtensions.some((a) => a === ext || a === file.type || a === "*");
        });
    }, [accept, acceptExtensions]);
    const addFiles = useCallback((incoming) => {
        const filtered = filterFiles(incoming);
        if (filtered.length === 0)
            return;
        const updated = multiple ? [...files, ...filtered] : filtered.slice(0, 1);
        onFilesChange?.(updated);
    }, [files, multiple, filterFiles, onFilesChange]);
    const removeFile = useCallback((index) => {
        const updated = [...files];
        updated.splice(index, 1);
        onFilesChange?.(updated);
        if (inputRef.current)
            inputRef.current.value = "";
    }, [files, onFilesChange]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled)
            setDragOver(true);
    }, [disabled]);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        if (disabled)
            return;
        const dropped = Array.from(e.dataTransfer.files);
        addFiles(dropped);
    }, [disabled, addFiles]);
    const handleClick = useCallback(() => {
        if (!disabled)
            inputRef.current?.click();
    }, [disabled]);
    const handleInputChange = useCallback((e) => {
        const selected = Array.from(e.target.files ?? []);
        addFiles(selected);
        e.target.value = "";
    }, [addFiles]);
    const formatSize = (bytes) => {
        if (bytes < 1024)
            return `${bytes} B`;
        if (bytes < 1024 * 1024)
            return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };
    return (_jsxs("div", { className: cn("space-y-2", className), children: [label && (_jsxs("label", { className: "text-sm font-medium leading-none", children: [label, required && _jsx("span", { className: "ml-1 text-destructive", children: "*" })] })), _jsx("input", { ref: inputRef, type: "file", accept: accept === "*" ? undefined : accept, multiple: multiple, onChange: handleInputChange, className: "hidden" }), _jsxs("div", { role: "button", tabIndex: disabled ? -1 : 0, onClick: handleClick, onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClick();
                    }
                }, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, className: cn("flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed p-6 transition-colors", dragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50", disabled && "cursor-not-allowed opacity-50", files.length > 0 && "pb-3"), children: [_jsx(Upload, { className: cn("h-8 w-8", dragOver ? "text-primary" : "text-muted-foreground") }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm font-medium", children: dragOver ? "Drop files here" : "Drag & drop files here" }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["or click to browse", accept && accept !== "*" && (_jsxs("span", { className: "ml-1", children: ["(", accept, ")"] }))] })] })] }), files.length > 0 && (_jsx("ul", { className: "space-y-1", children: files.map((file, i) => (_jsxs("li", { className: "flex items-center gap-2 border bg-card px-3 py-1.5 text-sm", children: [_jsx(FileIcon, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), _jsx("span", { className: "min-w-0 flex-1 truncate", children: file.name }), _jsx("span", { className: "shrink-0 text-xs text-muted-foreground", children: formatSize(file.size) }), _jsx("button", { type: "button", onClick: (e) => {
                                e.stopPropagation();
                                removeFile(i);
                            }, className: "shrink-0 text-muted-foreground transition-colors hover:text-destructive", "aria-label": `Remove ${file.name}`, children: _jsx(X, { className: "h-4 w-4" }) })] }, `${file.name}-${file.size}-${i}`))) }))] }));
}
//# sourceMappingURL=TkDropZone.js.map