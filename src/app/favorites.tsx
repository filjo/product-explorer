import { EmptyListView, ProductItemCard, RootView, Text } from "@/components";
import { useRouter } from "@/hooks";
import { Product } from "@/models";
import { useFavoriteProductsStore } from "@/store";
import { makeStyles } from "@/utils";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

type FavoriteSectionListItem =
  | {
      type: "header";
      category: string;
      key: string;
    }
  | {
      type: "products-row";
      category: string;
      key: string;
      left: Product;
      right?: Product;
    };

export const FavoritesScreen = () => {
  // Hooks
  const styles = useStyles();
  const { navigate } = useRouter();

  // Store
  const favoriteProducts = useFavoriteProductsStore((state) => state.favoriteProducts);

  const sectionedItems = React.useMemo<FavoriteSectionListItem[]>(() => {
    if (!favoriteProducts.length) {
      return [];
    }

    const groupedByCategory = favoriteProducts.reduce<Record<string, Product[]>>((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }

      acc[product.category].push(product);
      return acc;
    }, {});

    const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => a.localeCompare(b));

    const items: FavoriteSectionListItem[] = [];
    sortedCategories.forEach((category) => {
      items.push({
        type: "header",
        category,
        key: `header-${category}`,
      });

      const categoryProducts = groupedByCategory[category];
      for (let index = 0; index < categoryProducts.length; index += 2) {
        const left = categoryProducts[index];
        const right = categoryProducts[index + 1];
        items.push({
          type: "products-row",
          category,
          key: `row-${category}-${left.id}-${right?.id ?? "empty"}`,
          left,
          right,
        });
      }
    });

    return items;
  }, [favoriteProducts]);

  const onPressProduct = React.useCallback(
    (product: Product) => {
      navigate("ProductDetail", { product });
    },
    [navigate],
  );

  const renderItem: ListRenderItem<FavoriteSectionListItem> = React.useCallback(
    ({ item }) => {
      if (item.type === "header") {
        return (
          <View style={styles.sectionHeader}>
            <Text variant="title3" style={styles.sectionTitle}>
              {item.category}
            </Text>
          </View>
        );
      }

      const leftIsFavorite = useFavoriteProductsStore.getState().isFavorite(item.left.id);
      const rightIsFavorite = item.right
        ? useFavoriteProductsStore.getState().isFavorite(item.right.id)
        : false;

      return (
        <View style={styles.row}>
          <View style={styles.cardContainer}>
            <ProductItemCard
              item={item.left}
              isFavorite={leftIsFavorite}
              onPress={onPressProduct}
            />
          </View>
          {item.right ? (
            <View style={styles.cardContainer}>
              <ProductItemCard
                item={item.right}
                isFavorite={rightIsFavorite}
                onPress={onPressProduct}
              />
            </View>
          ) : (
            <View style={styles.cardContainer} />
          )}
        </View>
      );
    },
    [onPressProduct, styles.cardContainer, styles.row, styles.sectionHeader, styles.sectionTitle],
  );

  // Render
  if (!favoriteProducts.length) {
    return (
      <RootView noSafeArea>
        <EmptyListView
          title="No favorites yet"
          description="Like products to see them grouped by category here."
        />
      </RootView>
    );
  }

  return (
    <RootView noSafeArea>
      <FlashList<FavoriteSectionListItem>
        data={sectionedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
      />
    </RootView>
  );
};

const useStyles = makeStyles((theme) => ({
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  sectionHeader: {
    marginBottom: theme.spacing.s2,
    paddingHorizontal: 6,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
  },
  cardContainer: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.s5,
    gap: theme.spacing.s2,
  },
}));
