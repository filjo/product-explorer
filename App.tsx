import "react-native-gesture-handler";

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useColorScheme } from "react-native";

import { MainNavigator } from "@/navigation";

export default function App() {
  const colorScheme = useColorScheme();
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <MainNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
