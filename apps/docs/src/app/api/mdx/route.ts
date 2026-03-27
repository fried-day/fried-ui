import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { type NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest): Promise<NextResponse> {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const lastSegment = slug.split("/").filter(Boolean).pop();

  if (!lastSegment) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const filePath = join(process.cwd(), "public", "llm", `${lastSegment}.md`);

  let text: string;

  try {
    text = await readFile(filePath, "utf-8");
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const response = new NextResponse(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });

  return response;
}

export { GET };
