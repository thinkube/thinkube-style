/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

// Export Tk-prefixed primitives for direct use
export { Dialog as TkDialogRoot } from "@/components/ui/dialog"
export { DialogContent as TkDialogContent } from "@/components/ui/dialog"
export { DialogDescription as TkDialogDescription } from "@/components/ui/dialog"
export { DialogFooter as TkDialogFooter } from "@/components/ui/dialog"
export { DialogHeader as TkDialogHeader } from "@/components/ui/dialog"
export { DialogTitle as TkDialogTitle } from "@/components/ui/dialog"
export { DialogTrigger as TkDialogTrigger } from "@/components/ui/dialog"

interface TkDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  maxHeight?: string
}

/**
 * TkDialog - Thinkube dialog/modal component with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkDialog({
  trigger,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
  maxHeight,
}: TkDialogProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${maxWidthClasses[maxWidth]} ${maxHeight || ""}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className={maxHeight ? "overflow-auto" : ""}>{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

interface TkConfirmDialogProps {
  trigger: ReactNode
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

/**
 * TkConfirmDialog - Confirmation dialog for destructive actions
 * Thinkube-approved component from thinkube-style
 */
export function TkConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: TkConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface TkControlledConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

/**
 * TkControlledConfirmDialog - Controlled confirmation dialog for programmatic use
 * Use this when you need to manage dialog state yourself (e.g., with useState)
 * Thinkube-approved component from thinkube-style
 */
export function TkControlledConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: TkControlledConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
