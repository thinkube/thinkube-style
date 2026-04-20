import { ReactNode } from "react";
export { Dialog as TkDialogRoot } from "../../components/ui/dialog";
export { DialogContent as TkDialogContent } from "../../components/ui/dialog";
export { DialogDescription as TkDialogDescription } from "../../components/ui/dialog";
export { DialogFooter as TkDialogFooter } from "../../components/ui/dialog";
export { DialogHeader as TkDialogHeader } from "../../components/ui/dialog";
export { DialogTitle as TkDialogTitle } from "../../components/ui/dialog";
export { DialogTrigger as TkDialogTrigger } from "../../components/ui/dialog";
interface TkDialogProps {
    trigger: ReactNode;
    title: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    maxHeight?: string;
}
/**
 * TkDialog - Thinkube dialog/modal component with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export declare function TkDialog({ trigger, title, description, children, footer, maxWidth, maxHeight, }: TkDialogProps): import("react/jsx-runtime").JSX.Element;
interface TkConfirmDialogProps {
    trigger: ReactNode;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
}
/**
 * TkConfirmDialog - Confirmation dialog for destructive actions
 * Thinkube-approved component from thinkube-style
 */
export declare function TkConfirmDialog({ trigger, title, description, onConfirm, onCancel, confirmText, cancelText, variant, }: TkConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
interface TkControlledConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
}
/**
 * TkControlledConfirmDialog - Controlled confirmation dialog for programmatic use
 * Use this when you need to manage dialog state yourself (e.g., with useState)
 * Thinkube-approved component from thinkube-style
 */
export declare function TkControlledConfirmDialog({ open, onOpenChange, title, description, onConfirm, confirmText, cancelText, variant, }: TkControlledConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TkDialog.d.ts.map