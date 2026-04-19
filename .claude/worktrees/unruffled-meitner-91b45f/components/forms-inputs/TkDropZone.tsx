/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Upload, X, File as FileIcon } from "lucide-react"

export interface TkDropZoneProps {
  /** Field label displayed above the drop area */
  label?: string
  /** Accepted file types (e.g. ".txt,.html,.xml") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Whether the field is required */
  required?: boolean
  /** Currently selected files (controlled) */
  files?: File[]
  /** Called when files change */
  onFilesChange?: (files: File[]) => void
  /** Disabled state */
  disabled?: boolean
  /** Additional CSS classes for the drop zone container */
  className?: string
}

/**
 * TkDropZone - Drag-and-drop file upload area with file list
 *
 * Supports click-to-browse and drag-and-drop. Displays selected files
 * with size and a remove button. Accepts file type filtering.
 */
export function TkDropZone({
  label,
  accept,
  multiple = false,
  required = false,
  files = [],
  onFilesChange,
  disabled = false,
  className,
}: TkDropZoneProps) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptExtensions = accept?.split(",").map((s) => s.trim().toLowerCase()) ?? []

  const filterFiles = useCallback(
    (incoming: File[]): File[] => {
      if (acceptExtensions.length === 0 || accept === "*") return incoming
      return incoming.filter((file) => {
        const ext = "." + file.name.split(".").pop()?.toLowerCase()
        return acceptExtensions.some(
          (a) => a === ext || a === file.type || a === "*"
        )
      })
    },
    [accept, acceptExtensions]
  )

  const addFiles = useCallback(
    (incoming: File[]) => {
      const filtered = filterFiles(incoming)
      if (filtered.length === 0) return
      const updated = multiple ? [...files, ...filtered] : filtered.slice(0, 1)
      onFilesChange?.(updated)
    },
    [files, multiple, filterFiles, onFilesChange]
  )

  const removeFile = useCallback(
    (index: number) => {
      const updated = [...files]
      updated.splice(index, 1)
      onFilesChange?.(updated)
      if (inputRef.current) inputRef.current.value = ""
    },
    [files, onFilesChange]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) setDragOver(true)
    },
    [disabled]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)
      if (disabled) return
      const dropped = Array.from(e.dataTransfer.files)
      addFiles(dropped)
    },
    [disabled, addFiles]
  )

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click()
  }, [disabled])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? [])
      addFiles(selected)
      e.target.value = ""
    },
    [addFiles]
  )

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept === "*" ? undefined : accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed p-6 transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          disabled && "cursor-not-allowed opacity-50",
          files.length > 0 && "pb-3"
        )}
      >
        <Upload
          className={cn(
            "h-8 w-8",
            dragOver ? "text-primary" : "text-muted-foreground"
          )}
        />
        <div className="text-center">
          <p className="text-sm font-medium">
            {dragOver ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-muted-foreground">
            or click to browse
            {accept && accept !== "*" && (
              <span className="ml-1">({accept})</span>
            )}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${i}`}
              className="flex items-center gap-2 border bg-card px-3 py-1.5 text-sm"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate">{file.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatSize(file.size)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(i)
                }}
                className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
