import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { DebugScreen, FavoritesScreen, ProductsScreen } from "@/app";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Debug" component={DebugScreen} />
    </Tab.Navigator>
  );
};
