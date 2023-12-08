import { Metadata } from "next";
import dynamic from "next/dynamic";

const CheckoutPageComponent = dynamic(() => import("./CheckoutPageComponent"));

export const metadata: Metadata = {
  title: "Audiophile | Checkout"
};

export default function Page() {
  return <CheckoutPageComponent />;
}
