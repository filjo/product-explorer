import { Theme } from "@/design-system";
import { useTheme } from "@/hooks";
import { useMemo } from "react";
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from "react-native";

type NamedStyles = Record<string, ViewStyle | TextStyle | ImageStyle>;

export function makeStyles<T extends NamedStyles>(factory: (theme: Theme) => T) {
  return function useStyles(): T {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
