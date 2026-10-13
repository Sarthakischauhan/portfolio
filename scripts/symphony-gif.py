"""Encode lossless WebP stills and animations from terminal captures (Pillow)."""
from pathlib import Path
import hashlib
import json
from PIL import Image

output = Path("public/projects/symphony")
captures = Path("/tmp/symphony-captures")
assets = output / "assets"
assets.mkdir(parents=True, exist_ok=True)
manifest_path = Path("content/projects/symphony-assets.json")
previous = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
manifest = {}

def publish(name, data, extension):
    digest = hashlib.sha256(data).hexdigest()[:12]
    filename = f"{name}.{digest}.{extension}"
    (assets / filename).write_bytes(data)
    manifest[name] = f"/projects/symphony/assets/{filename}"

for name in ("tui", "command-diff", "command-learning", "command-subagents", "logo"):
    destination = captures / f"{name}.webp"
    Image.open(captures / f"{name}.png").save(destination, lossless=True, method=6)
    publish(name, destination.read_bytes(), "webp")
frames = [Image.open(captures / name).convert("RGB") for name in ("frame-1.png", "frame-2.png", "tui.png")]
frames[0].save(captures / "demo.gif", save_all=True, append_images=frames[1:], duration=[1600, 1800, 3000], loop=0, optimize=True)
frames[0].save(captures / "demo.webp", save_all=True, append_images=frames[1:], duration=[1600, 1800, 3000], loop=0, lossless=True, method=6)
publish("demo", (captures / "demo.webp").read_bytes(), "webp")
publish("gif", (captures / "demo.gif").read_bytes(), "gif")
publish("workflow", (captures / "workflow.svg").read_bytes(), "svg")
for name in ("zed", "vscode"):
    publish(name, Path(f"scripts/assets/{name}.svg").read_bytes(), "svg")
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
# Only remove artifacts listed by the previous generated manifest.
for url in set(previous.values()) - set(manifest.values()):
    filename = Path(url).name
    candidate = assets / filename
    if candidate.exists():
        candidate.unlink()
