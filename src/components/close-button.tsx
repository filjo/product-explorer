import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { NavigationBarItem } from "./navigation-bar-item";

export const CloseButtonComponent = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();

  return (
    <NavigationBarItem onPress={onPress}>
      <MaterialIcons name="close" size={24} color={theme.colors.text} />
    </NavigationBarItem>
  );
};

export const CloseButton = React.memo(CloseButtonComponent);
