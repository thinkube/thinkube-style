import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
/**
 * TkAvatar - Thinkube wrapper for Avatar with fallback
 * Thinkube-approved component from thinkube-style
 */
export function TkAvatar({ src, fallback, ...props }) {
    return (_jsxs(Avatar, { ...props, children: [src && _jsx(AvatarImage, { src: src }), _jsx(AvatarFallback, { children: fallback })] }));
}
// Export Avatar primitives with Tk prefix
export { Avatar as TkAvatarRoot } from "../../components/ui/avatar";
export { AvatarFallback as TkAvatarFallback } from "../../components/ui/avatar";
export { AvatarImage as TkAvatarImage } from "../../components/ui/avatar";
//# sourceMappingURL=TkAvatar.js.map