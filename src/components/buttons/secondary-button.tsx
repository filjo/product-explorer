import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

import { makeStyles } from "@/utils";
import { Text } from "../text";

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SecondaryButtonComponent = ({
  title,
  onPress,
  disabled = false,
  style,
  testID = "secondary-button",
}: SecondaryButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled ? styles.buttonDisabled : undefined, style]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    minHeight: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.backgroundSelected,
    paddingHorizontal: theme.spacing.s5,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "600",
  },
}));

export const SecondaryButton = React.memo(SecondaryButtonComponent);
