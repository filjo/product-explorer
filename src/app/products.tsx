import { ProductItemCard, RootView } from "@/components";
import { Product } from "@/models/Product";
import { useProductCategories, useProducts, useProductsByCategory } from "@/queries";
import { useFavoriteProductsStore } from "@/store";
import { makeStyles } from "@/utils";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

export const ProductsScreen = ({ navigation }: any) => {
  const styles = useStyles();
  // Query

  const queryClient = useQueryClient();
  const [isManualRefreshing, setIsManualRefreshing] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const isCategorySelected = Boolean(selectedCategory);

  const { data: categories = [] } = useProductCategories();
  const productsQuery = useProducts({ enabled: !isCategorySelected });
  const productsByCategoryQuery = useProductsByCategory(selectedCategory);

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
    const isFavorite = useFavoriteProductsStore.getState().isFavorite(item.id);
    return (
      <ProductItemCard
        item={item}
        isFavorite={isFavorite}
        onPress={(product) => navigation.navigate("ProductDetail", { product })}
      />
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
      <RootView style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="red" />
      </RootView>
    );
  }

  return (
    <RootView>
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
    </RootView>
  );
};

// Styles

const useStyles = makeStyles((theme) => ({
  listContent: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
  },
  filtersContainer: {
    paddingTop: 8,
    paddingBottom: 6,
  },
  filters: {
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
}));
