import React from "react";
import { render } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FavoritesScreen, ProductsScreen } from "@/app";
import { ThemeProvider } from "@/contexts";
import { useRouter } from "@/hooks";
import { useProducts } from "@/queries/useProducts";

jest.mock("@/hooks", () => ({
  ...jest.requireActual("@/hooks"),
  useRouter: jest.fn(),
}));

jest.mock("@/queries/useProducts", () => ({
  useProducts: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </ThemeProvider>,
  );
};

describe("screens", () => {
  beforeEach(() => {
    mockedUseRouter.mockReset();
    mockedUseProducts.mockReset();
    mockedUseRouter.mockReturnValue({
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(() => true),
    });
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
      isPending: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      isRefetching: false,
    } as unknown as ReturnType<typeof useProducts>);

    const { getByText } = renderWithQueryClient(<ProductsScreen />);

    expect(getByText("Phone")).toBeTruthy();
  });

  it("renders empty favorites state", () => {
    const { getByText } = render(
      <ThemeProvider>
        <FavoritesScreen />
      </ThemeProvider>,
    );

    expect(getByText("No favorites yet")).toBeTruthy();
  });
});
