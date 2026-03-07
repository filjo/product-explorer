import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

type FavoriteButtonProps = {
  disabled?: boolean;
  isLiked: boolean;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const FavoriteButtonComponent = ({
  disabled = false,
  isLiked,
  onPress,
  size = 20,
  style,
}: FavoriteButtonProps) => {
  const name = isLiked ? "favorite" : "favorite-border";
  const color = isLiked ? "black" : "#7a7a7a";
  return (
    <Pressable onPress={onPress} hitSlop={15} style={[styles.pressable, style]} disabled={disabled}>
      <MaterialIcons name={name} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const FavoriteButton = React.memo(FavoriteButtonComponent);
