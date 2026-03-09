import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Convert title to URL-safe slug: lowercase, spaces to hyphens, strip invalid chars */
function titleToSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "untitled";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug: slugInput, categoryId } = body as {
      title?: string;
      slug?: string;
      categoryId?: string | null;
    };

    const rawTitle = (title ?? "").trim();
    if (!rawTitle) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = slugInput?.trim()
      ? slugInput.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")
      : titleToSlug(rawTitle);

    if (!slug) {
      return NextResponse.json(
        { error: "Slug could not be generated from title; provide a custom slug" },
        { status: 400 }
      );
    }

    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: `A page with slug "${slug}" already exists` },
        { status: 409 }
      );
    }

    const initialContent = "";

    const page = await prisma.page.create({
      data: {
        title: rawTitle,
        slug,
        content: initialContent,
        categoryId: categoryId || undefined,
      },
    });

    const revision = await prisma.revision.create({
      data: {
        pageId: page.id,
        markdownContent: initialContent,
        changeSummary: "Initial version",
      },
    });

    await prisma.page.update({
      where: { id: page.id },
      data: { currentRevisionId: revision.id },
    });

    return NextResponse.json({ slug: page.slug, pageId: page.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create page" },
      { status: 500 }
    );
  }
}
