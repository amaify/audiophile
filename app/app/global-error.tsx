"use client";

import ErrorBoundaryLayout from "@/components/layout/ErrorBoundaryLayout";
import { Alert } from "@/components/shared/Alert";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundaryLayout>
          <Alert message={error.message} alertVariant="error" />
          <button className="[ phile-btn phile-btn-1 ]" onClick={() => reset()}>
            Try again
          </button>
        </ErrorBoundaryLayout>
      </body>
    </html>
  );
}
