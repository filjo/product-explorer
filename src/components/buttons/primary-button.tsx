import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { makeStyles } from "@/utils";
import { Text } from "../text";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PrimaryButtonComponent = ({
  title,
  onPress,
  disabled = false,
  style,
}: PrimaryButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : undefined, style]}
    >
      <Text color="background" style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    minHeight: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brand,
    paddingHorizontal: theme.spacing.s5,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "600",
  },
}));

export const PrimaryButton = React.memo(PrimaryButtonComponent);
