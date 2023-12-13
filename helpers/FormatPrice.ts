export const formatPrice = (productPrice: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(productPrice);
