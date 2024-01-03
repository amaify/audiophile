import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import CheckoutPageSkeleton from "./CheckoutPageSkeleton";

const CheckoutPageComponent = dynamic(() => import("./CheckoutPageComponent"), { ssr: false });

export const metadata: Metadata = {
  title: "Audiophile | Checkout"
};

export default function Page() {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPageComponent />
    </Suspense>
  );
}
