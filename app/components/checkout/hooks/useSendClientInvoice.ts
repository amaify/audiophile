import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { CartItem, selectCart } from "@/store/cart/CartReducer";
import { FormInputSchema } from "..";

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

  const response: { status: "success" | "failed"; errMessage: string } = await request.json();
  if (request.ok) return response;

  throw new Error(response.errMessage);
}

export default function useSendClientInvoice({ email, clientName, paymentMethod, reset }: Props) {
  const { cart, total, grandTotal } = useSelector(selectCart);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => sendInvoice({ email, clientName, cart, total, grandTotal, paymentMethod }),
    onSuccess: (response) => response.status === "success" && reset(),
    onError: (error) => toast.error(`Unable to send receipt due to ${error.message}`, { duration: 7500 })
  });

  const initializeClientInvoice = () => mutate();

  return {
    initializeClientInvoice,
    isPending,
    isSuccess
  };
}
