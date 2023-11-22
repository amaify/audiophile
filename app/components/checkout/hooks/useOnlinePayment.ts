import { useSelector } from "react-redux";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardNumberElement } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReset } from "react-hook-form";
import { selectCart } from "@/store/cart/cart.reducer";
import { sumAllPrice } from "@/store/cart/cart.util";
import { FormInputSchema } from "../../util/validateInputFields";
import useSendClientInvoice from "./useSendClientInvoice";

interface Props {
  formData: FormInputSchema;
  reset: UseFormReset<FormInputSchema>;
  setConfirmation: (value: boolean) => void;
}

async function getClientSecret(amount: string) {
  const request = await fetch("/api/stripe-checkout", {
    method: "POST",
    body: JSON.stringify({ amount })
  });
  const response: { data: string } = await request.json();
  return response;
}

export default function useOnlinePayment({ formData, reset, setConfirmation }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useSelector(selectCart);
  const totalProductPrice = sumAllPrice(cart) + 35;
  const toastDuration = 15000;
  const { emailAddress: email, name: clientName, paymentMethod } = formData;

  const { mutate, isPending } = useMutation({
    mutationFn: () => getClientSecret(`${totalProductPrice}`),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSuccess: (clientSecret) => submitPayment(clientSecret.data)
  });
  const { initializeClientInvoice, isPending: isEmailPending } = useSendClientInvoice({
    email,
    clientName,
    paymentMethod,
    reset,
    setConfirmation
  });
  const initializePayment = () => mutate();

  async function submitPayment(clientSecret: string) {
    try {
      if (stripe && elements) {
        const billingDetails = { name: formData.name, email: formData.emailAddress };
        const cardElement = elements.getElement("cardNumber");

        const { error: paymentIntentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement as StripeCardNumberElement,
            billing_details: billingDetails
          }
        });

        if (paymentIntentError) {
          toast.error(`${paymentIntentError.message}`, { duration: toastDuration });
          return;
        }

        if (paymentIntent.status === "succeeded") initializeClientInvoice();
      }
    } catch (err: any) {
      toast.error(`${err.message}`, { duration: toastDuration });
    }
  }

  const isAmountPending = isEmailPending || isPending;

  return {
    initializePayment,
    isPending: isAmountPending
  };
}