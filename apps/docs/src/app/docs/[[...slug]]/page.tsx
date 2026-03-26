import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { source } from "@/lib/source";

import { generateMetadata, generateStaticParams } from "./page.utils";

interface PageProps {
  params: Promise<SlugParamsProps>;
}

interface SlugParamsProps {
  slug?: string[];
}

async function Page(props: Readonly<PageProps>): Promise<React.JSX.Element> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MdxContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MdxContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export default Page;

export { generateMetadata, generateStaticParams };
