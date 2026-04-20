/*
 * Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
/**
 * TkPasswordInput - Password input with show/hide toggle
 * Thinkube-approved component from thinkube-style
 */
export function TkPasswordInput({ id, placeholder = "Enter password", value, onChange, className = "" }) {
    const [showPassword, setShowPassword] = useState(false);
    return (_jsxs("div", { className: "relative", children: [_jsx(Input, { id: id, type: showPassword ? "text" : "password", placeholder: placeholder, value: value, onChange: onChange, className: `pr-10 ${className}` }), _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-0 top-0 h-full px-3", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(EyeOff, { className: "h-4 w-4" })) : (_jsx(Eye, { className: "h-4 w-4" })) })] }));
}
//# sourceMappingURL=TkPasswordInput.js.map