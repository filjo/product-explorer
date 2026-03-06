import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

type FavoriteButtonProps = {
  isLiked: boolean;
  onPress: () => void;
  size?: number;
  withBackground?: boolean;
  style?: StyleProp<ViewStyle>;
};

const FavoriteButtonComponent = ({
  isLiked,
  onPress,
  size = 20,
  withBackground = false,
  style,
}: FavoriteButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[withBackground ? styles.withBackground : undefined, style]}
    >
      <MaterialIcons
        name={isLiked ? "favorite" : "favorite-border"}
        size={size}
        color={isLiked ? "black" : "#7a7a7a"}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  withBackground: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const FavoriteButton = React.memo(FavoriteButtonComponent);
