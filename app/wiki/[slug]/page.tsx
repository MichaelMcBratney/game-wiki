import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, History } from "lucide-react";
import { MarkdownRenderer } from "@/components/wiki/MarkdownRenderer";

export const revalidate = 60; // ISR

type Props = { params: Promise<{ slug: string }> };

export default async function WikiPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      currentRevision: true,
      category: true,
    },
  });

  if (!page) notFound();

  const content =
    page.currentRevision?.markdownContent ?? page.content ?? "*No content yet.*";

  return (
    <article>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-wiki-gold">
            {page.title}
          </h1>
          {page.category && (
            <p className="text-wiki-muted text-sm mt-1">{page.category.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/wiki/${slug}/edit`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-wiki-accent text-white hover:bg-wiki-accent-hover transition-colors"
          >
            <Pencil className="size-4" />
            Edit
          </Link>
          <Link
            href={`/wiki/${slug}/history`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-wiki-border text-gray-300 hover:bg-wiki-surface transition-colors"
          >
            <History className="size-4" />
            History
          </Link>
        </div>
      </div>
      <MarkdownRenderer content={content} />
    </article>
  );
}
