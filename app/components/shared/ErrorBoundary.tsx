"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrorBoundaryLayout from "@/components/layout/ErrorBoundaryLayout";
import { Alert } from "@/components/shared/Alert";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundaryComponent({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorBoundaryLayout>
      <div className="space-y-4">
        <Alert message={error.message} alertVariant="error" />
        <button className="[ phile-btn phile-btn-1 ]" onClick={() => router.refresh()}>
          Try again
        </button>
      </div>
    </ErrorBoundaryLayout>
  );
}
