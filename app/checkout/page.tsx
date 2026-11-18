import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutPageSkeleton from "./CheckoutPageSkeleton";
import CheckoutPageLoader from "./CheckoutPageLoader";

export const metadata: Metadata = {
  title: "Audiophile | Checkout"
};

export default function Page() {
  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPageLoader />
    </Suspense>
  );
}
