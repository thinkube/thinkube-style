import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * TkBreadcrumbs - Navigation breadcrumbs showing current location
 * Thinkube-approved component from thinkube-style
 */
export function TkBreadcrumbs({ items, separator = "/", className = "" }) {
    return (_jsx("div", { className: `flex items-center gap-2 text-sm ${className}`, children: items.map((item, index) => {
            const isLast = index === items.length - 1;
            if (isLast) {
                return (_jsx("span", { className: "text-muted-foreground", children: item.label }, index));
            }
            return (_jsxs("div", { className: "flex items-center gap-2", children: [item.href ? (_jsx("a", { href: item.href, className: "text-primary hover:underline", children: item.label })) : item.onClick ? (_jsx("button", { onClick: item.onClick, className: "text-primary hover:underline", children: item.label })) : (_jsx("span", { className: "text-primary", children: item.label })), _jsx("span", { className: "text-muted-foreground", children: separator })] }, index));
        }) }));
}
//# sourceMappingURL=TkBreadcrumbs.js.map