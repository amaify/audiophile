import React, { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInputSchema, inputFieldSchema } from "@/components/util/validateInputFields";
import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface CheckoutFormProps {
  isOpen: boolean;
  isValid: boolean;
  error: FieldErrors<FormInputSchema>;
  paymentMethod: FormInputSchema["paymentMethod"];
  register: UseFormRegister<FormInputSchema>;
  setConfirmation: (value: boolean) => void;
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
  const { register, watch, handleSubmit, formState } = useForm<FormInputSchema>({
    defaultValues: {
      name: "",
      address: "",
      cardNumber: "",
      cardPin: "",
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
  const [confirmation, setConfirmation] = useState(false);
  const paymentMethod = watch("paymentMethod");

  const onSubmit: SubmitHandler<FormInputSchema> = (data) => {
    const formData =
      paymentMethod === "online"
        ? data
        : Object.keys(data)
            .filter((formKeys) => formKeys !== "cardNumber" && formKeys !== "cardPin")
            .reduce((formObj, keys) => Object.assign(formObj, { [keys]: data[keys as keyof FormInputSchema] }), {});

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(formData));
  };

  return (
    <CheckoutFormContext.Provider
      value={{ isOpen: confirmation, isValid, error: errors, paymentMethod, register, setConfirmation }}
    >
      <section>
        <Meta pageTitle="Checkout" />
        <SubPageHeader />
        <div className="bg-grey pt-[1.6rem] pb-[14.1rem] md:pt-[7.9rem] [ layout-padding ]">
          <BackButton />
          <form className="relative flex flex-col gap-[3rem] xl:flex-row" onSubmit={handleSubmit(onSubmit)}>
            <CheckoutForm />
            <CheckoutSummary />
            {confirmation && <PaymentConfirmation />}
          </form>
        </div>
        <Footer />
      </section>
    </CheckoutFormContext.Provider>
  );
}
