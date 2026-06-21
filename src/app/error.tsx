"use client";

import { useEffect } from "react";

// SECURITY FIX: Global error boundary to prevent exposing stack traces
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service securely
    // console.error(error); // Intentionally hidden for security
  }, [error]);

  return (
    <div style={{ padding: "100px 5%", textAlign: "center" }}>
      <h2>Something went wrong!</h2>
      <p>We apologize for the inconvenience. Please try again.</p>
      <button
        onClick={() => reset()}
        className="btn-primary"
        style={{ marginTop: "20px" }}
      >
        Try again
      </button>
    </div>
  );
}
