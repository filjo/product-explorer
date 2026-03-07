import { PrimaryButton, RootView, SecondaryButton, Text } from "@/components";
import { useProductCategoriesStore } from "@/store";
import { makeStyles } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";

export const DebugScreen = () => {
  // Hooks
  const styles = useStyles();
  const queryClient = useQueryClient();

  // Store
  const clearCategories = useProductCategoriesStore((state) => state.clearCategories);
  const clearSelectedCategory = useProductCategoriesStore((state) => state.clearSelectedCategory);

  // State
  const [lastActionMessage, setLastActionMessage] = React.useState<string | null>(null);

  // Methods
  const onClearCategoriesPress = React.useCallback(() => {
    clearCategories();
    clearSelectedCategory();
    setLastActionMessage("Categories have been cleared.");
  }, [clearCategories, clearSelectedCategory]);

  const onClearQueryCachePress = React.useCallback(() => {
    queryClient.clear();
    setLastActionMessage("Query cache has been cleared.");
  }, [queryClient]);

  // Render
  return (
    <RootView style={styles.container}>
      <Text variant="title2">Debug Tools</Text>
      <Text color="textSecondary">
        Use these actions to clear local categories and cached queries.
      </Text>

      <View style={styles.buttonsContainer}>
        <PrimaryButton title="Clear Categories" onPress={onClearCategoriesPress} />
        <SecondaryButton title="Clear Query Cache" onPress={onClearQueryCachePress} />
      </View>

      {lastActionMessage ? (
        <Text variant="footnote" color="textSecondary">
          {lastActionMessage}
        </Text>
      ) : null}
    </RootView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing.s4,
    gap: theme.spacing.s4,
  },
  buttonsContainer: {
    gap: theme.spacing.s3,
  },
}));
