"""Capture real Symphony Textual widgets with deterministic, offline demo content.

Run with Symphony's installed Python environment:
  SYMPHONY_HOME=/tmp/symphony-capture /path/to/symphony/.venv/bin/python \
    scripts/capture-symphony.py

No model requests or workspace edits are performed. SVGs are exported by Textual;
the public PNG/GIF assets are rasterized from these captures with Chromium.
Source: Sarthakischauhan/symphony @ e984c01acb021e7d2f785cfb651fce082737fca4
"""

import asyncio
import os
from pathlib import Path
from unittest.mock import patch

os.environ.setdefault("SYMPHONY_HOME", "/tmp/symphony-capture")

from coding_agent.tui.app import CodingAgentApp
from coding_agent.tui.chrome import TopBar
from coding_agent.tui.composer import PromptInput
from coding_agent.tui.transcript import UserMessage
from coding_agent.tui.transcript.messages import Notice
from coding_agent.tui.tools.snapshots import ToolCallSnapshot, ToolCallSummary

OUTPUT = Path("/tmp/symphony-captures")
OUTPUT.mkdir(parents=True, exist_ok=True)


async def main():
    # Disable agent initialization rather than loading credentials or a provider.
    with (
        patch("coding_agent.tui.app.build_agent", side_effect=RuntimeError("offline demo")),
        patch("coding_agent.tui.app.release_active"),
    ):
        app = CodingAgentApp(workspace="/tmp/symphony-demo", model_id="demo:scripted")
        async with app.run_test(size=(96, 32)) as pilot:
            await pilot.pause()
            for notice in app.query(Notice):
                await notice.remove()
            app.query_one(TopBar).set_context(app.workspace, "demo:scripted")
            app.mount_transcript(UserMessage("Add a retry helper and test the failure path."))
            app.set_assistant("I'll read the client, add a bounded retry, and check the tests.", new=True)
            app.finish_assistant()
            await pilot.pause()
            app.save_screenshot("01-request.svg", path=str(OUTPUT))
            app.mount_transcript(ToolCallSummary([
                ToolCallSnapshot("read", "read_file", "Read", "src/client.py"),
                ToolCallSnapshot("search", "search", "Search", "tests/ · retry coverage"),
            ], expanded=True))
            app.set_reasoning("Keep retries bounded. Preserve the original exception when attempts are exhausted.", new=True)
            app.finish_reasoning()
            await pilot.pause()
            app.save_screenshot("02-explore.svg", path=str(OUTPUT))
            app.mount_transcript(ToolCallSummary([
                ToolCallSnapshot("patch", "patch", "Patch", "src/client.py · tests/test_client.py"),
                ToolCallSnapshot("test", "bash", "Bash", "pytest tests/test_client.py", result="3 passed · scripted output"),
            ], expanded=True))
            await pilot.pause()
            app.set_assistant("Added bounded retries and coverage for recovery and exhausted attempts. Ready for diff review.", new=True)
            app.finish_assistant()
            await pilot.pause()
            app.save_screenshot("03-result.svg", path=str(OUTPUT))
            app.query_one(PromptInput).text = "/"
            await pilot.pause()
            app.save_screenshot("04-commands.svg", path=str(OUTPUT))


asyncio.run(main())
