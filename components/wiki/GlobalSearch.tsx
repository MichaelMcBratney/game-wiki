"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/wiki/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [query, router]
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-wiki-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wiki..."
        className="w-full pl-9 pr-4 py-2 rounded-lg bg-wiki-surface border border-wiki-border text-gray-200 placeholder:text-wiki-muted focus:outline-none focus:ring-2 focus:ring-wiki-accent"
      />
    </form>
  );
}
