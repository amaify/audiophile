import { useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import getStripe from "@/helpers/GetStripe";
import { selectCart } from "@/store/cart/CartReducer";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });
const CheckoutFormLayout = dynamic(import("@/components/checkout"), { ssr: true });
const BackButton = dynamic(import("@/components/shared/BackButton"), { ssr: false });
const SubPageHeader = dynamic(import("@/components/layout/SubPageHeader"), { ssr: false });

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
        <BackButton onClick={() => router.back()} />
        <CheckoutFormLayout />
      </div>
      <Footer />
    </Elements>
  );
}
