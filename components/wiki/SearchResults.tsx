"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

type SearchResult = { slug: string; title: string; snippet?: string };

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/wiki/search?q=${encodeURIComponent(query)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setResults(data.results ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (loading) return <p className="text-wiki-muted">Searching…</p>;
  if (results.length === 0)
    return <p className="text-wiki-muted">No pages found.</p>;

  return (
    <ul className="space-y-2">
      {results.map((r) => (
        <li key={r.slug}>
          <Link
            href={`/wiki/${r.slug}`}
            className="flex items-start gap-2 text-gray-300 hover:text-wiki-accent block py-1"
          >
            <FileText className="size-4 shrink-0 mt-0.5" />
            <span>
              <span className="font-medium">{r.title}</span>
              {r.snippet && (
                <span className="text-wiki-muted text-sm block mt-0.5">
                  {r.snippet}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
