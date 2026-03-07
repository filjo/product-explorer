import React from "react";
import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from "react-native";

import { type IOSTypographyName, type ThemeColor, typography } from "@/design-system";
import { useTheme } from "@/hooks/use-theme";

export type AppTextProps = Omit<TextProps, "style"> & {
  variant?: IOSTypographyName;
  color?: ThemeColor;
  style?: StyleProp<TextStyle>;
};

export function Text({ variant = "body", color = "text", style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const variantStyle = typography[variant];
  const textColor = color ? colors[color] : colors.text;
  return <RNText style={[variantStyle, { color: textColor }, style]} {...rest} />;
}
