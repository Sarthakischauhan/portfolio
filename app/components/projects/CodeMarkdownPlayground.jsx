"use client";

import { useMemo, useState } from "react";
import CodeMarkdownBlock from "@/app/components/layout/CodeMarkdownBlock";
import { Select, Toggle } from "@/app/components/ui";
import { portfolioTheme } from "@/app/styles/portfolioTheme";

const languageOptions = [
  { label: "typescript", value: "typescript" },
  { label: "python", value: "python" },
  { label: "go", value: "go" },
  { label: "rust", value: "rust" },
  { label: "c++", value: "cpp" },
];

const themeOptions = [
  { label: "current", value: "current" },
  { label: "catppuccin mocha", value: "catppuccin-mocha" },
  { label: "catppuccin macchiato", value: "catppuccin-macchiato" },
  { label: "catppuccin frappe", value: "catppuccin-frappe" },
  { label: "catppuccin latte", value: "catppuccin-latte" },
  { label: "anysphere", value: "anysphere" },
];

const snippets = {
  typescript: [
    "type Counter = { count: number; step: number };",
    "const state: Counter = { count: 0, step: 1 };",
    "const increment = (counter: Counter) => counter.count + counter.step;",
    "console.log(`next count: ${increment(state)}`);",
  ].join("\n"),
  python: [
    "def score(items):",
    "    total = sum(items)",
    '    return f"score: {total / len(items):.1f}"',
    "print(score([8, 10, 12]))",
  ].join("\n"),
  go: [
    "package main",
    'import "fmt"',
    "func add(a int, b int) int { return a + b }",
    'func main() { fmt.Println("total:", add(2, 3)) }',
  ].join("\n"),
  rust: [
    "fn total(values: &[i32]) -> i32 {",
    "    values.iter().sum()",
    "}",
    'println!("total: {}", total(&[2, 3, 5]));',
  ].join("\n"),
  cpp: [
    "#include <iostream>",
    "int add(int a, int b) { return a + b; }",
    "int main() {",
    '  std::cout << "total: " << add(2, 3) << "\\n";',
    "}",
  ].join("\n"),
};

const CodeMarkdownPlayground = () => {
  const [language, setLanguage] = useState("typescript");
  const [themeName, setThemeName] = useState("current");
  const [highlightLine, setHighlightLine] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const theme = useMemo(
    () => (themeName === "current" ? portfolioTheme : themeName),
    [themeName],
  );
  const snippet = snippets[language];

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          id="code-markdown-language"
          label="Language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          options={languageOptions}
          className="sm:flex-1"
        />
        <Select
          id="code-markdown-theme"
          label="Theme"
          value={themeName}
          onChange={(event) => setThemeName(event.target.value)}
          options={themeOptions}
          className="sm:flex-1"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <CodeMarkdownBlock
          language={language}
          theme={theme}
          showLanguage
          showLineNumbers={lineNumbers}
          highlightLines={highlightLine ? [2] : []}
          className="border-0"
        >
          {snippet}
        </CodeMarkdownBlock>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Toggle
          id="code-markdown-line-highlight"
          label="Line highlight"
          checked={highlightLine}
          onChange={(event) => setHighlightLine(event.target.checked)}
          className="sm:flex-1"
        />
        <Toggle
          id="code-markdown-line-numbering"
          label="Line numbering"
          checked={lineNumbers}
          onChange={(event) => setLineNumbers(event.target.checked)}
          className="sm:flex-1"
        />
      </div>
    </section>
  );
};

export default CodeMarkdownPlayground;
