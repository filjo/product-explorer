import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";

import { Product } from "../models/Product";
import { formatDiscountedPrice, formatPriceWithCurrency, makeStyles } from "../utils";

import { FavoriteButton } from "./buttons/favorite-button";
import { RatingView } from "./rating-view";
import { Text } from "./text";

type ProductItemCardProps = {
  item: Product;
  isFavorite: boolean;
  onPress: (product: Product) => void;
  testID?: string;
};

export const ProductItemCard = ({ item, isFavorite, onPress, testID }: ProductItemCardProps) => {
  const styles = useStyles();

  return (
    <Pressable testID={testID} onPress={() => onPress(item)} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} contentFit="contain" />
        <FavoriteButton type="card" disabled={true} isLiked={isFavorite} />
      </View>

      <View style={styles.content}>
        <Text variant="callout" numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <RatingView rating={item.rating} reviewCount={item.reviews.length} />

        {item.discountPercentage > 0 ? (
          <View style={styles.discountBlock}>
            <Text variant="callout" style={styles.price}>
              {formatDiscountedPrice(item.price, item.discountPercentage)}
            </Text>
            <View style={styles.discountMetaRow}>
              <Text variant="footnote" color="textSecondary" style={styles.originalPrice}>
                {formatPriceWithCurrency(item.price)}
              </Text>
              <Text variant="footnote" style={styles.discountTag}>
                -{Math.round(item.discountPercentage)}%
              </Text>
            </View>
          </View>
        ) : (
          <Text variant="callout" style={styles.price}>
            {formatPriceWithCurrency(item.price)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    margin: 6,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundElement,
    overflow: "hidden",
    padding: 12,
  },
  image: {
    flex: 1,
  },
  content: {
    paddingTop: 8,
    gap: 2,
  },
  title: {
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
    fontWeight: "700",
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
  discountTag: {
    color: "#0a8f45",
    fontWeight: "700",
  },
}));
