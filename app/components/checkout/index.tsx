import React, { createContext, useState } from "react";
import dynamic from "next/dynamic";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors, FormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInputSchema, inputFieldSchema } from "@/components/util/validateInputFields";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import useStripePayment from "./hooks/useStripePayment";
import useSendClientInvoice from "./hooks/useSendClientInvoice";

const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });

interface CheckoutFormContextValues {
  isOpen: boolean;
  isValid: boolean;
  error: FieldErrors<FormInputSchema>;
  paymentMethod: FormInputSchema["paymentMethod"];
  formState: FormState<FormInputSchema>;
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

  const { submitPayment } = useStripePayment({ data: getValues() });
  const { sendPaymentReceipt } = useSendClientInvoice({ email, clientName, paymentMethod });

  const [confirmation, setConfirmation] = useState(false);

  const sendPaymentInvoice = async () => {
    const paymentReceipt = await sendPaymentReceipt();

    if (paymentReceipt?.status === "success") {
      setConfirmation(true);
      reset();
    }
  };

  const onSubmit: SubmitHandler<FormInputSchema> = async () => {
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "online") {
      const paymentIntent = await submitPayment();
      if (paymentIntent?.status === "succeeded") sendPaymentInvoice();
    }

    if (paymentMethod === "cash") sendPaymentInvoice();
  };

  const contextValue = {
    isOpen: confirmation,
    isValid,
    error: errors,
    paymentMethod,
    formState,
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
