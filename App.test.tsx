import React from "react";
import { render } from "@testing-library/react-native";

import FavoritesScreen from "@/app/explore";
import ProductsScreen from "@/app/index";

describe("screens", () => {
  it("renders Products screen label", () => {
    const { getByText } = render(<ProductsScreen />);

    expect(getByText("Products")).toBeTruthy();
  });

  it("renders Favorites screen label", () => {
    const { getByText } = render(<FavoritesScreen />);

    expect(getByText("Favorites")).toBeTruthy();
  });
});
