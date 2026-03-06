import { BottomTabIcon, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { DebugScreen, FavoritesScreen, ProductsScreen } from "@/app";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const HomeIcon: BottomTabIcon | undefined = Platform.select({
  ios: {
    type: "sfSymbol",
    name: "house.fill",
  },
  android: {
    type: "materialSymbol",
    name: "home",
  },
});

const FavoritesIcon: BottomTabIcon | undefined = Platform.select({
  ios: {
    type: "sfSymbol",
    name: "heart.fill",
  },
  android: {
    type: "materialSymbol",
    name: "favorite",
  },
});

const DebugIcon: BottomTabIcon | undefined = Platform.select({
  ios: {
    type: "sfSymbol",
    name: "ladybug.fill",
  },
  android: {
    type: "materialSymbol",
    name: "bug_report",
  },
});

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: FavoritesIcon,
        }}
      />
      <Tab.Screen
        name="Debug"
        component={DebugScreen}
        options={{
          tabBarIcon: DebugIcon,
        }}
      />
    </Tab.Navigator>
  );
};
