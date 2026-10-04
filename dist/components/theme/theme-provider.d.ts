import { ReactNode } from 'react';
type Theme = 'dark' | 'light' | 'system';
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    actualTheme: 'dark' | 'light';
}
interface ThemeProviderProps {
    children: ReactNode;
    attribute?: string;
    defaultTheme?: Theme;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}
export declare function TkThemeProvider({ children, defaultTheme }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTkTheme(): ThemeContextType;
export {};
//# sourceMappingURL=theme-provider.d.ts.map