import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInputSchema, inputFieldSchema } from "@/components/util/validateInputFields";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import useSendClientInvoice from "./hooks/useSendClientInvoice";
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
  setConfirmation: (value: boolean) => void;
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
  const { emailAddress: email, name: clientName } = getValues();
  const paymentMethod = watch("paymentMethod");
  const [confirmation, setConfirmation] = useState(false);

  const { isPending: emailIsPending, initializeClientInvoice } = useSendClientInvoice({
    email,
    clientName,
    paymentMethod,
    reset,
    setConfirmation
  });
  const { initializePayment, isPending } = useOnlinePayment({ formData: getValues(), reset, setConfirmation });

  const onSubmit: SubmitHandler<FormInputSchema> = async () => {
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "online") initializePayment();

    if (paymentMethod === "cash") initializeClientInvoice();
  };

  const pendingState = isPending || emailIsPending;

  const contextValue = {
    isOpen: confirmation,
    isValid,
    isPending: pendingState,
    error: errors,
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
