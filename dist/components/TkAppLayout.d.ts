import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
export interface TkNavItem {
    id: string;
    label: string;
    lucideIcon?: LucideIcon;
    brandIcon?: string;
    href?: string;
    isGroup?: boolean;
    children?: TkNavItem[];
}
interface TkAppLayoutProps {
    children: ReactNode;
    navigationItems: TkNavItem[];
    activeItem?: string;
    onItemClick?: (id: string) => void;
    logoIcon?: string;
    logoText?: string;
    topBarTitle?: string;
    topBarLeftContent?: ReactNode;
    topBarContent?: ReactNode;
}
/**
 * TkAppLayout - Application layout with sidebar navigation and top bar
 * Thinkube-approved component from thinkube-style
 */
export declare function TkAppLayout({ children, navigationItems, activeItem, onItemClick, logoIcon, logoText, topBarTitle, topBarLeftContent, topBarContent, }: TkAppLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkAppLayout.d.ts.map