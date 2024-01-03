import { useContext } from "react";
import { CheckoutFormContext } from "../components";

export default function useCheckoutForm() {
  const checkoutFormValues = useContext(CheckoutFormContext);

  if (!checkoutFormValues) {
    throw new Error("useCheckoutForm has to be used within <CurrentUserContext.Provider>");
  }

  return checkoutFormValues;
}
