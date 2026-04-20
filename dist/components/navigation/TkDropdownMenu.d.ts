import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
interface TkDropdownMenuItem {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    variant?: "default" | "destructive";
}
interface TkDropdownMenuGroup {
    label?: string;
    items: TkDropdownMenuItem[];
}
interface TkDropdownMenuProps {
    trigger: ReactNode;
    groups: TkDropdownMenuGroup[];
    width?: string;
    className?: string;
}
/**
 * TkDropdownMenu - Thinkube dropdown menu with groups and icons
 * Thinkube-approved component from thinkube-style
 */
export declare function TkDropdownMenu({ trigger, groups, width, className }: TkDropdownMenuProps): import("react/jsx-runtime").JSX.Element;
export { DropdownMenu as TkDropdownMenuRoot } from "../../components/ui/dropdown-menu";
export { DropdownMenuContent as TkDropdownMenuContent } from "../../components/ui/dropdown-menu";
export { DropdownMenuGroup as TkDropdownMenuGroup } from "../../components/ui/dropdown-menu";
export { DropdownMenuItem as TkDropdownMenuItem } from "../../components/ui/dropdown-menu";
export { DropdownMenuLabel as TkDropdownMenuLabel } from "../../components/ui/dropdown-menu";
export { DropdownMenuSeparator as TkDropdownMenuSeparator } from "../../components/ui/dropdown-menu";
export { DropdownMenuTrigger as TkDropdownMenuTrigger } from "../../components/ui/dropdown-menu";
//# sourceMappingURL=TkDropdownMenu.d.ts.map