/* eslint-disable no-console */
import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardNumberElement } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { FormInputSchema, inputFieldSchema } from "@/components/util/validateInputFields";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { selectCart } from "@/store/reducers/cartReducer";
import { sumAllPrice } from "@/store/util/util";

const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });

interface CheckoutFormProps {
  isOpen: boolean;
  isValid: boolean;
  errorMessage: string | undefined;
  error: FieldErrors<FormInputSchema>;
  paymentMethod: FormInputSchema["paymentMethod"];
  register: UseFormRegister<FormInputSchema>;
  setConfirmation: (value: boolean) => void;
}

interface PaymentIntentResponse {
  data: string;
}

export const CheckoutFormContext = createContext<CheckoutFormProps | null>(null);

export const useCheckoutForm = () => {
  const checkoutFormValues = useContext(CheckoutFormContext);

  if (!checkoutFormValues) {
    throw new Error("useCheckoutForm has to be used within <CurrentUserContext.Provider>");
  }

  return checkoutFormValues;
};
export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useSelector(selectCart);
  const totalProductPrice = sumAllPrice(cart) + 35;

  const { register, watch, handleSubmit, formState } = useForm<FormInputSchema>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      emailAddress: "",
      phoneNumber: "",
      zipCode: "",
      paymentMethod: "online"
    },
    resolver: zodResolver(inputFieldSchema),
    mode: "onTouched"
  });
  const { errors, isValid, isSubmitting } = formState;
  const [confirmation, setConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const paymentMethod = watch("paymentMethod");

  console.log(isSubmitting);

  const onSubmit: SubmitHandler<FormInputSchema> = async (data) => {
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    const billingDetails = { name: data.name, email: data.emailAddress };

    try {
      const request = await fetch("/api/stripe-checkout", {
        method: "POST",
        body: JSON.stringify({ amount: `${totalProductPrice}` })
      });

      const response: PaymentIntentResponse = await request.json();
      const clientSecret = response.data;

      if (stripe && elements) {
        const cardElement = elements.getElement("cardNumber");

        // const { paymentMethod: stripePaymentMethod, error } = await stripe.createPaymentMethod({
        //   type: "card",
        //   card: elements?.getElement(CardNumberElement) as any,
        //   billing_details: billingDetails
        // });

        console.log(cardElement);
        console.log(elements.getElement("cardNumber"));

        // if (!error) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement as StripeCardNumberElement,
            billing_details: billingDetails
          }
        });

        if (error) {
          setErrorMessage(error.message);
          toast.error(`${error.message}`, { duration: 10000 });
          return;
        }

        console.log(paymentIntent);
        // }
      }
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line no-alert
    // alert(JSON.stringify(formData));
  };

  const contextValue = {
    isOpen: confirmation,
    isValid,
    error: errors,
    errorMessage,
    paymentMethod,
    register,
    setConfirmation
  };

  return (
    <CheckoutFormContext.Provider value={contextValue}>
      <form className="relative flex flex-col gap-[3rem] xl:flex-row" onSubmit={handleSubmit(onSubmit)}>
        <CheckoutForm />
        <CheckoutSummary />
        {confirmation && <PaymentConfirmation />}
      </form>
    </CheckoutFormContext.Provider>
  );
}
