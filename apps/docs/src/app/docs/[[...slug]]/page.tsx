import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import {
  ButtonAsLink,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonWithIcons,
} from "@/components/MdxComponents";
import { Preview } from "@/components/Preview";
import { source } from "@/lib/source";

interface PageProps {
  params: Promise<SlugParamsProps>;
}

interface SlugParamsProps {
  slug?: string[];
}

const mdxComponents = {
  ...defaultMdxComponents,
  ButtonAsLink,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonWithIcons,
  Preview,
};

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
        <MdxContent components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

export default Page;

export { generateMetadata, generateStaticParams } from "./page.utils";
