import { Button } from "../../components/ui/button";
import { ComponentProps } from "react";
type TkLoadingButtonProps = ComponentProps<typeof Button> & {
    loading?: boolean;
};
/**
 * TkLoadingButton - Button with built-in loading state
 * Thinkube-approved component from thinkube-style
 */
export declare function TkLoadingButton({ loading, children, disabled, ...props }: TkLoadingButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkLoadingButton.d.ts.map