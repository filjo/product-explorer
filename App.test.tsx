import React from "react";
import { render } from "@testing-library/react-native";

import { FavoritesScreen, ProductsScreen } from "@/app";
import { useProducts } from "@/queries/useProducts";

jest.mock("@/queries/useProducts", () => ({
  useProducts: jest.fn(),
}));

const mockedUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

describe("screens", () => {
  beforeEach(() => {
    mockedUseProducts.mockReset();
  });

  it("renders products list item", () => {
    mockedUseProducts.mockReturnValue({
      data: [
        {
          id: 1,
          title: "Phone",
          description: "Phone description",
          category: "electronics",
          price: 999,
          discountPercentage: 0,
          rating: 4.9,
          stock: 10,
          tags: [],
          brand: "Brand",
          sku: "SKU-1",
          weight: 1,
          dimensions: { width: 1, height: 1, depth: 1 },
          warrantyInformation: "1 year",
          shippingInformation: "Ships tomorrow",
          availabilityStatus: "In Stock",
          reviews: [],
          returnPolicy: "30 days",
          minimumOrderQuantity: 1,
          meta: {
            createdAt: "2026-01-01",
            updatedAt: "2026-01-01",
            barcode: "123",
            qrCode: "123",
          },
          images: [],
          thumbnail: "https://example.com/thumb.png",
        },
      ],
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    } as unknown as ReturnType<typeof useProducts>);

    const { getByText } = render(<ProductsScreen navigation={{ navigate: jest.fn() }} />);

    expect(getByText("Phone")).toBeTruthy();
  });

  it("renders Favorites screen label", () => {
    const { getByText } = render(<FavoritesScreen />);

    expect(getByText("Favorites")).toBeTruthy();
  });
});
