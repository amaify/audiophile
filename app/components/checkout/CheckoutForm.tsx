/* eslint-disable no-unused-vars */
import { type ChangeEvent, type FocusEvent } from "react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { selectCart } from "@/store/reducers/cartReducer";
import { FormInput } from "@/Types/FormInput";
import { Alert, AlertType } from "../shared/Alert";
import CheckoutSectionTitle from "./CheckoutSectionTitle";

const Input = dynamic(import("@/components/shared/Input"), { ssr: false });

interface Props {
  inputValue: FormInput;
  paymentMethod: "online" | "cash";
  error: Record<string, string>;
  setPaymentMethod: (value: "online" | "cash") => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function CheckoutForm({
  inputValue,
  paymentMethod,
  error,
  setPaymentMethod,
  onInputChange,
  onInputBlur
}: Props) {
  const { cart } = useSelector(selectCart);

  const methodOfPayment = [
    { label: "e-Money", method: "online" },
    { label: "Cash on Delivery", method: "cash" }
  ] as const;

  return (
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
                  The &lsquo;Cash on Delivery&rsquo; option enables you to pay in cash when our delivery courier arrives
                  at your residence. Just make sure your address is correct so that your order will not be cancelled.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </form>
  );
}
