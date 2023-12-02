import { createContext } from "react";
import dynamic from "next/dynamic";
import { z } from "zod";
import { type SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useOnlinePayment from "./hooks/useOnlinePayment";

const CheckoutForm = dynamic(import("@/components/checkout/CheckoutForm"), { ssr: false });
const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberFormat = /^[0-9]*$/;

const inputFieldSchema = z.object({
  name: z.string().min(1, "Cannot be emtpy").min(2, "Name is required"),
  emailAddress: z.string().min(1, "Email is required").email("Email not valid").regex(mailFormat, "Email not valid"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip Code is required").min(4, "Min. 4 characters"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required").min(4, "Min. 4 characters"),
  paymentMethod: z.literal("online").or(z.literal("cash")),
  phoneNumber: z.string().min(4, "Min. 4 characters").regex(numberFormat, "Must be a number")
});

export type FormInputSchema = z.infer<typeof inputFieldSchema>;

interface CheckoutFormContextValues {
  isOpen: boolean;
  isValid: boolean;
  error: FieldErrors<FormInputSchema>;
  paymentMethod: FormInputSchema["paymentMethod"];
  isPending: boolean;
  register: UseFormRegister<FormInputSchema>;
}

export const CheckoutFormContext = createContext<CheckoutFormContextValues | null>(null);

export default function CheckoutFormLayout() {
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
