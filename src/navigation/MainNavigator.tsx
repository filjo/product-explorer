import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ProductDetailScreen } from "@/app/product-detail";
import { TabNavigator } from "./TabNavigator";

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
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
    </Stack.Navigator>
  );
};
