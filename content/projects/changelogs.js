export const changelogs = {
  symphony: {
    name: "Symphony",
    source: "https://github.com/Sarthakischauhan/symphony",
    description: "Release notes for the coding agent, core, and harness.",
    releases: [
      {
        tag: "v0.0.8",
        date: "2026-11-22",
        title: "Configuration startup hotfix",
        summary: "The coding agent can start with older configs that contain unknown fields. Core and harness remain on 0.0.7.",
        changes: [
          "Remove unknown fields when refreshing config.json and continue to validate recognized settings.",
          "Fix migration of partial shell tool settings.",
          "Run symphony update to upgrade a PyPI installation without loading the config.",
        ],
      },
      {
        tag: "v0.0.7",
        date: "2026-11-21",
        title: "Connection reuse, prompt caching, and themes",
        summary: "Providers reuse HTTP connections across requests, and the coding agent responds faster during streaming and session startup.",
        changes: [
          "OpenAI and Anthropic requests use provider-specific prompt caching. Usage and cost reports account for cache reads and writes.",
          "Concurrent streams use separate pooled connections, and the coding agent closes them on shutdown.",
          "OpenAI reasoning settings follow the model catalog, and incomplete responses include their reason.",
          "Plugins can ship themes. Preview them with /theme or manage them with symphony themes.",
        ],
      },
      {
        tag: "v0.0.6",
        date: "2026-11-03",
        title: "Skills, plugins, and provider usage",
        summary: "Manage skills and plugins from the CLI or the TUI, and check usage for supported providers.",
        changes: [
          "Install skills and plugins from a path, Git URL, or marketplace. Plugins can load skills from Codex, Claude, and Cursor manifests.",
          "The harness gives the model a configurable skill catalog and opens skill instructions through the file tool.",
          "Plugin installs now use a dedicated state file. The previous plugin entries and authorized roots settings are no longer read.",
          "Starting a new conversation clears the previous session’s artifacts and stops its background jobs and subagents.",
        ],
      },
      {
        tag: "v0.0.5",
        date: "2026-10-31",
        title: "Session costs and background tasks",
        summary: "See estimated costs by model and track background work and artifacts from the TUI.",
        changes: [
          "Session cost estimates survive restarts and include cache and reasoning usage when pricing is available.",
          "The agent discovers workspace instructions and nested skills, plus shared skills from the user directory.",
          "Subagents prefer a lower-ranked model from the parent’s provider where available.",
          "The model catalog drops retired IDs and updates Gemini text and image generation defaults.",
        ],
      },
      {
        tag: "v0.0.4",
        date: "2026-10-29",
        title: "Session artifacts and realtime voice",
        changes: [
          "Save HTML, CSV, JSON, and images as session artifacts with sandboxed previews in the TUI and Symphony Web.",
          "Core adds realtime voice sessions for Grok, OpenAI, Gemini Live, and Vercel AI Gateway, plus provider-specific speech APIs and a voice catalog.",
        ],
      },
      {
        tag: "v0.0.3",
        date: "2026-10-21",
        title: "Self-update and Web download fixes",
        summary: "The coding agent now honors update settings and uses certifi alongside system certificates for update checks and web assets.",
        changes: [
          "Update 0.0.1 or 0.0.2 manually using the instructions in the GitHub release.",
        ],
      },
      {
        tag: "v0.0.2",
        date: "2026-10-21",
        title: "Symphony Web",
        summary: "Run the coding agent in a local browser with the same sessions, providers, tools, and approvals as the TUI.",
        changes: [
          "The CLI downloads the matching web bundle and supports updating or rolling it back.",
          "Protocol 3 adds structured tool output, approval details, and subagent events for the web and terminal interfaces.",
        ],
      },
      {
        tag: "v0.0.1",
        date: "2026-10-17",
        title: "First PyPI release",
        summary: "Initial release of symphony-code, symphony-core, and symphony-harness.",
      },
    ],
  },
  "chat-sdk": {
    name: "Chat SDK",
    source: "https://github.com/Sarthakischauhan/chat-sdk",
    description: "Release notes for @sarchauhan/chat, the embeddable React chat UI.",
    releases: [
      {
        tag: "chat-0.0.2",
        date: "2026-10-21",
        title: "Tool views, artifacts, and subagent activity",
        summary: "Chat SDK now renders Symphony protocol 3 events, including questions that users can answer inline.",
        changes: [
          "File, search, patch, terminal, and subagent rows show running, completed, approval, and error states.",
          "Artifact cards preview files and images, and subagent activity is available in the chat UI.",
          "Improve composer integration, attachments, model selection, message wrapping, and scrolling.",
          "Requires @sarchauhan/protocol 0.0.3 for artifact, subagent, context, and usage helpers. The adapter remains on 0.0.1.",
        ],
      },
      {
        tag: "chat-0.0.1",
        date: "2026-10-18",
        title: "First npm release",
        summary: "Initial release of the embeddable React chat UI.",
      },
    ],
  },
};
