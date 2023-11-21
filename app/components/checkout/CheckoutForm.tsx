/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import type { StripeCardNumberElementOptions } from "@stripe/stripe-js";
import CashIcon from "@/assets/shared/desktop/cash-payment.svg";
import { selectCart } from "@/store/cart/cart.reducer";
import { Alert } from "../shared/Alert";
import useCheckoutForm from "./hooks/useCheckoutForm";

const Input = dynamic(import("@/components/shared/Input"), { ssr: false });

function CheckoutSectionTitle({ title }: { title: string }) {
  return <h2 className="[ sub-title ] mb-[1.6rem]">{title}</h2>;
}

export default function CheckoutForm() {
  const { cart } = useSelector(selectCart);
  const { error, paymentMethod, register } = useCheckoutForm();

  const methodOfPayment = [
    { label: "e-Money", method: "online" },
    { label: "Cash on Delivery", method: "cash" }
  ] as const;

  const cardOptions: StripeCardNumberElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontWeight: 700,
        fontFamily: "Manrope, sans-serif",
        fontSize: "14px",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#989898",
          fontWeight: 700
        }
      }
    }
  };

  const cvcOptions: StripeCardNumberElementOptions = {
    style: { ...cardOptions.style }
  };

  return (
    <div className="bg-white px-[2.4rem] pt-[2.4rem] pb-[4.8rem] w-full rounded-lg lg:pt-[5.4rem] lg:px-[4.8rem] xl:w-[70%]">
      <h1 className="[ heading-3 ] mb-[2.4rem] md:mb-[4.1rem]">Checkout</h1>
      {cart.length === 0 && (
        <Alert message="To make an order, you should add an item to the cart!" alertVariant="warning" />
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
                addedStyle="w-full md:w-1/2"
                register={register}
                error={error}
              />
              <Input
                control="text"
                label="Email Address"
                name="emailAddress"
                placeholder="alexei@mail.com"
                type="email"
                addedStyle="w-full md:w-1/2"
                error={error}
                register={register}
              />
            </div>

            <Input
              control="text"
              label="Phone Number"
              name="phoneNumber"
              placeholder="+1202-555-0136"
              type="tel"
              addedStyle="w-full md:w-1/2"
              error={error}
              register={register}
            />
          </section>

          <section className="flex flex-col mb-[5.3rem]">
            <CheckoutSectionTitle title="Shipping info" />
            <Input
              control="text"
              label="Address"
              name="address"
              placeholder="1137 Williams Avenue"
              type="text"
              addedStyle="w-full"
              register={register}
              error={error}
            />

            <div className="flex flex-col gap-[2.4rem] my-[2.4rem] md:gap-[1.6rem] md:flex-row">
              <Input
                control="text"
                label="ZIP Code"
                name="zipCode"
                placeholder="10001"
                type="text"
                register={register}
                addedStyle="w-full md:w-1/2"
                error={error}
              />

              <Input
                control="text"
                label="City"
                name="city"
                placeholder="New York"
                type="text"
                register={register}
                addedStyle="w-full md:w-1/2"
                error={error}
              />
            </div>
            <Input
              control="text"
              label="Country"
              name="country"
              placeholder="United States"
              type="text"
              register={register}
              addedStyle="w-full md:w-1/2"
              error={error}
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
                    register={register}
                    value={m.method}
                    label={m.label}
                    addedStyle="w-full"
                    checked={paymentMethod === m.method}
                    key={m.method}
                  />
                ))}
              </div>
            </div>
            {paymentMethod === "online" ? (
              <div className="flex flex-col gap-[1.6rem] md:flex-row">
                <div className="flex flex-col gap-[9px] relative w-full md:w-1/2">
                  <label className="text-[12px] text-black font-bold leading-4" htmlFor="cardNumber">
                    e-Money number
                  </label>
                  <CardNumberElement options={cardOptions} className="[ stripe-input StripeElement--focus ]" />
                </div>

                <div className="flex flex-col gap-[9px] relative w-full md:w-1/2">
                  <label className="text-[12px] text-black font-bold leading-4" htmlFor="cardCVV">
                    e-Money CVV
                  </label>
                  <CardCvcElement options={cvcOptions} className="[ stripe-input StripeElement--focus ]" />
                </div>

                <div className="flex flex-col gap-[9px] relative w-full md:w-1/2">
                  <label className="text-[12px] text-black font-bold leading-4" htmlFor="cardCVV">
                    e-Money exp. Month
                  </label>
                  <CardExpiryElement options={cvcOptions} className="[ stripe-input StripeElement--focus ]" />
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="w-20 h-20 mr-8 self-center">
                  <Image src={CashIcon} alt="Bank note icon" className="w-full h-full" />
                </div>
                <p className="[ body-text ] text-black/50 font-medium w-[80%]">
                  The &lsquo;Cash on Delivery&rsquo; option enables you to pay in cash when our delivery courier arrives
                  at your residence. Just make sure your address is correct so that your order will not be cancelled.
                </p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
