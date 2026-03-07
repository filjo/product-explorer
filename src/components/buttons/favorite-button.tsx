import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { NavigationBarItem } from "./navigation-bar-item";

type ButtonType = "navigation" | "card";

type FavoriteButtonProps = {
  type: ButtonType;
  disabled?: boolean;
  isLiked: boolean;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const FavoriteButtonComponent = ({
  type = "card",
  disabled = false,
  isLiked,
  onPress,
  size = 24,
  style,
}: FavoriteButtonProps) => {
  // Hooks
  const styles = useStyles();
  const name = isLiked ? "favorite" : "favorite-border";
  const color = isLiked ? "black" : "#7a7a7a";

  if (type === "navigation") {
    return (
      <NavigationBarItem onPress={onPress ?? (() => {})}>
        <MaterialIcons name={name} size={size} color={color} />
      </NavigationBarItem>
    );
  }

  return (
    <Pressable onPress={onPress} hitSlop={15} style={[styles.pressable, style]} disabled={disabled}>
      <MaterialIcons name={name} size={size} color={color} />
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  pressable: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButton: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  card: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
}));

export const FavoriteButton = React.memo(FavoriteButtonComponent);
