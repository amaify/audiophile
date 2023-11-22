import { createContext } from "react";
import dynamic from "next/dynamic";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInputSchema, inputFieldSchema } from "@/components/util/validateInputFields";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import useOnlinePayment from "./hooks/useOnlinePayment";

const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });

interface CheckoutFormContextValues {
  isOpen: boolean;
  isValid: boolean;
  error: FieldErrors<FormInputSchema>;
  paymentMethod: FormInputSchema["paymentMethod"];
  isPending: boolean;
  register: UseFormRegister<FormInputSchema>;
}

export const CheckoutFormContext = createContext<CheckoutFormContextValues | null>(null);

export default function Checkout() {
  const { register, watch, handleSubmit, getValues, reset, formState } = useForm<FormInputSchema>({
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
  const { errors, isValid } = formState;
  const paymentMethod = watch("paymentMethod");

  const { initializePayment, initializeClientInvoice, isPending, isSuccess } = useOnlinePayment({
    formData: getValues(),
    reset
  });

  const onSubmit: SubmitHandler<FormInputSchema> = async () => {
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "online") initializePayment();

    if (paymentMethod === "cash") initializeClientInvoice();
  };

  const contextValue = {
    isOpen: isSuccess,
    isValid,
    isPending,
    error: errors,
    paymentMethod,
    register
  };

  return (
    <CheckoutFormContext.Provider value={contextValue}>
      <form className="relative flex flex-col gap-[3rem] xl:flex-row" onSubmit={handleSubmit(onSubmit)}>
        <CheckoutForm />
        <CheckoutSummary />
        {isSuccess && <PaymentConfirmation />}
      </form>
    </CheckoutFormContext.Provider>
  );
}
