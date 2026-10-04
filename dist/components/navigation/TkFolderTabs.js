"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";
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
const TkFolderTabs = TabsPrimitive.Root;
const TkFolderTabsList = React.forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.List, { ref: ref, className: cn("inline-flex items-end gap-1", className), ...props })));
TkFolderTabsList.displayName = "TkFolderTabsList";
const TkFolderTabsTrigger = React.forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.Trigger, { ref: ref, className: cn("tk-folder-tab", "relative inline-flex items-center justify-center whitespace-nowrap", "px-4 py-2 text-sm font-medium font-heading", "border border-border rounded-t-md", "transition-all duration-200", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", 
    // Inactive state
    "text-muted-foreground bg-muted/30", "hover:bg-muted/50 hover:text-foreground", 
    // Active state
    "data-[state=active]:bg-background data-[state=active]:text-foreground", "data-[state=active]:z-10", "data-[state=active]:shadow-sm", 
    // Position to overlap with content border
    "mb-[-1px]", className), ...props })));
TkFolderTabsTrigger.displayName = "TkFolderTabsTrigger";
const TkFolderTabsContent = React.forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.Content, { ref: ref, className: cn("mt-0 pt-4 border-t border-border", "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className), ...props })));
TkFolderTabsContent.displayName = "TkFolderTabsContent";
export { TkFolderTabs, TkFolderTabsList, TkFolderTabsTrigger, TkFolderTabsContent };
//# sourceMappingURL=TkFolderTabs.js.map