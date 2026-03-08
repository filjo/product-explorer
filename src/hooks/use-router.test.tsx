import { renderHook } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

import { useRouter } from "./use-router";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

const mockedUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>;

describe("useRouter", () => {
  it("delegates navigate with params", () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(),
    };
    mockedUseNavigation.mockReturnValue(navigation as never);

    const { result } = renderHook(() => useRouter());
    result.current.navigate("ProductDetail", {
      product: {
        id: 1,
        title: "Phone",
        description: "Description",
        category: "electronics",
        price: 1000,
        discountPercentage: 5,
        rating: 4.8,
        stock: 3,
        tags: [],
        brand: "Brand",
        sku: "SKU-1",
        weight: 1,
        dimensions: { width: 1, height: 1, depth: 1 },
        warrantyInformation: "1 year",
        shippingInformation: "Fast shipping",
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
    });

    expect(navigation.navigate).toHaveBeenCalledWith("ProductDetail", expect.any(Object));
  });

  it("delegates goBack and canGoBack", () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(() => true),
    };
    mockedUseNavigation.mockReturnValue(navigation as never);

    const { result } = renderHook(() => useRouter());

    result.current.goBack();
    const canGoBack = result.current.canGoBack();

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
    expect(navigation.canGoBack).toHaveBeenCalledTimes(1);
    expect(canGoBack).toBe(true);
  });
});
