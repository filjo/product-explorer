import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { NavigationBarItem } from "./navigation-bar-item";

export const CloseButtonComponent = ({
  onPress,
  testID = "close-button",
}: {
  onPress: () => void;
  testID?: string;
}) => {
  const theme = useTheme();

  return (
    <NavigationBarItem testID={testID} onPress={onPress}>
      <MaterialIcons testID={`${testID}-icon`} name="close" size={24} color={theme.colors.text} />
    </NavigationBarItem>
  );
};

export const CloseButton = React.memo(CloseButtonComponent);
