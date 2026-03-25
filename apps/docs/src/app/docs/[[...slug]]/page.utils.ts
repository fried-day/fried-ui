import { notFound } from "next/navigation";

import { source } from "@/lib/source";

interface GenerateMetadataProps {
  params: Promise<SlugParams>;
}

interface SlugParams {
  slug?: string[];
}

function generateStaticParams(): ReturnType<typeof source.generateParams> {
  return source.generateParams();
}

async function generateMetadata(
  props: GenerateMetadataProps,
): Promise<{ title: string; description: string | undefined }> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const title = page.data.title;
  const description = page.data.description;

  return {
    title,
    description,
  };
}

export { generateMetadata, generateStaticParams };
