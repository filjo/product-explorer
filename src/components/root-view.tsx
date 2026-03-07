import { makeStyles } from "@/utils";
import { StyleProp, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

interface RootViewProps {
  edges?: Edge[];
  noSafeArea?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}
export const RootView = ({
  edges = ["top", "bottom"],
  noSafeArea = false,
  style,
  children,
}: RootViewProps) => {
  // Hooks
  const styles = useStyles();

  // Render
  if (noSafeArea) {
    return <View style={[styles.container, style]}>{children}</View>;
  }
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

// Styles
const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
