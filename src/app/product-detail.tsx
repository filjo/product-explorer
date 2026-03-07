import { FavoriteButton, ProductImagesCarousel, RootView, Text } from "@/components";
import { ProductDetailsRouteParams } from "@/navigation/types";
import { useFavoriteProductsStore } from "@/store";
import { formatPriceWithCurrency, makeStyles } from "@/utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";

export const ProductDetailScreen = () => {
  // Hooks
  const styles = useStyles();
  const navigation = useNavigation();
  const route = useRoute();

  // Store
  const favoriteProducts = useFavoriteProductsStore((state) => state.favoriteProducts);
  const toggleFavorite = useFavoriteProductsStore((state) => state.toggleFavorite);

  const { product } = route.params as ProductDetailsRouteParams["params"];
  const productImages = product.images;

  const isLiked = React.useMemo(
    () => favoriteProducts.some((favoriteProduct) => favoriteProduct.id === product.id),
    [favoriteProducts, product.id],
  );

  // Methods
  const handleFavoritePress = React.useCallback(() => {
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  const renderHeaderRight = React.useCallback(() => {
    return (
      <FavoriteButton
        type="navigation"
        style={Platform.select({
          ios: undefined,
          android: { width: 40, height: 40, borderRadius: 20 },
        })}
        isLiked={isLiked}
        size={24}
        onPress={handleFavoritePress}
      />
    );
  }, [handleFavoritePress, isLiked]);

  // Effects

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  // Render
  return (
    <RootView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProductImagesCarousel images={productImages} />
        <View style={styles.mainContent}>
          <Text variant="title3">{product.title}</Text>
          <Text variant="body" color="text">
            {formatPriceWithCurrency(product.price)}
          </Text>
          <Text variant="subhead" color="textSecondary">
            Description
          </Text>
          <Text variant="body" color="textSecondary">
            {product.description}
          </Text>
        </View>
      </ScrollView>
    </RootView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.backgroundElement,
  },
  scrollView: {
    paddingTop: theme.spacing.s4,
  },
  imageScrollViewContent: {
    paddingTop: theme.spacing.s4,
    width: "100%",
    height: 400,
  },
  mainContent: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.s4,
  },
  image: {
    width: "100%",
  },
  content: {
    padding: 16,
    gap: 12,
  },
}));
