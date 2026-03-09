"use client";

import Link from "next/link";
import {
  BookOpen,
  Sword,
  ScrollText,
  Users,
  Cog,
  Search,
} from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";

const categories = [
  { name: "Items", icon: Sword, slug: "items" },
  { name: "Quests", icon: ScrollText, slug: "quests" },
  { name: "Characters", icon: Users, slug: "characters" },
  { name: "Mechanics", icon: Cog, slug: "mechanics" },
];

export function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-wiki-border bg-wiki-bg/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link
            href="/wiki"
            className="flex items-center gap-2 font-display font-bold text-wiki-gold text-xl"
          >
            <BookOpen className="size-7" />
            Game Wiki
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <GlobalSearch />
          </div>
        </div>
      </header>
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <aside className="w-52 shrink-0 pr-6 border-r border-wiki-border">
          <nav className="space-y-1">
            <p className="text-xs font-semibold text-wiki-muted uppercase tracking-wider mb-3">
              Categories
            </p>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/wiki?category=${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-wiki-surface hover:text-wiki-gold transition-colors"
                >
                  <Icon className="size-4 shrink-0" />
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
