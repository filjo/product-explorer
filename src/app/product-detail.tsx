import { ProductDetailsRouteParams } from "@/navigation/types";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProductDetailScreen = () => {
  const route = useRoute();
  const { product } = route.params as ProductDetailsRouteParams["params"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#eee",
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
