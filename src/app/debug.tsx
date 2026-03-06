import React from "react";
import { Button, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useProducts } from "@/queries";

export default function DebugScreen() {
  const { data, isLoading, isFetching, error, refetch } = useProducts();
  const firstProduct = data?.[0];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Debug Query</ThemedText>
      <Button title={isFetching ? "Reloading..." : "Reload Query"} onPress={() => refetch()} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        {isLoading && <ThemedText>Loading products...</ThemedText>}

        {error instanceof Error && <ThemedText>Error: {error.message}</ThemedText>}

        {!isLoading && !error && firstProduct && (
          <>
            <ThemedText type="smallBold">First Product</ThemedText>
            <ThemedText type="code">{JSON.stringify(firstProduct, null, 2)}</ThemedText>
          </>
        )}

        {!isLoading && !error && !firstProduct && <ThemedText>No products found.</ThemedText>}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
});
