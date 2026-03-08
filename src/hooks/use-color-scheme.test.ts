import { useColorScheme as useReactNativeColorScheme } from "react-native";

import { useColorScheme } from "./use-color-scheme";

describe("useColorScheme", () => {
  it("re-exports react-native useColorScheme", () => {
    expect(useColorScheme).toBe(useReactNativeColorScheme);
  });
});
