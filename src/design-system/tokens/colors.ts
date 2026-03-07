const common = {
  // Status colors
  success: "#0a8f45",
  warning: "#ff9500",
  error: "#ff3b30",
  info: "#007aff",
};

export const colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    ...common,
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    ...common,
  },
} as const;

export type ThemeColor = keyof typeof colors.light | keyof typeof colors.dark;
