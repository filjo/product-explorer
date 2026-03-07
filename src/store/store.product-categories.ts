import { ProductCategory } from "@/models";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./mmkv";

type State = {
  categories: ProductCategory[];
  selectedCategorySlug: string | null;
};

type Actions = {
  setCategories: (categories: ProductCategory[]) => void;
  setSelectedCategorySlug: (categorySlug: string | null) => void;
  clearSelectedCategory: () => void;
  clearCategories: () => void;
};

type Store = State & Actions;

export const useProductCategoriesStore = create<Store>()(
  persist(
    (set) => ({
      categories: [],
      selectedCategorySlug: null,
      setCategories: (categories) => set({ categories }),
      setSelectedCategorySlug: (selectedCategorySlug) => set({ selectedCategorySlug }),
      clearSelectedCategory: () => set({ selectedCategorySlug: null }),
      clearCategories: () => set({ categories: [] }),
    }),
    {
      name: "product-categories-store",
      version: 1,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        categories: state.categories,
        selectedCategorySlug: state.selectedCategorySlug,
      }),
    },
  ),
);
