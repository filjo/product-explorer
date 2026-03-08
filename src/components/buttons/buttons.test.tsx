import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Text as RNText } from "react-native";

import { getThemeTokens } from "@/design-system";
import { useTheme } from "@/hooks";
import { useTheme as useThemeDirect } from "@/hooks/use-theme";

import { CloseButton } from "./close-button";
import { FavoriteButton } from "./favorite-button";
import { FilterProductsButton } from "./filter-products-button";
import { NavigationBarItem } from "./navigation-bar-item";
import { PrimaryButton } from "./primary-button";
import { SecondaryButton } from "./secondary-button";

jest.mock("@/hooks", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/hooks/use-theme", () => ({
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;
const mockedUseThemeDirect = useThemeDirect as jest.MockedFunction<typeof useThemeDirect>;

describe("buttons components", () => {
  beforeEach(() => {
    const theme = getThemeTokens("light");
    mockedUseTheme.mockReturnValue(theme);
    mockedUseThemeDirect.mockReturnValue(theme);
  });

  it("renders and handles press for PrimaryButton", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<PrimaryButton title="Save" onPress={onPress} />);

    fireEvent.press(getByTestId("primary-button"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders and handles press for SecondaryButton", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<SecondaryButton title="Cancel" onPress={onPress} />);

    fireEvent.press(getByTestId("secondary-button"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders CloseButton icon and triggers callback", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<CloseButton onPress={onPress} />);

    fireEvent.press(getByTestId("close-button"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders active filter icon color when filter is enabled", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(<FilterProductsButton isFilterActive onPress={onPress} />);

    const icon = getByTestId("filter-products-button-icon");
    expect(icon.props.color).toBe(getThemeTokens("light").colors.brand);
  });

  it("renders and handles press for FavoriteButton card variant", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <FavoriteButton type="card" isLiked={false} onPress={onPress} />,
    );

    fireEvent.press(getByTestId("favorite-button-card"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("handles press for NavigationBarItem", () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <NavigationBarItem testID="navigation-bar-item" onPress={onPress}>
        <RNText>Item</RNText>
      </NavigationBarItem>,
    );

    fireEvent.press(getByTestId("navigation-bar-item"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
