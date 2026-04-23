import prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";

async function formatSource(code: string): Promise<string> {
  try {
    const formatted = await prettier.format(code, {
      parser: "babel",
      plugins: [prettierPluginBabel, prettierPluginEstree],
      printWidth: 120,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: false,
      trailingComma: "all",
      bracketSpacing: true,
      arrowParens: "always",
    });

    return formatted.trim().replace(/;$/, "");
  } catch {
    return code;
  }
}

export { formatSource };
