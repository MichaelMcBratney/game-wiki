import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Items", icon: "Sword", description: "Weapons, gear, and items" },
  { name: "Quests", icon: "ScrollText", description: "Quests and objectives" },
  { name: "Characters", icon: "Users", description: "NPCs and characters" },
  { name: "Mechanics", icon: "Cog", description: "Game mechanics and systems" },
];

async function main() {
  for (const c of CATEGORIES) {
    const existing = await prisma.category.findFirst({ where: { name: c.name } });
    if (!existing) await prisma.category.create({ data: c });
  }

  const mechanics = await prisma.category.findFirst({ where: { name: "Mechanics" } });
  const welcome = await prisma.page.upsert({
    where: { slug: "getting-started" },
    create: {
      title: "Getting Started",
      slug: "getting-started",
      content: "Welcome to the **Game Wiki**.\n\n- Use [[Wikilinks]] to link to other pages.\n- Edit this page to try the editor.",
      categoryId: mechanics?.id ?? undefined,
    },
    update: {},
  });

  const rev = await prisma.revision.create({
    data: {
      pageId: welcome.id,
      markdownContent: welcome.content ?? "Welcome.",
      changeSummary: "Initial version",
    },
  });

  await prisma.page.update({
    where: { id: welcome.id },
    data: { currentRevisionId: rev.id },
  });

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
