import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { selectCart } from "@/store/reducers/cartReducer";
import { validatePayButton } from "@/components/util/utils";
import { validateInputField } from "@/components/util/validateInputFields";
import { Alert, AlertType } from "@/components/shared/Alert";
import SubPageHeader from "@/components/shared/SubPageHeader";
import type { FormInput } from "../../Types/FormInput";
import CheckoutSectionTitle from "@/components/checkout/CheckoutSectionTitle";
import BackButton from "@/components/shared/BackButton";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const CheckoutSummary = dynamic(import("@/components/checkout/CheckoutSummary"), { ssr: false });
const Input = dynamic(import("@/components/shared/Input"), { ssr: false });
const PaymentConfirmation = dynamic(import("@/components/checkout/PaymentConfirmation"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

const Checkout = () => {
  const { cart } = useSelector(selectCart);

  // if (cart.length === 0) router.push("/");

  const methodOfPayment = [
    { label: "e-Money", method: "online" },
    { label: "Cash on Delivery", method: "cash" }
  ];
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
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("online");
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
      {confirmation && <PaymentConfirmation isOpen={confirmation} setConfirmation={setConfirmation} />}
      <Meta pageTitle="Checkout" />
      <SubPageHeader />
      <div className="bg-grey px-[2.4rem] pt-[1.6rem] pb-[14.1rem] md:px-[17.5rem] md:pt-[7.9rem]">
        <BackButton />

        <div className="flex flex-col gap-[3rem] md:flex-row">
          <form className="bg-white px-[2.4rem] pt-[2.4rem] pb-[4.8rem] w-full rounded-lg md:w-[70%] md:pt-[5.4rem] md:px-[4.8rem]">
            <h1 className="[ heading-3 ] mb-[2.4rem] md:mb-[4.1rem]">Checkout</h1>
            {cart.length === 0 && (
              <Alert message="To make an order, you should add an item to the cart!" type={AlertType.Warning} />
            )}
            {cart.length > 0 && (
              <>
                <section className="flex flex-col mb-[3.4rem] md:mb-[5.3rem]">
                  <CheckoutSectionTitle title="Billing details" />
                  <div className="flex flex-col gap-[2.4rem] mb-[2.4rem] md:flex-row md:gap-[1.6rem]">
                    <Input
                      control="text"
                      id="name"
                      label="Name"
                      name="name"
                      placeholder="Alexei Ward"
                      type="text"
                      value={inputValue.name}
                      addedStyle="w-full md:w-1/2"
                      error={error}
                      onBlur={(e) => onInputBlur(e)}
                      onChange={onInputChange}
                    />
                    <Input
                      control="text"
                      id="email"
                      label="Email Address"
                      name="emailAddress"
                      placeholder="alexei@mail.com"
                      type="email"
                      value={inputValue.emailAddress}
                      addedStyle="w-full md:w-1/2"
                      error={error}
                      onBlur={(e) => onInputBlur(e)}
                      onChange={onInputChange}
                    />
                  </div>

                  <Input
                    control="text"
                    id="telephone"
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="+1202-555-0136"
                    type="tel"
                    value={inputValue.phoneNumber}
                    addedStyle="w-full md:w-1/2"
                    error={error}
                    onBlur={(e) => onInputBlur(e)}
                    onChange={onInputChange}
                  />
                </section>

                <section className="flex flex-col mb-[5.3rem]">
                  <CheckoutSectionTitle title="Shipping info" />
                  <Input
                    control="text"
                    id="address"
                    label="Address"
                    name="address"
                    placeholder="1137 Williams Avenue"
                    type="text"
                    value={inputValue.address}
                    addedStyle="w-full"
                    error={error}
                    onBlur={(e) => onInputBlur(e)}
                    onChange={onInputChange}
                  />

                  <div className="flex flex-col gap-[2.4rem] my-[2.4rem] md:gap-[1.6rem] md:flex-row">
                    <Input
                      control="text"
                      id="zip-code"
                      label="ZIP Code"
                      name="zipCode"
                      placeholder="10001"
                      type="text"
                      value={inputValue.zipCode}
                      addedStyle="w-full md:w-1/2"
                      error={error}
                      onBlur={(e) => onInputBlur(e)}
                      onChange={onInputChange}
                    />

                    <Input
                      control="text"
                      id="city"
                      label="City"
                      name="city"
                      placeholder="New York"
                      type="text"
                      value={inputValue.city}
                      addedStyle="w-full md:w-1/2"
                      error={error}
                      onBlur={(e) => onInputBlur(e)}
                      onChange={onInputChange}
                    />
                  </div>
                  <Input
                    control="text"
                    id="country"
                    label="Country"
                    name="country"
                    placeholder="United States"
                    type="text"
                    value={inputValue.country}
                    addedStyle="w-full md:w-1/2"
                    error={error}
                    onBlur={(e) => onInputBlur(e)}
                    onChange={onInputChange}
                  />
                </section>

                <section className="flex flex-col mb-0">
                  <CheckoutSectionTitle title="Payment details" />
                  <div className="flex flex-col gap-[1.6rem] md:flex-row">
                    <p className="text-[1.2rem] text-black capitalize font-bold w-1/2">Payment Method</p>
                    <div className="flex flex-col gap-[1.6rem] w-full mb-[2.4rem] md:w-/12">
                      {methodOfPayment.map((m) => (
                        <Input
                          control="radio"
                          type="radio"
                          id={m.method}
                          name="paymentMethod"
                          value={m.method}
                          label={m.label}
                          addedStyle="w-full"
                          onChange={() => setPaymentMethod(m.method)}
                          checked={paymentMethod === m.method}
                          key={m.method}
                        />
                      ))}
                    </div>
                  </div>
                  {paymentMethod === "online" ? (
                    <div className="flex flex-col gap-[1.6rem] md:flex-row">
                      <Input
                        control="text"
                        id="card-number"
                        label="e-Money Number"
                        name="cardNumber"
                        placeholder="238521993"
                        type="tel"
                        value={inputValue.cardNumber}
                        addedStyle="w-full md:w-1/2"
                        error={error}
                        onBlur={(e) => onInputBlur(e)}
                        onChange={onInputChange}
                      />

                      <Input
                        control="text"
                        id="card-pin"
                        label="e-Money Pin"
                        name="cardPin"
                        placeholder="4422"
                        type="tel"
                        value={inputValue?.cardPin}
                        addedStyle="w-full md:w-1/2"
                        error={error}
                        onBlur={(e) => onInputBlur(e)}
                        onChange={onInputChange}
                      />
                    </div>
                  ) : (
                    <div className="flex">
                      <BanknotesIcon className="h-20 w-20 mr-10" fill="#d87d4a" />
                      <p className="[ body-text ] text-black/50 font-medium w-[70%]">
                        The &lsquo;Cash on Delivery&rsquo; option enables you to pay in cash when our delivery courier
                        arrives at your residence. Just make sure your address is correct so that your order will not be
                        cancelled.
                      </p>
                    </div>
                  )}
                </section>
              </>
            )}
          </form>
          <CheckoutSummary isError={isError} isDisabled={isDisabled} setConfirmation={setConfirmation} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Checkout;
