"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
export function TkThemeProvider({ children, defaultTheme = 'system' }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined')
            return defaultTheme;
        const stored = localStorage.getItem('theme');
        return stored || defaultTheme;
    });
    const [actualTheme, setActualTheme] = useState('light');
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        let resolved;
        if (theme === 'system') {
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        else {
            resolved = theme;
        }
        root.classList.add(resolved);
        setActualTheme(resolved);
        localStorage.setItem('theme', theme);
    }, [theme]);
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme, actualTheme }, children: children }));
}
export function useTkTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTkTheme must be used within a TkThemeProvider');
    }
    return context;
}
//# sourceMappingURL=theme-provider.js.map