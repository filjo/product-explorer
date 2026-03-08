import { formatDiscountedPrice, formatPriceWithCurrency } from "./price";

describe("price utils", () => {
  describe("formatPriceWithCurrency", () => {
    it("formats price with default USD currency", () => {
      expect(formatPriceWithCurrency(12)).toBe("USD 12.00");
    });

    it("formats price with provided currency", () => {
      expect(formatPriceWithCurrency(12.5, "EUR")).toBe("EUR 12.50");
    });
  });

  describe("formatDiscountedPrice", () => {
    it("applies discount percentage and returns formatted price", () => {
      expect(formatDiscountedPrice(100, 25)).toBe("USD 75.00");
    });

    it("rounds discounted price to two decimals", () => {
      expect(formatDiscountedPrice(19.99, 15)).toBe("USD 16.99");
    });
  });
});
