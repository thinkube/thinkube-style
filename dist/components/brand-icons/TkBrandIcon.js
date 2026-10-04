import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TkBrandIcon - Thinkube brand icon with automatic light/dark mode switching
 * Thinkube-approved component from thinkube-style
 */
export function TkBrandIcon({ icon, alt, size = 20, className = "" }) {
    return (_jsxs("div", { className: `relative ${className}`, style: { width: size, height: size }, children: [_jsx("img", { src: `/icons/${icon}.svg`, alt: alt, style: { width: size, height: size }, className: "dark:hidden" }), _jsx("img", { src: `/icons/${icon}_inverted.svg`, alt: alt, style: { width: size, height: size }, className: "hidden dark:block" })] }));
}
//# sourceMappingURL=TkBrandIcon.js.map