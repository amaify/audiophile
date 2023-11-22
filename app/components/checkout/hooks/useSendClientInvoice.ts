/* eslint-disable consistent-return */
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectCart } from "@/store/cart/cart.reducer";

interface Props {
  email: string;
  clientName: string;
  paymentMethod: "cash" | "online";
}

export default function useSendClientInvoice({ email, clientName, paymentMethod }: Props) {
  const { cart, total, grandTotal } = useSelector(selectCart);

  const sendPaymentReceipt = async () => {
    const emailBody = { email, clientName, cart, total, grandTotal, paymentMethod };
    const request = await fetch("/api/email-service", {
      method: "POST",
      body: JSON.stringify(emailBody)
    });

    const response: { status: "success" | "fail" } = await request.json();
    if (response.status === "success") return response;

    toast.error("Unable to send receipt");
  };

  return {
    sendPaymentReceipt
  };
}
