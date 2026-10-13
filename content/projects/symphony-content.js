import assets from "./symphony-assets.json";

export const harnessSnippet = `import asyncio
from pathlib import Path
from core_ai import build_default_registry, default_model_id
from core_harness import CoreHarness, HarnessConfig, Tool

def read_text(path: str) -> str:
    """Read a UTF-8 text file."""
    return Path(path).read_text(encoding="utf-8")

async def main():
    registry = build_default_registry()
    agent = CoreHarness(
        registry=registry,
        model_id=default_model_id(registry),
        system_prompt="Read the file and summarize it.",
        config=HarnessConfig(),
        tools=[Tool(read_text)],
    )
    result = await agent.run("Summarize README.md")
    print(result.output_text)

asyncio.run(main())`;

// Paths are intentionally local placeholders, not shell-expanded ~ paths.
const launch = {
  command: "/absolute/path/to/symphony/.venv/bin/symphony",
  args: ["acp"],
};

export const editors = [
  {
    id: "zed",
    name: "Zed",
    icon: assets.zed,
    instruction: "Add a custom agent in Zed's Agent Settings, then merge this entry into settings.json. Select Symphony in the Agent Panel to start a thread.",
    code: JSON.stringify({ agent_servers: { Symphony: { type: "custom", ...launch, env: {} } } }, null, 2),
    docs: "https://zed.dev/docs/ai/external-agents#custom-agents",
    linkLabel: "Zed setup",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: assets.vscode,
    instruction: "Install the ACP Client extension by formulahendry. Merge this entry into your user settings.json, then use ACP: Connect to Agent and select Symphony.",
    code: JSON.stringify({ "acp.agents": { Symphony: { ...launch, env: {} } } }, null, 2),
    docs: "https://marketplace.visualstudio.com/items?itemName=formulahendry.acp-client",
    linkLabel: "ACP Client extension",
  },
];
