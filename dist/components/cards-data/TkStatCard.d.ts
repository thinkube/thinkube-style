import * as React from "react";
import { LucideIcon } from "lucide-react";
type TrendDirection = "up" | "down" | "neutral";
interface TkStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: {
        value: number;
        direction: TrendDirection;
        label?: string;
    };
    variant?: "default" | "primary" | "success" | "warning" | "destructive";
    badge?: React.ReactNode;
}
/**
 * TkStatCard - Statistics card with trends, icons, and variants
 * Thinkube-approved component from thinkube-style
 */
declare const TkStatCard: React.ForwardRefExoticComponent<TkStatCardProps & React.RefAttributes<HTMLDivElement>>;
export { TkStatCard, type TrendDirection };
//# sourceMappingURL=TkStatCard.d.ts.map