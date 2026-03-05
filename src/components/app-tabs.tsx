import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import ExploreScreen from "@/app/explore";
import HomeScreen from "@/app/index";

type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabIcon({ source, color }: { source: number; color: string }) {
  return <Image source={source} style={{ width: 20, height: 20, tintColor: color }} />;
}

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backgroundElement,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon source={require("@/assets/images/tabIcons/home.png")} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon source={require("@/assets/images/tabIcons/explore.png")} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
