import { BottomTabIcon, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { DebugScreen, FavoritesScreen, ProductsScreen } from "@/app";
import { FilterProductsButton } from "@/components";
import { useRouter } from "@/hooks";
import { RootTabParamList } from "@/navigation/types";
import { useProductCategoriesStore } from "@/store";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator<RootTabParamList>();

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

const FilterProductsHeaderButton = ({ isFilterActive }: { isFilterActive: boolean }) => {
  const { navigate } = useRouter();

  const handlePress = React.useCallback(() => {
    navigate("ProductCategories");
  }, [navigate]);

  return <FilterProductsButton isFilterActive={isFilterActive} onPress={handlePress} />;
};

export const TabNavigator = () => {
  const selectedCategory = useProductCategoriesStore((state) => state.selectedCategorySlug);
  const isFilterActive = Boolean(selectedCategory);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={() => ({
          title: "Products",
          headerTitleAlign: "left",
          headerShown: true,
          tabBarIcon: HomeIcon,
          tabBarButtonTestID: "tab-products",
          headerShadowVisible: false,
          headerRight: () => <FilterProductsHeaderButton isFilterActive={isFilterActive} />,
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: FavoritesIcon,
          title: "Favorites",
          tabBarButtonTestID: "tab-favorites",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="Debug"
        component={DebugScreen}
        options={{
          tabBarIcon: DebugIcon,
          tabBarButtonTestID: "tab-debug",
        }}
      />
    </Tab.Navigator>
  );
};
