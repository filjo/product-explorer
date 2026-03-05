import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import FavoritesScreen from "@/app/explore";
import ProductsScreen from "@/app/index";

type RootTabParamList = {
  Products: undefined;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
