"use client";

import ErrorBoundaryComponent from "@/components/shared/ErrorBoundary";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundaryComponent error={error} reset={reset} />
      </body>
    </html>
  );
}
