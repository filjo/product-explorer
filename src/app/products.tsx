import { ProductItemCard, RootView } from "@/components";
import { Product } from "@/models/Product";
import { useProducts, useProductsByCategory } from "@/queries";
import { useFavoriteProductsStore, useProductCategoriesStore } from "@/store";
import { makeStyles } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useQueryClient } from "@tanstack/react-query";
import React, { useLayoutEffect } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

export const ProductsScreen = ({ navigation }: any) => {
  const styles = useStyles();
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

  const handleCategoriesPress = React.useCallback(() => {
    navigation.navigate("ProductCategories");
  }, [navigation]);

  const renderHeaderRight = React.useCallback(() => {
    const isFilterActive = Boolean(selectedCategory);

    return (
      <Pressable
        style={[styles.headerButton, isFilterActive ? styles.headerButtonActive : undefined]}
        onPress={handleCategoriesPress}
      >
        <MaterialIcons name="tune" size={22} color={isFilterActive ? "#2f8897" : "#111111"} />
      </Pressable>
    );
  }, [handleCategoriesPress, selectedCategory, styles.headerButton, styles.headerButtonActive]);

  // Effects
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Products",
      headerShown: true,
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

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
  headerButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  headerButtonActive: {
    backgroundColor: "#e5f3f5",
  },
}));
