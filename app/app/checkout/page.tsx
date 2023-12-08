import type { Metadata } from "next";
// import dynamic from "next/dynamic";
import CheckoutPageComponent from "./CheckoutPageComponent";

export const metadata: Metadata = {
  title: "Audiophile | Checkout"
};

export default function Page() {
  return <CheckoutPageComponent />;
}
