# Symphony showcase assets

The logo comes from `docs/assets/symphony-logo.svg` in
[`Sarthakischauhan/symphony`](https://github.com/Sarthakischauhan/symphony)
at commit `e984c01acb021e7d2f785cfb651fce082737fca4` (MIT).
The screenshots capture that revision's actual Textual widgets with scripted
sample content. They do not depict a live model run or actual test execution.

To regenerate from the portfolio directory, install the Symphony workspace
dependencies in a separate source checkout, then run:

```sh
/path/to/symphony/.venv/bin/python scripts/capture-symphony.py
npm install --prefix /tmp/symphony-showcase-tools playwright@1.63.0 mermaid@11
SYMPHONY_SOURCE=/path/to/symphony SHOWCASE_TOOLS=/tmp/symphony-showcase-tools node scripts/render-symphony-assets.cjs
/path/to/symphony/.venv/bin/python scripts/symphony-gif.py
```

The renderer uses `/usr/bin/chromium`; override `CHROMIUM_PATH` if needed.
Textual exports intermediate SVGs to `/tmp/symphony-captures`. The renderer
produces intermediate PNGs and renders `public/projects/symphony/workflow.mmd`
to SVG. Pillow creates lossless WebP stills, an animated WebP, and a GIF export.
Only the current carousel slide and its neighbors are mounted. The animation
loads on play; pausing replaces it with a still. Mermaid and capture tools are
never shipped to the browser, and pre-encoded images avoid runtime image
transformation requests.

The encoder publishes content-hashed assets and writes
`content/projects/symphony-assets.json`. Their dedicated URL directory has a
one-year immutable cache header. Never overwrite a hashed filename with new
bytes: regenerate the manifest instead. The encoder removes obsolete files
only when they are listed in the prior manifest. Editable editor-icon sources
live in `scripts/assets`: Zed is from Simple Icons (CC0); VS Code is from
Devicon (MIT). Their logos identify the respective editors.

ACP configuration references: [Zed custom agents](https://zed.dev/docs/ai/external-agents#custom-agents)
and [VS Code ACP Client](https://github.com/formulahendry/vscode-acp), whose
`acp.agents` settings schema is defined in its package.json. VS Code requires
this extension. The examples use an absolute source-workspace executable path
and intentionally contain no credentials.
