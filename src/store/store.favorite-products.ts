import { Product } from "@/models/Product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./mmkv";

type State = {
  favoriteProducts: Product[];
};

type Actions = {
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
};

type Store = State & Actions;

export const useFavoriteProductsStore = create<Store>()(
  persist(
    (set, get) => ({
      favoriteProducts: [],
      addFavorite: (product) =>
        set((state) => {
          const alreadyFavorite = state.favoriteProducts.some(
            (favorite) => favorite.id === product.id,
          );

          if (alreadyFavorite) {
            return state;
          }

          return {
            favoriteProducts: [...state.favoriteProducts, product],
          };
        }),
      removeFavorite: (productId) =>
        set((state) => ({
          favoriteProducts: state.favoriteProducts.filter((product) => product.id !== productId),
        })),
      toggleFavorite: (product) => {
        const exists = get().favoriteProducts.some((favorite) => favorite.id === product.id);

        if (exists) {
          get().removeFavorite(product.id);
          return;
        }

        get().addFavorite(product);
      },
      isFavorite: (productId) => get().favoriteProducts.some((product) => product.id === productId),
      clearFavorites: () => set({ favoriteProducts: [] }),
    }),
    {
      name: "favorite-products-store",
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        favoriteProducts: state.favoriteProducts,
      }),
    },
  ),
);
