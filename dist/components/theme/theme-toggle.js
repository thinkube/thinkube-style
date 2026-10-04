"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTkTheme } from "./theme-provider";
import { Button } from "../../components/ui/button";
export function TkThemeToggle() {
    const { actualTheme, setTheme } = useTkTheme();
    return (_jsxs(Button, { variant: "ghost", size: "icon", onClick: () => setTheme(actualTheme === 'dark' ? 'light' : 'dark'), className: "w-9 h-9", children: [actualTheme === "dark" ? (_jsx(Sun, { className: "h-5 w-5" })) : (_jsx(Moon, { className: "h-5 w-5" })), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }));
}
//# sourceMappingURL=theme-toggle.js.map