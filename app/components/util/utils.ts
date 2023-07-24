import { CartItem } from "../../store/Types/Cart";
import { FormInput } from "../../Types/FormInput";

interface NavigationLInks {
  name: string;
  slug: string;
}

export const navLinks: NavigationLInks[] = [
  { name: "home", slug: "/" },
  { name: "headphones", slug: "/headphones" },
  { name: "speakers", slug: "/speakers" },
  { name: "earphones", slug: "/earphones" }
];

export const formatPrice = (productPrice: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(productPrice);

export const itemPriceSum = (cartItems: CartItem[]) => cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const validatePayButton = (value: FormInput, paymentMethod: string) => {
  let isDisabled = false;
  if (paymentMethod === "online") {
    isDisabled = Object.values(value).every((value) => value !== "");
    return isDisabled;
  }

  if (paymentMethod === "cash") {
    const filteredValue = Object.keys(value)
      .filter((value) => value !== "cardNumber" && value !== "cardPin")
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: value[key as keyof FormInput]
        });
      }, {});

    isDisabled = Object.values(filteredValue).every((value) => value !== "");
    return isDisabled;
  }

  return isDisabled;
};
