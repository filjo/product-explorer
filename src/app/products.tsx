import { RatingView } from "@/components";
import { Product } from "@/models/Product";
import { useProducts } from "@/queries/useProducts";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProductsScreen = ({ navigation }: any) => {
  // Query

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts();
  // Render

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} contentFit="contain" />
          <Pressable onPress={() => undefined} style={styles.heartButton} hitSlop={8}>
            <SymbolView
              name={{ ios: "heart", android: "favorite_border", web: "favorite_border" }}
              size={16}
              tintColor="#7a7a7a"
            />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <RatingView rating={item.rating} />

          {item.discountPercentage > 0 ? (
            <View style={styles.discountBlock}>
              <Text style={styles.price}>
                US${getDiscountedPrice(item.price, item.discountPercentage)}
              </Text>
              <View style={styles.discountMetaRow}>
                <Text style={styles.originalPrice}>US${item.price.toFixed(2)}</Text>
                <Text style={styles.discountTag}>-{Math.round(item.discountPercentage)}%</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.price}>US${item.price.toFixed(2)}</Text>
          )}
        </View>
      </Pressable>
    );
  };

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    fetchNextPage();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      ) : null}

      <FlashList<Product>
        data={data ?? []}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.listContent}
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
};

const getDiscountedPrice = (price: number, discountPercentage: number) => {
  const discountedPrice = price - (price * discountPercentage) / 100;
  return discountedPrice.toFixed(2);
};

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 6,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: "#F0F0F3",
    overflow: "hidden",
    padding: 12,
  },
  image: {
    flex: 1,
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingTop: 8,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  discountBlock: {
    marginTop: 2,
    gap: 1,
  },
  discountMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
  },
  originalPrice: {
    fontSize: 13,
    color: "#8a8a8a",
    textDecorationLine: "line-through",
  },
  discountTag: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0a8f45",
  },
});
