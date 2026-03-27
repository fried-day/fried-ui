import { type NextRequest, NextResponse } from "next/server";

import { source } from "@/lib/source";

async function GET(request: NextRequest): Promise<NextResponse> {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const slugParts = slug.split("/").filter(Boolean);
  const page = source.getPage(slugParts);

  if (!page) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const text = await page.data.getText("processed");

  const response = new NextResponse(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });

  return response;
}

export { GET };
