import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-heading", {
    variants: {
        variant: {
            default: "border-primary/40 bg-primary/5 text-primary",
            secondary: "border-border bg-secondary text-secondary-foreground",
            destructive: "border-destructive/40 bg-destructive/5 text-destructive",
            outline: "border-border text-foreground",
            success: "border-[var(--color-success)]/40 bg-[var(--color-success)]/5 text-[var(--color-success)]",
            warning: "border-[var(--color-warning)]/40 bg-[var(--color-warning)]/5 text-[var(--color-warning)]",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Badge({ className, variant, ...props }) {
    return (_jsx("span", { className: cn(badgeVariants({ variant }), className), ...props }));
}
export { Badge, badgeVariants };
//# sourceMappingURL=badge.js.map