import React from "react";
import { renderHook } from "@testing-library/react-native";

import { getThemeTokens } from "@/design-system";
import { ThemeContext } from "@/contexts";

import { useTheme } from "./use-theme";

describe("useTheme", () => {
  it("returns theme from ThemeContext", () => {
    const theme = getThemeTokens("dark");

    const wrapper = ({ children }: React.PropsWithChildren) => (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toBe(theme);
  });

  it("throws when used outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within ThemeProvider",
    );
  });
});
