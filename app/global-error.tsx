"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d0d12] text-gray-100 font-sans antialiased min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-xl font-bold text-[#d4af37] mb-2">
          Application error
        </h1>
        <p className="text-gray-400 text-sm mb-4 max-w-md text-center">
          A server-side exception occurred. Check your host&apos;s function logs
          (e.g. Vercel → Project → Logs) for the real error. Often it&apos;s a
          missing <code className="bg-[#16161d] px-1 rounded">DATABASE_URL</code> or
          using a non-pooled Neon connection on serverless.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-[#8b5cf6] text-white hover:bg-[#a78bfa]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
