export const installSnippet = `bun add @sarchauhan/code-markdown`;

export const quickStartSnippet = [
  'import { CodeMarkdown } from "@sarchauhan/code-markdown";',
  'import "@sarchauhan/code-markdown/styles.css";',
  "",
  "export function Example() {",
  "  return (",
  '    <CodeMarkdown language="typescript" theme="catppuccin-mocha" showLineNumbers>',
  '      {`const count = 1;',
  'console.log("next:", count + 1);`}',
  "    </CodeMarkdown>",
  "  );",
  "}",
].join("\n");

export const customThemeSnippet = [
  "type CodeTheme = {",
  "  name: string;",
  "  colors: {",
  "    background: string;",
  "    foreground: string;",
  "    comment: string;",
  "    keyword: string;",
  "    string: string;",
  "    function: string;",
  "    number: string;",
  "    type: string;",
  "    surface: string;",
  "    overlay: string;",
  "    subtext: string;",
  "  };",
  "};",
].join("\n");
