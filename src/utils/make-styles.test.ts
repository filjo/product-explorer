import { getThemeTokens } from "@/design-system";
import { useTheme } from "@/hooks";
import { renderHook } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { makeStyles } from "./make-styles";

jest.mock("@/hooks", () => ({
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("makeStyles", () => {
  beforeEach(() => {
    mockedUseTheme.mockReset();
  });

  it("creates styles using the current theme", () => {
    const theme = getThemeTokens("light");
    mockedUseTheme.mockReturnValue(theme);

    const factory = jest.fn(() => ({
      container: {
        padding: theme.spacing.s4,
      },
    }));
    const createSpy = jest.spyOn(StyleSheet, "create");

    const useStyles = makeStyles(factory);
    const { result } = renderHook(() => useStyles());

    expect(factory).toHaveBeenCalledWith(theme);
    expect(createSpy).toHaveBeenCalledWith({
      container: {
        padding: theme.spacing.s4,
      },
    });
    expect(result.current).toEqual({
      container: {
        padding: theme.spacing.s4,
      },
    });

    createSpy.mockRestore();
  });

  it("memoizes styles until theme changes", () => {
    const lightTheme = getThemeTokens("light");
    const darkTheme = getThemeTokens("dark");
    mockedUseTheme.mockReturnValue(lightTheme);

    const createSpy = jest.spyOn(StyleSheet, "create");
    const useStyles = makeStyles((theme) => ({
      text: {
        color: theme.colors.text,
      },
    }));

    const { result, rerender } = renderHook(() => useStyles());
    const firstStyles = result.current;

    rerender(undefined);
    expect(result.current).toBe(firstStyles);
    expect(createSpy).toHaveBeenCalledTimes(1);

    mockedUseTheme.mockReturnValue(darkTheme);
    rerender(undefined);

    expect(createSpy).toHaveBeenCalledTimes(2);
    expect(result.current).not.toBe(firstStyles);

    createSpy.mockRestore();
  });
});
