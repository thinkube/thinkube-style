"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster as Sonner } from "sonner";
import { useEffect, useState } from "react";
const Toaster = ({ ...props }) => {
    // Read theme from document classList or default to system
    const [theme, setTheme] = useState("system");
    useEffect(() => {
        const updateTheme = () => {
            if (document.documentElement.classList.contains("dark")) {
                setTheme("dark");
            }
            else if (document.documentElement.classList.contains("light")) {
                setTheme("light");
            }
            else {
                setTheme("system");
            }
        };
        // Initial theme
        updateTheme();
        // Watch for theme changes
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);
    return (_jsx(Sonner, { theme: theme, className: "toaster group", toastOptions: {
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
        }, ...props }));
};
export { Toaster };
//# sourceMappingURL=sonner.js.map