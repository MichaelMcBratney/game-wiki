import { redirect } from "next/navigation";
import { SearchResults } from "@/components/wiki/SearchResults";

export const revalidate = 0;

type Props = { searchParams: Promise<{ q?: string }> };

export default async function WikiSearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  if (!q?.trim()) redirect("/wiki");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-wiki-gold mb-4">
        Search: &quot;{q}&quot;
      </h1>
      <SearchResults query={q.trim()} />
    </div>
  );
}
