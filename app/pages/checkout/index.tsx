/* eslint-disable no-console */
import React from "react";
import dynamic from "next/dynamic";
import { Elements } from "@stripe/react-stripe-js";
import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";
import CheckoutFormLayout from "@/components/checkout";
import getStripe from "@/helpers/getStripe";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

export default function CheckoutPage() {
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
