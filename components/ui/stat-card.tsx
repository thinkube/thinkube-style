"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      description,
      icon: Icon,
      trend,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "",
      primary: "border-primary/50 bg-primary/5",
      success: "border-success/50 bg-success/5",
      warning: "border-warning/50 bg-warning/5",
      destructive: "border-destructive/50 bg-destructive/5",
    };

    const iconColorStyles = {
      default: "text-muted-foreground",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    };

    const getTrendColor = (direction: TrendDirection) => {
      switch (direction) {
        case "up":
          return "text-success";
        case "down":
          return "text-destructive";
        case "neutral":
          return "text-muted-foreground";
      }
    };

    const getTrendIcon = (direction: TrendDirection) => {
      switch (direction) {
        case "up":
          return ArrowUp;
        case "down":
          return ArrowDown;
        case "neutral":
          return null;
      }
    };

    const TrendIcon = trend ? getTrendIcon(trend.direction) : null;

    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-200 hover:shadow-md",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
                {trend && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      getTrendColor(trend.direction)
                    )}
                  >
                    {TrendIcon && <TrendIcon className="w-4 h-4" />}
                    <span>{trend.value}%</span>
                  </div>
                )}
              </div>
              {(description || trend?.label) && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {trend?.label || description}
                </p>
              )}
            </div>
            {Icon && (
              <div
                className={cn(
                  "p-3 rounded-lg bg-background/50",
                  iconColorStyles[variant]
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard, type TrendDirection };
