const common = {
  // Status colors
  success: "#0a8f45",
  warning: "#ff9500",
  error: "#ff3b30",
  info: "#007aff",
};

const brand = "#C66A43";
const brandMuted = {
  light: "#F5E8E1",
  dark: "#4A2E23",
} as const;

export const colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    ...common,
    brand,
    brandMuted: brandMuted.light,
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    ...common,
    brand,
    brandMuted: brandMuted.dark,
  },
} as const;

export type ThemeColor = keyof typeof colors.light | keyof typeof colors.dark;
