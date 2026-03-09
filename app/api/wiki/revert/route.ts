import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageSlug, revisionId } = body as {
      pageSlug?: string;
      revisionId?: string;
    };

    if (!pageSlug || !revisionId) {
      return NextResponse.json(
        { error: "pageSlug and revisionId required" },
        { status: 400 }
      );
    }

    const revision = await prisma.revision.findFirst({
      where: { id: revisionId },
      include: { page: true },
    });

    if (!revision || revision.page.slug !== pageSlug) {
      return NextResponse.json(
        { error: "Revision not found for this page" },
        { status: 404 }
      );
    }

    await prisma.page.update({
      where: { slug: pageSlug },
      data: {
        currentRevisionId: revisionId,
        content: revision.markdownContent,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to revert" },
      { status: 500 }
    );
  }
}
