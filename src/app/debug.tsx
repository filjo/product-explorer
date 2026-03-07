import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";

import { Text } from "@/components/text";
import { ThemedView } from "@/components/themed-view";
import { useProducts } from "@/queries";

export const DebugScreen = () => {
  const { data, isLoading, isFetching, error, refetch } = useProducts();
  const firstProduct = data?.[0];

  return (
    <ThemedView style={styles.container}>
      <Text variant="title1">Debug Query</Text>
      <Button title={isFetching ? "Reloading..." : "Reload Query"} onPress={() => refetch()} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        {isLoading && <Text>Loading products...</Text>}

        {error instanceof Error && <Text>Error: {error.message}</Text>}

        {!isLoading && !error && firstProduct && (
          <>
            <Text variant="footnote" style={styles.labelStrong}>
              First Product
            </Text>
            <Text variant="code">{JSON.stringify(firstProduct, null, 2)}</Text>
          </>
        )}

        {!isLoading && !error && !firstProduct && <Text>No products found.</Text>}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  labelStrong: {
    fontWeight: "700",
  },
});
