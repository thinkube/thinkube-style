"use client";

import { Moon, Sun } from "lucide-react";
import { useTkTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function TkThemeToggle() {
  const { actualTheme, setTheme } = useTkTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9"
    >
      {actualTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
