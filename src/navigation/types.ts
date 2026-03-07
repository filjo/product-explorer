import { Product } from "@/models";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";

/**
 * Screens names for the application
 */
export type RootTabParamList = {
  Products: undefined;
  Favorites: undefined;
  Debug: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<RootTabParamList>;
  ProductDetail: {
    product: Product;
  };
  ProductCategories: undefined;
};

/**
 * Screen with params that are passed to the screen
 */
export type ProductDetailsRouteParams = RouteProp<RootStackParamList, "ProductDetail"> & {
  product: Product;
};
