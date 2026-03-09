import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EditPageForm } from "@/components/wiki/EditPageForm";

export const revalidate = 0; // Always fresh for edit page

type Props = { params: Promise<{ slug: string }> };

export default async function WikiEditPage({ params }: Props) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { currentRevision: true },
  });

  if (!page) notFound();

  const initialContent =
    page.currentRevision?.markdownContent ?? page.content ?? "";

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
        Edit: {page.title}
      </h1>
      <EditPageForm
        pageId={page.id}
        pageSlug={slug}
        initialContent={initialContent}
      />
    </div>
  );
}
