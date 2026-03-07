const formatPrice = (price: number) => {
  return price.toFixed(2);
};

const withCurrency = (price: string, currency: string = "USD") => {
  return `${currency} ${price}`;
};

export const formatPriceWithCurrency = (price: number, currency: string = "USD") => {
  const formattedPrice = formatPrice(price);
  return withCurrency(formattedPrice, currency);
};

export const formatDiscountedPrice = (price: number, discountPercentage: number) => {
  const discountedPrice = price - (price * discountPercentage) / 100;
  return formatPriceWithCurrency(discountedPrice);
};
