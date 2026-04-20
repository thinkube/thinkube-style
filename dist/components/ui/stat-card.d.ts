import * as React from "react";
import { LucideIcon } from "lucide-react";
type TrendDirection = "up" | "down" | "neutral";
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
}
declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;
export { StatCard, type TrendDirection };
//# sourceMappingURL=stat-card.d.ts.map