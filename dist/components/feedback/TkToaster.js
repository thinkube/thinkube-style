/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster as Sonner } from "../../components/ui/sonner";
/**
 * TkToaster - Toast notification provider
 * Place this component once at the root of your app
 * Thinkube-approved component from thinkube-style
 */
const TkToaster = ({ ...props }) => {
    return (_jsx(Sonner, { theme: "system", className: "toaster group", toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
        }, ...props }));
};
export { TkToaster };
//# sourceMappingURL=TkToaster.js.map