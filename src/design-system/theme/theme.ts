import { colors } from "@/design-system/tokens/colors";
import { spacing } from "@/design-system/tokens/spacing";

type ColorScheme = "light" | "dark" | "unspecified" | null | undefined;

export type Theme = {
  colors: (typeof colors)[keyof typeof colors];
  spacing: typeof spacing;
};

export function getThemeTokens(scheme: ColorScheme): Theme {
  const mode = scheme === "dark" ? "dark" : "light";

  return {
    colors: colors[mode],
    spacing,
  };
}
