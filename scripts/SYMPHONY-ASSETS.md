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
SHOWCASE_TOOLS=/tmp/symphony-showcase-tools node scripts/render-symphony-assets.cjs
/path/to/symphony/.venv/bin/python scripts/symphony-gif.py
```

The renderer uses `/usr/bin/chromium`; override `CHROMIUM_PATH` if needed.
Textual exports intermediate SVGs to `/tmp/symphony-captures`. The renderer
produces PNGs and renders `public/projects/symphony/workflow.mmd` to SVG.
Pillow joins the first three terminal captures into the GIF. The site serves
these static assets without shipping Mermaid or capture dependencies to users.
The GIF plays only when requested; pausing replaces it with the still capture.
