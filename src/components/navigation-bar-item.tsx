/**
 * Wrapper for a navigation bar item
 * This is mostly for lookalike Android navigation bar items to IOS
 */

import { makeStyles } from "@/utils";
import { Platform, Pressable, StyleProp, TouchableOpacity, ViewStyle } from "react-native";

export const NavigationBarItem = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const styles = useStyles();
  const buttonStyle = Platform.select({
    android: styles.button,
  });

  if (Platform.OS === "android") {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[buttonStyle, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPress={onPress} style={[style]} hitSlop={8}>
      {children}
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
