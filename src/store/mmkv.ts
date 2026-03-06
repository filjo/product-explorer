/**
 * Wrapper for MMKV storage for Zustand
 * See: https://github.com/mrousavy/react-native-mmkv/blob/main/docs/WRAPPER_ZUSTAND_PERSIST_MIDDLEWARE.md
 */

import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = createMMKV({
  id: "product-explorer-local-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};
