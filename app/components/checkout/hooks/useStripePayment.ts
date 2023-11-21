import { useSelector } from "react-redux";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardNumberElement } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { sumAllPrice } from "@/store/util/util";
import { selectCart } from "@/store/cart/cart.reducer";
import { FormInputSchema } from "../../util/validateInputFields";

export default function useStripePayment({ data }: { data: FormInputSchema }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useSelector(selectCart);
  const totalProductPrice = sumAllPrice(cart) + 35;
  const toastDuration = 15000;

  const submitPayment = async () => {
    try {
      const request = await fetch("/api/stripe-checkout", {
        method: "POST",
        body: JSON.stringify({ amount: `${totalProductPrice}` })
      });

      const response: { data: string } = await request.json();
      const clientSecret = response.data;

      if (stripe && elements) {
        const billingDetails = { name: data.name, email: data.emailAddress };
        const cardElement = elements.getElement("cardNumber");

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement as StripeCardNumberElement,
            billing_details: billingDetails
          }
        });

        if (error) {
          toast.error(`${error.message}`, { duration: toastDuration });
          return;
        }

        // eslint-disable-next-line consistent-return
        return paymentIntent;
      }
    } catch (error: any) {
      toast.error(`${error.message}`, { duration: toastDuration });
    }
  };

  return {
    submitPayment
  };
}
