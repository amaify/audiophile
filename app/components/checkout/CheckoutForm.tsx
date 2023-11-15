import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import { selectCart } from "@/store/reducers/cartReducer";
import CashIcon from "@/assets/shared/desktop/cash-payment.svg";
import { Alert } from "../shared/Alert";
import CheckoutSectionTitle from "./CheckoutSectionTitle";
import { useCheckoutForm } from "@/pages/checkout";

const Input = dynamic(import("@/components/shared/Input"), { ssr: false });

export default function CheckoutForm() {
  const { cart } = useSelector(selectCart);
  const { error, paymentMethod, register } = useCheckoutForm();

  const methodOfPayment = [
    { label: "e-Money", method: "online" },
    { label: "Cash on Delivery", method: "cash" }
  ] as const;

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
                <Input
                  control="text"
                  label="e-Money Number"
                  name="cardNumber"
                  placeholder="238521993"
                  type="tel"
                  register={register}
                  addedStyle="w-full md:w-1/2"
                  error={error}
                />

                <Input
                  control="text"
                  // id="card-pin"
                  label="e-Money Pin"
                  name="cardPin"
                  register={register}
                  placeholder="4422"
                  type="tel"
                  addedStyle="w-full md:w-1/2"
                  error={error}
                />
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
