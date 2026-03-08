import { ProductItemCard, RootView } from "@/components";
import { useRouter } from "@/hooks";
import { Product } from "@/models/Product";
import { useProducts, useProductsByCategory } from "@/queries";
import { useFavoriteProductsStore, useProductCategoriesStore } from "@/store";
import { makeStyles } from "@/utils";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export const ProductsScreen = () => {
  const styles = useStyles();
  const { navigate } = useRouter();
  // Query

  const queryClient = useQueryClient();
  const [isManualRefreshing, setIsManualRefreshing] = React.useState(false);
  const selectedCategory = useProductCategoriesStore((state) => state.selectedCategorySlug);
  const isCategorySelected = Boolean(selectedCategory);

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
        queryClient.resetQueries({ queryKey: ["products", "by", "category"] }),
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
        testID="products-product-card"
        onPress={(product) => navigate("ProductDetail", { product })}
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
    <RootView noSafeArea>
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
}));
