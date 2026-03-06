import { FavoriteButton, RatingView } from "@/components";
import { Product } from "@/models/Product";
import { useProductCategories, useProducts, useProductsByCategory } from "@/queries";
import { useFavoriteProductsStore } from "@/store";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProductsScreen = ({ navigation }: any) => {
  // Query

  const queryClient = useQueryClient();
  const handleFavoritePress = React.useCallback(() => undefined, []);
  const [isManualRefreshing, setIsManualRefreshing] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const isCategorySelected = Boolean(selectedCategory);

  const { data: categories = [] } = useProductCategories();
  const productsQuery = useProducts({ enabled: !isCategorySelected });
  const productsByCategoryQuery = useProductsByCategory(selectedCategory, {
    enabled: isCategorySelected,
  });

  const data = isCategorySelected ? productsByCategoryQuery.data : productsQuery.data;
  const isPending = isCategorySelected
    ? productsByCategoryQuery.isPending
    : productsQuery.isPending;
  const hasNextPage = isCategorySelected
    ? productsByCategoryQuery.hasNextPage
    : productsQuery.hasNextPage;
  const isFetchingNextPage = isCategorySelected
    ? productsByCategoryQuery.isFetchingNextPage
    : productsQuery.isFetchingNextPage;

  // Render

  const handleRefresh = async () => {
    setIsManualRefreshing(true);
    try {
      await Promise.all([
        queryClient.resetQueries({ queryKey: ["products"] }),
        queryClient.resetQueries({ queryKey: ["products-by-category"] }),
        queryClient.resetQueries({ queryKey: ["product-categories"] }),
      ]);
    } finally {
      setIsManualRefreshing(false);
    }
  };

  const footerComponent = isFetchingNextPage ? (
    <View style={{ paddingVertical: 16 }}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ height: 100 }} />
  );

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    // Store
    const isFavorite = useFavoriteProductsStore.getState().isFavorite(item.id);
    return (
      <Pressable
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} contentFit="contain" />
          <FavoriteButton isLiked={isFavorite} onPress={handleFavoritePress} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <RatingView rating={item.rating} reviewCount={item.reviews.length} />

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

    if (isCategorySelected) {
      productsByCategoryQuery.fetchNextPage();
      return;
    }

    productsQuery.fetchNextPage();
  };

  if (isPending && !isManualRefreshing) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="red" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <Pressable
            onPress={() => setSelectedCategory(null)}
            style={[styles.filterTag, !selectedCategory ? styles.filterTagActive : undefined]}
          >
            <Text
              style={[
                styles.filterTagText,
                !selectedCategory ? styles.filterTagTextActive : undefined,
              ]}
            >
              All
            </Text>
          </Pressable>
          {categories.map((category) => {
            const isActive = selectedCategory === category.slug;
            return (
              <Pressable
                key={category.slug}
                onPress={() => setSelectedCategory(category.slug)}
                style={[styles.filterTag, isActive ? styles.filterTagActive : undefined]}
              >
                <Text
                  style={[styles.filterTagText, isActive ? styles.filterTagTextActive : undefined]}
                >
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <FlashList<Product>
        data={data ?? []}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.listContent}
        refreshing={isManualRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={footerComponent}
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
  filtersContainer: {
    paddingTop: 8,
    paddingBottom: 6,
  },
  filters: {
    paddingHorizontal: 10,
    gap: 8,
  },
  filterTag: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
  },
  filterTagActive: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  filterTagText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#333333",
    textTransform: "capitalize",
  },
  filterTagTextActive: {
    color: "#ffffff",
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
