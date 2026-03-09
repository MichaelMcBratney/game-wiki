import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, markdownContent, changeSummary } = body as {
      pageId?: string;
      markdownContent?: string;
      changeSummary?: string;
    };

    if (!pageId || typeof markdownContent !== "string") {
      return NextResponse.json(
        { error: "pageId and markdownContent required" },
        { status: 400 }
      );
    }

    const revision = await prisma.revision.create({
      data: {
        pageId,
        markdownContent,
        changeSummary: changeSummary ?? "Edit",
      },
    });

    await prisma.page.update({
      where: { id: pageId },
      data: {
        currentRevisionId: revision.id,
        content: markdownContent,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ revisionId: revision.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to create revision" },
      { status: 500 }
    );
  }
}
