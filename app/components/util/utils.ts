/* eslint-disable no-shadow */
import { CartItem } from "../../store/Types/Cart";
import { FormInput } from "../../Types/FormInput";

interface NavigationLInks {
  name: string;
  href: string;
}

export const navLinks: NavigationLInks[] = [
  { name: "home", href: "/" },
  { name: "headphones", href: "/headphones" },
  { name: "speakers", href: "/speakers" },
  { name: "earphones", href: "/earphones" }
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
