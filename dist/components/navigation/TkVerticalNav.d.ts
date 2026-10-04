import { LucideIcon } from "lucide-react";
interface TkNavItem {
    id: string;
    label: string;
    lucideIcon?: LucideIcon;
    brandIcon?: string;
    href?: string;
    onClick?: () => void;
    isGroup?: boolean;
    children?: TkNavItem[];
}
interface TkVerticalNavProps {
    items: TkNavItem[];
    activeItem?: string;
    onItemClick?: (id: string) => void;
    logoIcon?: string;
    logoText?: string;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    className?: string;
}
/**
 * TkVerticalNav - Collapsible vertical navigation sidebar
 * Thinkube-approved component from thinkube-style
 */
export declare function TkVerticalNav({ items, activeItem, onItemClick, logoIcon, logoText, collapsed: controlledCollapsed, onCollapsedChange, className, }: TkVerticalNavProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkVerticalNav.d.ts.map