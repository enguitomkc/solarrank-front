"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";
import { useState, useEffect } from "react";

type ThemeAttribute = "class" | "data-theme" | "data-mode";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: ThemeAttribute;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
}: ThemeProviderProps) {
  // Prevent hydration mismatch by ensuring client-side rendering
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}
