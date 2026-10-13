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
    for (const [source, target] of [["01-request", "frame-1"], ["02-explore", "frame-2"], ["03-result", "tui"], ["04-commands", "commands"]]) {
      const svg = await fs.readFile(`/tmp/symphony-captures/${source}.svg`, "utf8");
      await page.setContent(`<style>body{margin:0;background:#0a0a0a}svg{display:block}</style>${svg}`);
      await page.locator("svg").screenshot({ path: path.join(output, `${target}.png`) });
    }
    await page.setContent('<style>body{margin:0;background:#0a0a0a}</style>');
    await page.addScriptTag({ path: load.resolve("mermaid/dist/mermaid.min.js") });
    const source = await fs.readFile(path.join(output, "workflow.mmd"), "utf8");
    const svg = await page.evaluate(async (source) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
      return (await mermaid.render("symphony-workflow", source)).svg;
    }, source);
    await fs.writeFile(path.join(output, "workflow.svg"), svg);
  } finally {
    await browser.close();
  }
})();
