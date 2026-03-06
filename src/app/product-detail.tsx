import { FavoriteButton } from "@/components";
import { ProductDetailsRouteParams } from "@/navigation/types";
import { useFavoriteProductsStore } from "@/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useLayoutEffect } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProductDetailScreen = () => {
  // Hooks
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

  const { top } = useSafeAreaInsets();

  // Methods
  const handleFavoritePress = React.useCallback(() => {
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  const renderHeaderRight = React.useCallback(() => {
    return (
      <FavoriteButton
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  // Render
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScrollView
          horizontal
          pagingEnabled
          style={{ paddingTop: top + 10 }}
          scrollEnabled={productImages.length > 1}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gallery}
        >
          {productImages.map((uri) => (
            <Image key={uri} source={{ uri }} style={styles.image} contentFit="cover" />
          ))}
        </ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  gallery: {
    width: "100%",
    height: 400,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: "100%",
    backgroundColor: "#F0F0F3",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
  },
  sectionTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
