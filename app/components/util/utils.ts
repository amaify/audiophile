export const formatPrice = (productPrice: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(productPrice);
