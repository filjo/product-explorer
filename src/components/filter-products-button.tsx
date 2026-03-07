import { useTheme } from "@/hooks";
import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

interface FilterProductsButtonProps {
  isFilterActive: boolean;
  onPress: () => void;
}

export const FilterProductsButton = ({ isFilterActive, onPress }: FilterProductsButtonProps) => {
  // Hooks
  const styles = useStyles();
  const theme = useTheme();
  const backgroundColor = isFilterActive ? theme.colors.brandMuted : theme.colors.background;
  const iconColor = isFilterActive ? theme.colors.brand : theme.colors.text;
  // Render
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <MaterialIcons name="tune" size={24} color={iconColor} />
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
}));
