import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ProductCategoriesScreen } from "@/app/product-categories";
import { ProductDetailScreen } from "@/app/product-detail";
import { useProductCategories } from "@/queries";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  // Queries
  useProductCategories();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: "Product details",
          headerTransparent: true,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="ProductCategories"
        component={ProductCategoriesScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          title: "Filter by category",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
