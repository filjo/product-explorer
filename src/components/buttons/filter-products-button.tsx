import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform } from "react-native";
import { NavigationBarItem } from "./navigation-bar-item";

interface FilterProductsButtonProps {
  isFilterActive: boolean;
  onPress: () => void;
}

export const FilterProductsButtonComponent = ({
  isFilterActive,
  onPress,
}: FilterProductsButtonProps) => {
  // Hooks
  const theme = useTheme();
  const iconColor = isFilterActive ? theme.colors.brand : theme.colors.text;
  const paddingHorizontal = Platform.select({
    ios: theme.spacing.s3,
  });
  const marginRight = Platform.select({
    android: theme.spacing.s3,
  });
  const iconPaddingHorizontal = Platform.select({
    ios: theme.spacing.s1,
  });
  // Render
  return (
    <NavigationBarItem style={{ paddingHorizontal, marginRight }} onPress={onPress}>
      <MaterialIcons
        style={{ paddingHorizontal: iconPaddingHorizontal }}
        name="tune"
        size={20}
        color={iconColor}
      />
    </NavigationBarItem>
  );
};

export const FilterProductsButton = React.memo(FilterProductsButtonComponent);
