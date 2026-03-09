import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RevisionHistoryClient } from "@/components/wiki/RevisionHistoryClient";

export const revalidate = 30;

type Props = { params: Promise<{ slug: string }> };

export default async function WikiHistoryPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      revisions: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });

  if (!page) notFound();

  const revisions = page.revisions.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    changeSummary: r.changeSummary,
    authorId: r.authorId,
    isCurrent: page.currentRevisionId === r.id,
  }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link
          href={`/wiki/${slug}`}
          className="text-wiki-muted hover:text-wiki-accent"
        >
          ← {page.title}
        </Link>
      </div>
      <h1 className="font-display text-2xl font-bold text-wiki-gold mb-4">
        History: {page.title}
      </h1>
      <RevisionHistoryClient
        revisions={revisions}
        pageSlug={slug}
      />
    </div>
  );
}
