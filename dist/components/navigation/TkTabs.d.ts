import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
interface TkTabItem {
    value: string;
    label: string;
    icon?: LucideIcon;
    content: ReactNode;
}
interface TkTabsProps {
    tabs: TkTabItem[];
    defaultValue?: string;
    className?: string;
}
/**
 * TkTabs - Thinkube tab navigation with optional icons
 * Thinkube-approved component from thinkube-style
 */
export declare function TkTabs({ tabs, defaultValue, className }: TkTabsProps): import("react/jsx-runtime").JSX.Element;
export { Tabs as TkTabsRoot } from "../../components/ui/tabs";
export { TabsContent as TkTabsContent } from "../../components/ui/tabs";
export { TabsList as TkTabsList } from "../../components/ui/tabs";
export { TabsTrigger as TkTabsTrigger } from "../../components/ui/tabs";
//# sourceMappingURL=TkTabs.d.ts.map