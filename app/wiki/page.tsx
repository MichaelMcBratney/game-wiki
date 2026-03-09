import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText } from "lucide-react";

export const revalidate = 60; // ISR: revalidate every 60s

type SearchParams = { category?: string };

export default async function WikiIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });
  const categoryId = category
    ? categories.find((c) => c.name.toLowerCase() === category)?.id
    : undefined;

  const pages = await prisma.page.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: { slug: true, title: true, updatedAt: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-wiki-gold mb-6">
        Wiki index
      </h1>
      <ul className="space-y-2">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/wiki/${p.slug}`}
              className="flex items-center gap-2 text-gray-300 hover:text-wiki-accent"
            >
              <FileText className="size-4 shrink-0" />
              <span>{p.title}</span>
              <span className="text-wiki-muted text-sm ml-auto">
                {new Date(p.updatedAt).toLocaleDateString()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {pages.length === 0 && (
        <p className="text-wiki-muted">No pages yet. Create one from the edit page.</p>
      )}
    </div>
  );
}
