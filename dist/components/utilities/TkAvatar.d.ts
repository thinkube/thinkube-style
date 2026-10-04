import { Avatar } from "../../components/ui/avatar";
import { ComponentProps } from "react";
type TkAvatarProps = ComponentProps<typeof Avatar> & {
    src?: string;
    fallback: string;
};
/**
 * TkAvatar - Thinkube wrapper for Avatar with fallback
 * Thinkube-approved component from thinkube-style
 */
export declare function TkAvatar({ src, fallback, ...props }: TkAvatarProps): import("react/jsx-runtime").JSX.Element;
export { Avatar as TkAvatarRoot } from "../../components/ui/avatar";
export { AvatarFallback as TkAvatarFallback } from "../../components/ui/avatar";
export { AvatarImage as TkAvatarImage } from "../../components/ui/avatar";
//# sourceMappingURL=TkAvatar.d.ts.map