import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { ColorSwatch } from "@/components/ColorSwatch";
import { CopyMarkdown } from "@/components/CopyMarkdown";
import {
  BadgeBadgeLinks,
  BadgeDemo,
  BadgeIconOnly,
  BadgeOutlineVariants,
  BadgeShadow,
  BadgeSizes,
  BadgeSoftVariants,
  BadgeVariants,
  ButtonAsLink,
  ButtonBadgeLinks,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonFullWidth,
  ButtonIconOnly,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
  SurfaceBadgeLinks,
  SurfaceDemo,
  SurfaceRadii,
  SurfaceShadow,
  SurfaceVariants,
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
  BadgeBadgeLinks,
  BadgeDemo,
  BadgeIconOnly,
  BadgeOutlineVariants,
  BadgeShadow,
  BadgeSizes,
  BadgeSoftVariants,
  BadgeVariants,
  ButtonAsLink,
  ButtonBadgeLinks,
  ButtonCustomClass,
  ButtonDemo,
  ButtonDisabled,
  ButtonFullWidth,
  ButtonIconOnly,
  ButtonPending,
  ButtonRadii,
  ButtonSizes,
  ButtonVariants,
  ButtonWithIcons,
  ColorSwatch,
  Preview,
  SurfaceBadgeLinks,
  SurfaceDemo,
  SurfaceRadii,
  SurfaceShadow,
  SurfaceVariants,
};

const Page = async (props: Readonly<PageProps>): Promise<React.JSX.Element> => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MdxContent = page.data.body;
  const slugPath = params.slug?.join("/") ?? "";
  const markdownUrl = `/api/mdx?slug=${slugPath}`;
  const tocConfig = { footer: <CopyMarkdown url={markdownUrl} /> };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={tocConfig}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MdxContent components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

export { generateMetadata, generateStaticParams } from "./page.utils";
