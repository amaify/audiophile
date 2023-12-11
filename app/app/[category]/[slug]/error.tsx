"use client";

import { useEffect } from "react";
import ErrorBoundaryLayout from "@/components/layout/ErrorBoundaryLayout";
import { Alert } from "@/components/shared/Alert";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorBoundaryLayout>
      <Alert message={error.message} alertVariant="error" />
      <button className="[ phile-btn phile-btn-1 ]" onClick={() => reset()}>
        Try again
      </button>
    </ErrorBoundaryLayout>
  );
}
