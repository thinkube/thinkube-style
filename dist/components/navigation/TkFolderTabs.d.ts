import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
/**
 * TkFolderTabs - Modern folder-style tabs
 *
 * A clean, recognizable tab pattern where the active tab appears "in front"
 * and connects seamlessly to the content area, like traditional folder tabs
 * but with modern, minimal styling.
 *
 * @example
 * ```tsx
 * <TkFolderTabs value={activeTab} onValueChange={setActiveTab}>
 *   <TkFolderTabsList>
 *     <TkFolderTabsTrigger value="tab1">Tab 1</TkFolderTabsTrigger>
 *     <TkFolderTabsTrigger value="tab2">Tab 2</TkFolderTabsTrigger>
 *   </TkFolderTabsList>
 *   <TkFolderTabsContent value="tab1">Content 1</TkFolderTabsContent>
 *   <TkFolderTabsContent value="tab2">Content 2</TkFolderTabsContent>
 * </TkFolderTabs>
 * ```
 */
declare const TkFolderTabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TkFolderTabsList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TkFolderTabsTrigger: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TkFolderTabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { TkFolderTabs, TkFolderTabsList, TkFolderTabsTrigger, TkFolderTabsContent };
//# sourceMappingURL=TkFolderTabs.d.ts.map