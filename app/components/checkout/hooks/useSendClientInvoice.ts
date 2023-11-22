/* eslint-disable consistent-return */
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { CartItem, selectCart } from "@/store/cart/cart.reducer";
import { FormInputSchema } from "@/components/util/validateInputFields";

interface Props {
  email: string;
  clientName: string;
  paymentMethod: "cash" | "online";
  reset: UseFormReset<FormInputSchema>;
}

interface EmailBody {
  email: string;
  clientName: string;
  cart: CartItem[];
  total: number;
  grandTotal: number;
  paymentMethod: "cash" | "online";
}

async function sendInvoice({ email, clientName, cart, total, grandTotal, paymentMethod }: EmailBody) {
  const emailBody = { email, clientName, cart, total, grandTotal, paymentMethod };
  const request = await fetch("/api/email-service", {
    method: "POST",
    body: JSON.stringify(emailBody)
  });
  const response: { status: "success" | "failed" } = await request.json();
  return response;
}

export default function useSendClientInvoice({ email, clientName, paymentMethod, reset }: Props) {
  const { cart, total, grandTotal } = useSelector(selectCart);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => sendInvoice({ email, clientName, cart, total, grandTotal, paymentMethod }),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSuccess: (data) => {
      if (data.status === "success") reset();
    },
    onError: (error) => toast.error(`Unable to send receipt due to ${error.message}`)
  });

  const initializeClientInvoice = () => mutate();

  return {
    initializeClientInvoice,
    isPending,
    isSuccess
  };
}
