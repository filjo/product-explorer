import { useTheme } from "@/hooks";
import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Pressable, TouchableOpacity } from "react-native";

const CloseIcon = () => {
  const theme = useTheme();
  return <MaterialIcons name="close" size={24} color={theme.colors.text} />;
};

export const CloseButton = ({ onPress }: { onPress: () => void }) => {
  const styles = useStyles();

  if (Platform.OS === "android") {
    const buttonStyle = Platform.select({
      android: styles.button,
    });
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={buttonStyle}>
        <CloseIcon />
      </TouchableOpacity>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <CloseIcon />
    </Pressable>
  );
};

// Styles

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
