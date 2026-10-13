// One-off asset tooling, kept outside the application dependency tree.
// npm install --prefix /tmp/symphony-showcase-tools playwright mermaid
// SHOWCASE_TOOLS=/tmp/symphony-showcase-tools node scripts/render-symphony-assets.cjs
const fs = require("node:fs/promises");
const path = require("node:path");
const { createRequire } = require("node:module");
const tooling = process.env.SHOWCASE_TOOLS || "/tmp/symphony-showcase-tools";
const load = createRequire(path.join(tooling, "package.json"));
const { chromium } = load("playwright");

(async () => {
  const output = path.resolve("public/projects/symphony");
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium", args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1300, height: 1000 } });
    const captures = [["01-request", "frame-1"], ["02-explore", "frame-2"], ["03-result", "tui"], ["command-diff", "command-diff"], ["command-learning", "command-learning"], ["command-subagents", "command-subagents"]];
    for (const [source, target] of captures) {
      const svg = await fs.readFile(`/tmp/symphony-captures/${source}.svg`, "utf8");
      await page.setContent(`<style>body{margin:0;background:#0a0a0a}svg{display:block}</style>${svg}`);
      await page.locator("svg").screenshot({ path: `/tmp/symphony-captures/${target}.png` });
    }
    const symphony = process.env.SYMPHONY_SOURCE || "/workspace/symphony";
    const logo = await fs.readFile(path.join(symphony, "docs/assets/symphony-logo.svg"), "utf8");
    await page.setContent(`<style>body{margin:0}svg{display:block}</style>${logo}`);
    await page.locator("svg").screenshot({ path: "/tmp/symphony-captures/logo.png", omitBackground: true });
    await page.setContent('<style>body{margin:0;background:#0a0a0a}</style>');
    await page.addScriptTag({ path: load.resolve("mermaid/dist/mermaid.min.js") });
    const source = await fs.readFile(path.join(output, "workflow.mmd"), "utf8");
    const svg = await page.evaluate(async (source) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
      return (await mermaid.render("symphony-workflow", source)).svg;
    }, source);
    await fs.writeFile("/tmp/symphony-captures/workflow.svg", svg);
  } finally {
    await browser.close();
  }
})();
