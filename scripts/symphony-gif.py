"""Join real TUI captures into a user-controlled demo GIF (requires Pillow)."""
from pathlib import Path
from PIL import Image

output = Path("public/projects/symphony")
frames = [Image.open(output / name).convert("RGB") for name in ("frame-1.png", "frame-2.png", "tui.png")]
frames[0].save(output / "demo.gif", save_all=True, append_images=frames[1:], duration=[1600, 1800, 3000], loop=0, optimize=True)
