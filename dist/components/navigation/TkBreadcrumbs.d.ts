import { ReactNode } from "react";
interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
}
interface TkBreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: ReactNode;
    className?: string;
}
/**
 * TkBreadcrumbs - Navigation breadcrumbs showing current location
 * Thinkube-approved component from thinkube-style
 */
export declare function TkBreadcrumbs({ items, separator, className }: TkBreadcrumbsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkBreadcrumbs.d.ts.map