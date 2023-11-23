import dynamic from "next/dynamic";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";
import CheckoutFormLayout from "@/components/checkout";
import getStripe from "@/helpers/getStripe";
import { selectCart } from "@/store/cart/cart.reducer";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useSelector(selectCart);

  useLayoutEffect(() => {
    if (cart.length === 0) router.push("/");
  }, []);

  if (cart.length === 0) return null;

  return (
    <Elements stripe={getStripe()}>
      <Meta pageTitle="Checkout" />
      <SubPageHeader />
      <div className="bg-grey pt-[1.6rem] pb-[14.1rem] md:pt-[7.9rem] [ layout-padding ]">
        <BackButton />
        <CheckoutFormLayout />
      </div>
      <Footer />
    </Elements>
  );
}
