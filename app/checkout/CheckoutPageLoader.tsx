"use client";

import dynamic from "next/dynamic";
import CheckoutPageSkeleton from "./CheckoutPageSkeleton";

// `ssr: false` is only allowed inside Client Components (Next.js 15+).
const CheckoutPageLoader = dynamic(() => import("./CheckoutPageComponent"), {
  ssr: false,
  loading: () => <CheckoutPageSkeleton />
});

export default CheckoutPageLoader;
