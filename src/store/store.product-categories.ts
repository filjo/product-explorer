import { ProductCategory } from "@/models";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./mmkv";

type State = {
  categories: ProductCategory[];
};

type Actions = {
  setCategories: (categories: ProductCategory[]) => void;
  clearCategories: () => void;
};

type Store = State & Actions;

export const useProductCategoriesStore = create<Store>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: "product-categories-store",
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        categories: state.categories,
      }),
    },
  ),
);
