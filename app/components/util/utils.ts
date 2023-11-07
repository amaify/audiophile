import { FormInput } from "../../Types/FormInput";

interface NavigationLInks {
  name: "home" | "headphones" | "speakers" | "earphones";
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

export const validatePayButton = (value: FormInput, paymentMethod: string) => {
  let isDisabled = false;
  if (paymentMethod === "online") {
    isDisabled = Object.values(value).every((inputValue) => inputValue !== "");
    return isDisabled;
  }

  if (paymentMethod === "cash") {
    const filteredValue = Object.keys(value)
      .filter((cardValue) => cardValue !== "cardNumber" && cardValue !== "cardPin")
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: value[key as keyof FormInput]
        });
      }, {});

    isDisabled = Object.values(filteredValue).every((filtered) => filtered !== "");
    return isDisabled;
  }

  return isDisabled;
};
