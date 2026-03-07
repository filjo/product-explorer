import { SymbolView } from "expo-symbols";
import { PropsWithChildren, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Text } from "@/components/text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors, spacing } = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [
          styles.heading,
          { gap: spacing.two },
          pressed && styles.pressedHeading,
        ]}
        onPress={() => setIsOpen((value) => !value)}
      >
        <ThemedView
          type="backgroundElement"
          style={[styles.button, { width: spacing.four, height: spacing.four }]}
        >
          <SymbolView
            name={{ ios: "chevron.right", android: "chevron_right", web: "chevron_right" }}
            size={14}
            weight="bold"
            tintColor={colors.text}
            style={{ transform: [{ rotate: isOpen ? "-90deg" : "90deg" }] }}
          />
        </ThemedView>

        <Text variant="footnote">{title}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView
            type="backgroundElement"
            style={[
              styles.content,
              {
                marginTop: spacing.three,
                borderRadius: spacing.three,
                marginLeft: spacing.four,
                padding: spacing.four,
              },
            ]}
          >
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {},
});
