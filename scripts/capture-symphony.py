"""Capture real Symphony Textual widgets with deterministic, offline demo content.

Run with Symphony's installed Python environment:
  SYMPHONY_HOME=/tmp/symphony-capture /path/to/symphony/.venv/bin/python \
    scripts/capture-symphony.py

No model requests or user workspace edits are performed. SVGs are exported by Textual;
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
from coding_agent.tui.screens.diff import DiffModal
from coding_agent.tui.screens.learning import LearningModal
from coding_agent.addons.learning.store import LearningStore
from coding_agent.tui.runtime.subagent import SubagentRecord
from tempfile import TemporaryDirectory

DIFF = """diff --git a/src/client.py b/src/client.py
index 7af2330..9ee1630 100644
--- a/src/client.py
+++ b/src/client.py
@@ -1,2 +1,9 @@
-def fetch(client):
-    return client.get()
+def fetch(client, attempts=3):
+    for attempt in range(attempts):
+        try:
+            return client.get()
+        except ConnectionError:
+            if attempt == attempts - 1:
+                raise
+
+    raise ValueError("attempts must be positive")
"""

OUTPUT = Path("/tmp/symphony-captures")
OUTPUT.mkdir(parents=True, exist_ok=True)


async def main():
    # Disable agent initialization rather than loading credentials or a provider.
    with (
        patch("coding_agent.tui.app.build_agent", side_effect=RuntimeError("offline demo")),
        patch("coding_agent.tui.app.release_active"),
    ):
        app = CodingAgentApp(workspace="/tmp/symphony-demo", model_id="openai:gpt-5.6")
        async with app.run_test(size=(96, 32)) as pilot:
            await pilot.pause()
            for notice in app.query(Notice):
                await notice.remove()
            app.query_one(TopBar).set_context(app.workspace, "openai:gpt-5.6")
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
            app.query_one(PromptInput).text = "/diff"
            with patch("coding_agent.tui.screens.diff.read_workspace_diff", return_value=DIFF):
                app.push_screen(DiffModal(app.workspace))
                await pilot.pause()
                await app.workers.wait_for_complete()
                await pilot.pause()
                app.save_screenshot("command-diff.svg", path=str(OUTPUT))
                await pilot.press("escape")
                await pilot.pause()

            # Seed only temporary fixture storage, never the user's memory.
            with TemporaryDirectory(prefix="symphony-memory-") as fixture:
                root = Path(fixture)
                store = LearningStore(root / "workspace", session_id="retry-helper", global_root=root / "global")
                for fact in [
                    "The client raises ConnectionError for transient network failures.",
                    "Keep retry attempts bounded and preserve the final exception.",
                    "Add tests for both recovery and exhausted attempts.",
                ]:
                    job = store.enqueue_capture("retry helper", [{"role": "user", "content": fact}], "retry-helper")
                    store.complete_job(job, [{"text": fact, "topic": "client-retries"}])
                store.consolidate()
                app.query_one(PromptInput).text = "/learning"
                app.push_screen(LearningModal(app.workspace, session_id="retry-helper", store=store))
                await pilot.pause()
                app.save_screenshot("command-learning.svg", path=str(OUTPUT))
                await pilot.press("escape")
                await pilot.pause()

            app.query_one(PromptInput).text = ""
            app._subagents = {
                "tests": SubagentRecord(agent_id="tests", parent_id="main", label="Test coverage", prompt="Check recovery and exhausted-attempt behavior", status="completed", model_id="openai:gpt-5.6", output_text="Both retry paths have focused coverage."),
                "review": SubagentRecord(agent_id="review", parent_id="main", label="Client review", prompt="Review exception handling and retry bounds", status="running", model_id="openai:gpt-5.6"),
            }
            app.action_subagents()
            await pilot.pause()
            app.save_screenshot("command-subagents.svg", path=str(OUTPUT))


asyncio.run(main())
