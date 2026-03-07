import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

import { useTheme } from "@/hooks";
import { makeStyles } from "@/utils";
import { Text } from "./text";

type EmptyListViewProps = {
  title: string;
  description: string;
  iconName?: React.ComponentProps<typeof MaterialIcons>["name"];
  children?: React.ReactNode;
};

export const EmptyListView = ({
  title,
  description,
  iconName = "inbox",
  children,
}: EmptyListViewProps) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={28} color={colors.brand} />
      </View>
      <View style={styles.textContainer}>
        <Text variant="title3" style={styles.title}>
          {title}
        </Text>
        <Text color="textSecondary" style={styles.description}>
          {description}
        </Text>
      </View>
      {children ? <View style={styles.childrenContainer}>{children}</View> : null}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.s5,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.brandMuted,
  },
  textContainer: {
    marginTop: theme.spacing.s4,
    alignItems: "center",
    gap: theme.spacing.s2,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
  },
  description: {
    textAlign: "center",
  },
  childrenContainer: {
    marginTop: theme.spacing.s4,
    width: "100%",
  },
}));
