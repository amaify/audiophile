"use client";

import { ReactNode, useLayoutEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { selectCart } from "@/store/cart/CartReducer";
import { Alert } from "@/components/shared/Alert";
import Footer from "@/components/shared/Footer";
import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";

const CheckoutFormLayout = dynamic(() => import("@/app/checkout/components"), { ssr: false });

let stripePromise: Promise<Stripe | null>;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

function CheckoutPageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <SubPageHeader />
      <div className="flex-grow bg-grey pt-[1.6rem] pb-[14.1rem] md:pt-[7.9rem] [ layout-padding ]">
        <BackButton onClick={() => router.back()} />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPageComponent() {
  const router = useRouter();
  const { cart } = useSelector(selectCart);

  useLayoutEffect(() => {
    if (cart.length === 0) router.push("/");
  }, []);

  if (cart.length === 0)
    return (
      <CheckoutPageLayout>
        <Alert alertVariant="warning" message="Your cart is empty" />
      </CheckoutPageLayout>
    );

  return (
    <Elements stripe={getStripe()}>
      <CheckoutPageLayout>
        <CheckoutFormLayout />
      </CheckoutPageLayout>
    </Elements>
  );
}
