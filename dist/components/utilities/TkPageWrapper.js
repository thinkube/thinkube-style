import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TkPageWrapper({ children, title, description, }) {
    return (_jsxs("div", { className: "container mx-auto px-6 py-8", style: {
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            perspective: 1000,
            WebkitPerspective: 1000
        }, children: [title && (_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-heading font-bold mb-2", children: title }), description && (_jsx("p", { className: "text-sm text-muted-foreground", children: description }))] })), children] }));
}
//# sourceMappingURL=TkPageWrapper.js.map