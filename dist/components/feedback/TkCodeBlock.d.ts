import { ComponentProps } from "react";
interface TkCodeBlockProps extends Omit<ComponentProps<"pre">, "className"> {
    /** Additional CSS classes */
    className?: string;
    /** Code/log content to display */
    children: React.ReactNode;
    /** Maximum height (default: 96 = 24rem) */
    maxHeight?: string;
    /** Background opacity variant */
    variant?: "solid" | "translucent";
}
/**
 * TkCodeBlock - Thinkube component for displaying code or logs
 *
 * Features:
 * - Monospace font
 * - Scrollable with proper overflow handling
 * - Theme-aware background
 * - Consistent padding and styling
 *
 * @example
 * ```tsx
 * <TkCodeBlock>
 *   {logContent}
 * </TkCodeBlock>
 * ```
 */
export declare function TkCodeBlock({ children, className, maxHeight, variant, ...props }: TkCodeBlockProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkCodeBlock.d.ts.map