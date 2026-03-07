import React, { PropsWithChildren, createContext, useMemo } from "react";

import { getThemeTokens } from "@/design-system";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ThemeContextValue = ReturnType<typeof getThemeTokens>;

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const scheme = useColorScheme();
  const theme = useMemo(() => getThemeTokens(scheme), [scheme]);

  return React.createElement(ThemeContext.Provider, { value: theme }, children);
};
