import { ReactNode } from "react";
interface TkTooltipProps {
    children: ReactNode;
    content: string | ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
}
/**
 * TkTooltip - Thinkube tooltip wrapper with consistent styling
 * Thinkube-approved component from thinkube-style
 */
export declare function TkTooltip({ children, content, side, className }: TkTooltipProps): import("react/jsx-runtime").JSX.Element;
export { Tooltip as TkTooltipRoot } from "../../components/ui/tooltip";
export { TooltipContent as TkTooltipContent } from "../../components/ui/tooltip";
export { TooltipProvider as TkTooltipProvider } from "../../components/ui/tooltip";
export { TooltipTrigger as TkTooltipTrigger } from "../../components/ui/tooltip";
//# sourceMappingURL=TkTooltip.d.ts.map