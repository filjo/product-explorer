import "react-native-gesture-handler";

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </NavigationContainer>
  );
}
