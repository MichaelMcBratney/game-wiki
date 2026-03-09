import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q?.trim()) {
    return NextResponse.json({ results: [] });
  }

  const term = `%${q.trim()}%`;
  const pages = await prisma.page.findMany({
    where: {
      OR: [
        { title: { contains: q.trim(), mode: "insensitive" } },
        { content: { contains: q.trim(), mode: "insensitive" } },
      ],
    },
    select: { slug: true, title: true, content: true },
    take: 20,
  });

  const results = pages.map((p) => ({
    slug: p.slug,
    title: p.title,
    snippet: p.content
      ? p.content.slice(0, 150).replace(/\n/g, " ") + (p.content.length > 150 ? "…" : "")
      : undefined,
  }));

  return NextResponse.json({ results });
}
