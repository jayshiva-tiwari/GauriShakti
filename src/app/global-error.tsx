"use client";

// SECURITY FIX: Global Error Boundary for the root layout
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "100px 5%", textAlign: "center" }}>
          <h2>A critical error occurred!</h2>
          <p>Please refresh the page or contact support.</p>
          <button onClick={() => reset()} className="btn-primary">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
