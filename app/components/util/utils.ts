import { FormInput } from "../../Types/FormInput";

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
