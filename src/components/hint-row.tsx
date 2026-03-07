import React, { type ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "./text";
import { ThemedView } from "./themed-view";

import { useTheme } from "@/hooks/use-theme";

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = "Try editing", hint = "app/index.tsx" }: HintRowProps) {
  const { spacing } = useTheme();

  return (
    <View style={styles.stepRow}>
      <Text variant="footnote">{title}</Text>
      <ThemedView
        type="backgroundSelected"
        style={[
          styles.codeSnippet,
          {
            borderRadius: spacing.two,
            paddingVertical: spacing.half,
            paddingHorizontal: spacing.two,
          },
        ]}
      >
        <Text color="textSecondary">{hint}</Text>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codeSnippet: {},
});
