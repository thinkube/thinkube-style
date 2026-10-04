interface TkProgressBarProps {
    current: number;
    total: number;
    currentLabel?: string;
    showPercentage?: boolean;
    isRunning?: boolean;
    className?: string;
}
/**
 * TkProgressBar - Simple progress bar with current step display
 * Thinkube-approved component from thinkube-style
 */
export declare function TkProgressBar({ current, total, currentLabel, showPercentage, isRunning, className, }: TkProgressBarProps): import("react/jsx-runtime").JSX.Element;
interface TkProgressBarWithRecentStepsProps {
    steps: string[];
    current: number;
    isRunning?: boolean;
    title?: string;
    className?: string;
}
/**
 * TkProgressBarWithRecentSteps - Progress bar showing recent completed steps
 * Thinkube-approved component from thinkube-style
 */
export declare function TkProgressBarWithRecentSteps({ steps, current, isRunning, title, className, }: TkProgressBarWithRecentStepsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkProgressBar.d.ts.map