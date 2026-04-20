interface TkStepListProps {
    steps: string[];
    current: number;
    isRunning?: boolean;
    maxHeight?: string;
    className?: string;
}
/**
 * TkStepList - Scrollable step list for detailed progress tracking
 * Thinkube-approved component from thinkube-style
 */
export declare function TkStepList({ steps, current, isRunning, maxHeight, className, }: TkStepListProps): import("react/jsx-runtime").JSX.Element;
interface TkDotProgressProps {
    steps: string[];
    current: number;
    isRunning?: boolean;
    currentLabel?: string;
    showBadge?: boolean;
    className?: string;
}
/**
 * TkDotProgress - Minimal dot-based progress indicator
 * Thinkube-approved component from thinkube-style
 */
export declare function TkDotProgress({ steps, current, isRunning, currentLabel, showBadge, className, }: TkDotProgressProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkStepList.d.ts.map