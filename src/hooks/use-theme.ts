/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeContext } from "@/contexts";
import { useContext } from "react";

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return theme;
};
