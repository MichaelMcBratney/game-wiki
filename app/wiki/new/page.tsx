import { prisma } from "@/lib/prisma";
import { NewPageForm } from "@/components/wiki/NewPageForm";

export const revalidate = 60;

export default async function WikiNewPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-wiki-gold mb-2">
        New page
      </h1>
      <p className="text-wiki-muted text-sm mb-6">
        Create a new wiki page. You’ll be taken to the editor to add content.
      </p>
      <NewPageForm categories={categories} />
    </div>
  );
}
