import React, { useState } from "react";
import dynamic from "next/dynamic";
import { validatePayButton } from "@/components/util/utils";
import { validateInputField } from "@/components/util/validateInputFields";
import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import type { FormInput } from "../../Types/FormInput";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

const Checkout = () => {
  // if (cart.length === 0) router.push("/");

  const [inputValue, setInputValue] = useState<FormInput>({
    name: "",
    address: "",
    cardNumber: "",
    cardPin: "",
    city: "",
    country: "",
    emailAddress: "",
    phoneNumber: "",
    zipCode: ""
  });
  const [confirmation, setConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online");
  const [error, setError] = useState<Record<string, string>>({});

  const isDisabled = validatePayButton(inputValue, paymentMethod);
  const isError = Object.values(error).some((errorValue) => errorValue);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setInputValue((prevState) => ({ ...prevState, [name]: value }));

    if (isError) {
      const validationMsg = validateInputField(value, type);

      setError((prevState) => ({
        ...prevState,
        [name]: validationMsg
      }));
    }
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const validationMsg = validateInputField(value, type);

    setError((prevState) => ({
      ...prevState,
      [name]: validationMsg
    }));
  };

  return (
    <section>
      <Meta pageTitle="Checkout" />
      <SubPageHeader />
      <div className="bg-grey pt-[1.6rem] pb-[14.1rem] md:pt-[7.9rem] [ layout-padding ]">
        <BackButton />

        <div className="relative flex flex-col gap-[3rem] xl:flex-row">
          <CheckoutForm
            error={error}
            inputValue={inputValue}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <CheckoutSummary isError={isError} isDisabled={isDisabled} setConfirmation={setConfirmation} />
          {confirmation && <PaymentConfirmation isOpen={confirmation} setConfirmation={setConfirmation} />}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Checkout;
