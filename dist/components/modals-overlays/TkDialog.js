import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
// Export Tk-prefixed primitives for direct use
export { Dialog as TkDialogRoot } from "../../components/ui/dialog";
export { DialogContent as TkDialogContent } from "../../components/ui/dialog";
export { DialogDescription as TkDialogDescription } from "../../components/ui/dialog";
export { DialogFooter as TkDialogFooter } from "../../components/ui/dialog";
export { DialogHeader as TkDialogHeader } from "../../components/ui/dialog";
export { DialogTitle as TkDialogTitle } from "../../components/ui/dialog";
export { DialogTrigger as TkDialogTrigger } from "../../components/ui/dialog";
/**
 * TkDialog - Thinkube dialog/modal component with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export function TkDialog({ trigger, title, description, children, footer, maxWidth = "md", maxHeight, }) {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
    };
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: trigger }), _jsxs(DialogContent, { className: `${maxWidthClasses[maxWidth]} ${maxHeight || ""}`, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), description && _jsx(DialogDescription, { children: description })] }), _jsx("div", { className: maxHeight ? "overflow-auto" : "", children: children }), footer && _jsx(DialogFooter, { children: footer })] })] }));
}
/**
 * TkConfirmDialog - Confirmation dialog for destructive actions
 * Thinkube-approved component from thinkube-style
 */
export function TkConfirmDialog({ trigger, title, description, onConfirm, onCancel, confirmText = "Continue", cancelText = "Cancel", variant = "default", }) {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: trigger }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onCancel, children: cancelText }), _jsx(Button, { variant: variant, onClick: onConfirm, children: confirmText })] })] })] }));
}
/**
 * TkControlledConfirmDialog - Controlled confirmation dialog for programmatic use
 * Use this when you need to manage dialog state yourself (e.g., with useState)
 * Thinkube-approved component from thinkube-style
 */
export function TkControlledConfirmDialog({ open, onOpenChange, title, description, onConfirm, confirmText = "Continue", cancelText = "Cancel", variant = "default", }) {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: cancelText }), _jsx(Button, { variant: variant, onClick: onConfirm, children: confirmText })] })] }) }));
}
//# sourceMappingURL=TkDialog.js.map