"use client";

import { useEffect } from "react";
import ErrorBoundaryComponent from "@/components/shared/ErrorBoundary";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorBoundaryComponent error={error} reset={reset} />;
}
