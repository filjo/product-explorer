import { Product } from "@/models/Product";
import { useProducts } from "@/queries/useProducts";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductsScreen() {
  // Query

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts();

  // Render

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
        <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
        <View>
          <Text>{item.title}</Text>
          <Text>{item.price}</Text>
        </View>
      </View>
    );
  };

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      ) : null}

      <FlashList<Product>
        data={data ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{ height: 100 }} />
          )
        }
      />
    </SafeAreaView>
  );
}
