import { LucideIcon } from "lucide-react";
interface TkServiceCardProps {
    name: string;
    description: string;
    icon?: string;
    lucideIcon?: LucideIcon;
    status: "healthy" | "unhealthy" | "pending";
    enabled?: boolean;
    onToggle?: (enabled: boolean) => void;
    badges?: Array<{
        label: string;
        variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning";
    }>;
    gpuCount?: number;
    metrics?: Array<{
        label: string;
        value: string;
        variant?: "default" | "success" | "warning" | "error";
    }>;
    actions?: Array<{
        icon: LucideIcon;
        label: string;
        onClick: () => void;
        variant?: "default" | "outline" | "destructive" | "ghost";
    }>;
    className?: string;
}
/**
 * TkServiceCard - Comprehensive service card matching Thinkube dashboard design
 * Thinkube-approved component from thinkube-style
 */
export declare function TkServiceCard({ name, description, icon, lucideIcon: LucideIconComponent, status, enabled, onToggle, badges, gpuCount, metrics, actions, className, }: TkServiceCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TkServiceCard.d.ts.map