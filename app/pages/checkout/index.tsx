import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import type { FormInput, InputError } from "../../Types/FormInput";
import { selectCart } from "@/store/reducers/cartReducer";
import { validatePayButton } from "@/components/util/utils";
import { validateInputField } from "@/components/util/validateInputFields";
import { Alert, AlertType } from "@/components/shared/Alert";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const CheckoutSummary = dynamic(import("@/components/Summary"), { ssr: false });
const Input = dynamic(import("@/components/shared/Input"), { ssr: false });
const Navigation = dynamic(import("@/components/shared/Navigation"), { ssr: false });
const Confirmation = dynamic(import("@/components/PaymentConfirmation"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

const Checkout = () => {
  const router = useRouter();
  const { cart } = useSelector(selectCart);

  // if (cart.length === 0) router.push("/");

  const methodOfPayment = [
    { label: "e-Money", method: "online" },
    { label: "Cash on Delivery", method: "cash" }
  ];
  const [value, setValue] = useState<FormInput>({
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

  const isDisabled = validatePayButton(value, paymentMethod);
  const isError = Object.values(error).some((value) => value);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setValue((prevState) => ({ ...prevState, [name]: value }));

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
      {confirmation && <Confirmation isOpen={confirmation} setConfirmation={setConfirmation} />}
      <Meta pageTitle="Checkout" />
      <div className="bg-black h-[97px] px-[17.5rem] relative z-50">
        <Navigation removeHero={true} />
      </div>
      <div className="bg-grey px-[17.5rem] pt-[7.9em] pb-[14.1em]">
        <button
          className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[56px] hover:opacity-100"
          onClick={() => router.back()}
        >
          go back
        </button>

        <div className="flex gap-[30px]">
          <form className="bg-white px-[4.8em] pt-[5.4em] pb-[4.8em] w-[70%] rounded-lg">
            <h1 className="[ heading-3 ] mb-[41px]">Checkout</h1>
            {cart.length === 0 && (
              <Alert message="To make an order, you should add an item to the cart!" type={AlertType.Warning} />
            )}
            <section className="flex flex-col mb-[53px]">
              <h2 className="[ sub-title ] mb-[16px]">Billing details</h2>

              <div className="flex gap-[16px] mb-[24px]">
                <Input
                  control="text"
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Alexei Ward"
                  type="text"
                  value={value.name}
                  addedStyle="w-[50%]"
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
                  value={value.emailAddress}
                  addedStyle="w-[50%]"
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
                value={value.phoneNumber}
                addedStyle="w-[49%]"
                error={error}
                onBlur={(e) => onInputBlur(e)}
                onChange={onInputChange}
              />
            </section>

            <section className="flex flex-col mb-[53px]">
              <h2 className="[ sub-title ] mb-[16px]">Shipping info</h2>
              <Input
                control="text"
                id="address"
                label="Address"
                name="address"
                placeholder="1137 Williams Avenue"
                type="text"
                value={value.address}
                addedStyle="w-full"
                error={error}
                onBlur={(e) => onInputBlur(e)}
                onChange={onInputChange}
              />

              <div className="flex gap-[16px] my-[24px]">
                <Input
                  control="text"
                  id="zip-code"
                  label="ZIP Code"
                  name="zipCode"
                  placeholder="10001"
                  type="text"
                  value={value.zipCode}
                  addedStyle="w-[50%]"
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
                  value={value.city}
                  addedStyle="w-[50%]"
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
                value={value.country}
                addedStyle="w-[49%]"
                error={error}
                onBlur={(e) => onInputBlur(e)}
                onChange={onInputChange}
              />
            </section>

            <section className="flex flex-col mb-0">
              <h2 className="[ sub-title ] mb-[16px]">Payment Details</h2>

              <div className="flex gap-[16px]">
                <p className="text-[12px] text-black capitalize font-bold w-[50%]">Payment Method</p>
                <div className="flex flex-col gap-[16px] w-[50%] mb-[24px]">
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
                <div className="flex gap-[16px] ">
                  <Input
                    control="text"
                    id="card-number"
                    label="e-Money Number"
                    name="cardNumber"
                    placeholder="238521993"
                    type="tel"
                    value={value.cardNumber}
                    addedStyle="w-[50%]"
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
                    value={value?.cardPin}
                    addedStyle="w-[50%]"
                    error={error}
                    onBlur={(e) => onInputBlur(e)}
                    onChange={onInputChange}
                  />
                </div>
              ) : (
                <div className="flex">
                  <BanknotesIcon className="h-20 w-20 mr-10" fill="#d87d4a" />
                  <p className="[ body-text ] text-black font-medium opacity-50 w-[70%]">
                    The &lsquo;Cash on Delivery&rsquo; option enables you to pay in cash when our delivery courier
                    arrives at your residence. Just make sure your address is correct so that your order will not be
                    cancelled.
                  </p>
                </div>
              )}
            </section>
          </form>
          <CheckoutSummary isError={isError} isDisabled={isDisabled} setConfirmation={setConfirmation} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Checkout;
