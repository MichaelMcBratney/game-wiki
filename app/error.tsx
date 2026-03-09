"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Wiki error:", error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-display text-xl font-bold text-wiki-gold mb-2">
        Something went wrong
      </h1>
      <p className="text-wiki-muted text-sm mb-4 max-w-md">
        This is often caused by a missing or incorrect database connection. If
        you just deployed, check that <code className="bg-wiki-surface px-1 rounded">DATABASE_URL</code> is set in
        Vercel and use Neon&apos;s <strong>pooled</strong> connection string.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-wiki-accent text-white hover:bg-wiki-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}
