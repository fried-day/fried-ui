import { defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "src/content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
