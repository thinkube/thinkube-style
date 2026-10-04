/**
 * Hook for copying text to clipboard with visual feedback
 *
 * @param text - The text to copy (can be updated)
 * @param duration - How long to show "copied" state (default: 2000ms)
 * @returns Object with copy function and copied state
 *
 * @example
 * const { copy, copied } = useCopyToClipboard(logText);
 *
 * <Button onClick={copy}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 */
export declare function useCopyToClipboard(text: string, duration?: number): {
    copy: () => Promise<void>;
    copied: boolean;
};
//# sourceMappingURL=use-copy-to-clipboard.d.ts.map