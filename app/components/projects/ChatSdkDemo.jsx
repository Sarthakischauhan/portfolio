"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Code2, Copy, RotateCcw, Sun, Moon } from "lucide-react";
import { ReadFileWidget, PatchWidget, SearchWidget, QuestionWidget, TerminalWidget, ApprovalWidget, ArtifactWidget, SubagentWidget } from "@sarchauhan/chat/widgets";
import { ChatContextProvider, ChatSelect } from "@sarchauhan/chat";
import CodeMarkdownBlock from "@/app/components/layout/CodeMarkdownBlock";
import { portfolioTheme } from "@/app/styles/portfolioTheme";
import "./chat-sdk-demo.css";
import "./chat-sdk-showcase.css";

const lightPreviewTheme = {
  name: "portfolio-preview-light",
  colors: {
    background: "#f7f7f8", foreground: "#171717", comment: "#64646e",
    keyword: "#a63242", typeKeywords: "#a63242", string: "#32633c",
    function: "#4d51a3", variable: "#171717", number: "#95562c",
    operator: "#64646e", punctuation: "#64646e", type: "#805d21",
    tag: "#326b66", attribute: "#365a90", constant: "#95562c",
    surface: "#ededf0", overlay: "#e8e8ec", subtext: "#64646e",
  },
};

const source = 'export async function runAgent(task: string) {\n  const session = await createSession();\n  return session.run(task, { stream: true });\n}\n';
const before = 'const adapter = createAdapter({\n  endpoint: "/api/chat",\n  stream: false,\n});\n';
const after = 'const adapter = createAdapter({\n  endpoint: "/api/chat",\n  stream: true,\n  reconnect: true,\n});\n';
const results = [{ path: "src/adapter.ts", line: 8, text: "export const adapter: ChatAdapter = {" }, { path: "src/chat.tsx", line: 12, text: "return <Chat adapter={adapter} />;" }, { path: "src/stream.ts", line: 24, text: "yield { id, role: 'assistant', parts };" }];
const artifact = { id: "release-notes", filename: "release-notes.md", mediaType: "text/markdown", status: "ready", content: "# Symphony 0.0.3\n\nThe coding agent now has a web interface.\n\n- Resume terminal sessions in your browser\n- Inspect tool calls and review diffs\n- Built with @sarchauhan/chat\n" };
const agent = { id: "review-1", title: "Code reviewer", task: "Review the streaming adapter and reconnect behavior.", state: "completed", summary: "Reviewed 3 files. The stream preserves message order after reconnect.", messages: [{ id: "review-msg", role: "assistant", parts: [{ type: "text", text: "Checked the adapter contract, event reducer, and reconnect handling. Message IDs remain stable across retries." }] }] };
const pickerRegistryUrl = "/projects/chat-sdk/model-registry.json?v=20261022";
const pickerAdapter = { async *sendMessage() {} };

function ModelPickerDemo() {
  return <ChatContextProvider adapter={pickerAdapter} registryUrl={pickerRegistryUrl} defaultProvider="openai">
    <ChatSelect />
    <p className="sdk-picker-note">Sample registry. Try search, provider filters, and model selection. No model requests are sent.</p>
  </ChatContextProvider>;
}

const examples = [
  { id: "model-picker", title: "Model picker", desc: "Search models, filter by provider, and choose a model with its thinking level.", variants: ["Models"], name: "ChatSelect", props: {} },
  { id: "read-file", title: "Read file", desc: "A quiet tool row. Open it to see exactly what the agent read.", variants: ["Complete", "Running", "Error"], name: "ReadFileWidget", props: { path: "src/agent.ts", content: source, state: "complete" } },
  { id: "patch", title: "Patch & diff", desc: "Changes with context, line numbers, and clear additions and removals.", variants: ["Adapter", "Prompt"], name: "PatchWidget", props: { path: "src/adapter.ts", before, after, state: "complete" } },
  { id: "search", title: "Search results", desc: "File matches and snippets, with enough context to follow the result.", variants: ["Results", "Empty"], name: "SearchWidget", props: { query: "adapter", results, state: "complete" } },
  { id: "terminal", title: "Terminal", desc: "Commands, output, exit codes. A failed run stays easy to inspect.", variants: ["Passed", "Running", "Failed"], name: "TerminalWidget", props: { command: "npm run test", output: "✓ adapter.test.ts (6 tests)\n✓ stream.test.ts (4 tests)\n\n10 tests passed\n", state: "complete", exitCode: 0, durationMs: 1420 } },
  { id: "question", title: "Questions", desc: "Let people choose, add context, and confirm before the agent continues.", variants: ["Single choice", "Multiple choice"], name: "QuestionWidget", props: { prompt: "What should the agent work on?", options: ["Streaming replies", "Tool widgets", "Session history"], allowCustom: true } },
  { id: "approval", title: "Approvals", desc: "Keep a person in the loop, with a clear action and explicit choices.", variants: ["Write file", "Run command"], name: "ApprovalWidget", props: { question: "to write this file?", target: "src/adapter.ts", detail: "Adds event replay when the connection is interrupted.", choices: ["Deny", "Allow once"], defaultChoice: "Allow once" } },
  { id: "artifacts", title: "Artifacts", desc: "Created files become previewable output, right inside the conversation.", variants: ["Document", "Image"], name: "ArtifactWidget", props: { artifact } },
  { id: "subagents", title: "Subagent activity", desc: "A compact task card with an activity view for the work behind it.", variants: ["Completed", "Working"], name: "SubagentWidget", props: { subagent: agent } },
];

function snippet(example, variant) {
  const props = { ...example.props };
  if (example.id === "read-file") props.state = variant.toLowerCase();
  if (example.id === "question") props.multiple = variant === "Multiple choice";
  if (example.id === "search" && variant === "Empty") props.results = [];
  if (example.id === "patch" && variant === "Prompt") Object.assign(props, { path: "src/prompt.ts", before: 'const prompt = "Help the user.";\n', after: 'const prompt = "Complete the task and verify the result.";\n' });
  if (example.id === "terminal" && variant !== "Passed") Object.assign(props, { state: variant === "Failed" ? "error" : "running", exitCode: variant === "Failed" ? 1 : undefined, durationMs: undefined, output: variant === "Failed" ? "FAIL stream.test.ts\nExpected cursor 42, received 0\n" : "Running adapter tests…\n" });
  if (example.id === "approval" && variant === "Run command") Object.assign(props, { question: "to run this command?", target: "npm run build", detail: "Builds the application in this workspace." });
  if (example.id === "artifacts" && variant === "Image") props.artifact = { id: "web-preview", filename: "symphony-web.webp", mediaType: "image/webp", status: "ready", url: "/projects/symphony/assets/web-view.webp" };
  if (example.id === "subagents" && variant === "Working") props.subagent = { ...agent, state: "running", progress: 0.65, summary: "Checking event replay and the reconnect cursor." };
  return props;
}

function Example({ example, theme }) {
  const [variant, setVariant] = useState(example.variants[0]);
  const [view, setView] = useState("preview");
  const [copyState, setCopyState] = useState("");
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const clearCopy = () => { clearTimeout(copyTimer.current); setCopyState(""); };
  const copyCode = async () => {
    clearCopy();
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
      else {
        const field = document.createElement("textarea");
        const focused = document.activeElement;
        field.value = code;
        field.setAttribute("readonly", "");
        field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.append(field);
        field.select();
        try { if (!document.execCommand("copy")) throw new Error("Copy unavailable"); }
        finally { field.remove(); focused?.focus(); }
      }
      setCopyState("Copied");
    }
    catch { setCopyState("Copy unavailable"); }
    copyTimer.current = setTimeout(() => setCopyState(""), 1800);
  };
  const [reset, setReset] = useState(0);
  const [answer, setAnswer] = useState("");
  const [filter, setFilter] = useState("");
  const props = snippet(example, variant);
  const code = example.id === "model-picker" ? `import { ChatContextProvider, ChatSelect } from "@sarchauhan/chat";
import "@sarchauhan/chat/styles.css";

// registryUrl returns { defaultProviderId, providers: [...] }.
// adapter is your application's ChatAdapter.
<ChatContextProvider adapter={adapter} registryUrl="${pickerRegistryUrl}">
  <ChatSelect />
</ChatContextProvider>` : `import { ${example.name} } from "@sarchauhan/chat/widgets";\nimport "@sarchauhan/chat/styles.css";\n\n<${example.name}\n${Object.entries(props).filter(([,v]) => v !== undefined).map(([k,v]) => `  ${k}={${JSON.stringify(v, null, 2)}}`).join("\n")}\n${example.id === "question" ? '  onSubmit={(answer) => console.log(answer)}\n' : example.id === "approval" ? '  onAnswer={(choice) => console.log(choice)}\n' : ""}/>`;
  const components = { "model-picker": ModelPickerDemo, "read-file": ReadFileWidget, patch: PatchWidget, search: SearchWidget, terminal: TerminalWidget, question: QuestionWidget, approval: ApprovalWidget, artifacts: ArtifactWidget, subagents: SubagentWidget };
  const Component = components[example.id];
  const liveProps = { ...props };
  if (example.id === "question") Object.assign(liveProps, { disabled: !!answer, onSubmit: (value) => setAnswer([...value.values, value.text].filter(Boolean).join(", ")) });
  if (example.id === "approval") liveProps.onAnswer = (choice) => setAnswer(choice);
  if (example.id === "read-file" && variant === "Error") liveProps.error = "File not found. Check the workspace path and try again.";
  if (example.id === "search") liveProps.results = props.results.filter(r => (r.path + r.text).toLowerCase().includes(filter.toLowerCase()));
  return <section id={example.id} className="sdk-example" aria-labelledby={`${example.id}-title`}>
    <div className="sdk-example-heading"><div><h3 id={`${example.id}-title`}>{example.title}</h3><p>{example.desc}</p></div></div>
    <div className="sdk-stage" data-preview-theme={theme}>
      <div className="sdk-stage-toolbar"><span className="sdk-stage-label"><span />{view === "preview" ? "Live preview" : "React / TSX"}</span><div className="sdk-toolbar-actions"><button type="button" aria-label={`Reset ${example.title}`} title="Reset demo" onClick={() => { setReset(r => r+1); setAnswer(""); setFilter(""); clearCopy(); }}><RotateCcw size={13} /></button><button type="button" aria-label={`Copy ${example.title} code`} onClick={copyCode}>{copyState === "Copied" ? <Check size={13}/> : <Copy size={13}/>}</button><button type="button" aria-label={`${view === "preview" ? "View" : "Hide"} ${example.title} code`} aria-pressed={view === "code"} onClick={() => setView(v=>v === "preview" ? "code" : "preview")}><Code2 size={14}/></button></div></div>
      <span className={copyState === "Copy unavailable" ? "sdk-copy-status" : "sr-only"} role="status">{copyState}</span>
      {view === "code" ? <div className="sdk-code"><CodeMarkdownBlock language="tsx" theme={theme === "light" ? lightPreviewTheme : portfolioTheme}>{code}</CodeMarkdownBlock></div> : <div className="sdk-preview chat-root chat-sdk-demo" data-theme={theme}>
        <div className="sdk-widget" key={`${variant}-${reset}`}>
          {example.id === "search" && <input className="sdk-filter" aria-label="Filter search results" placeholder="Filter files or matches…" value={filter} onChange={e=>setFilter(e.target.value)}/>}
          <Component {...liveProps}/>
          {answer && <p className="sdk-answer" role="status">{example.id === "approval" ? "Decision" : "Your answer"}: {answer} <span>· demo only</span></p>}
        </div>
      </div>}
      {example.variants.length > 1 && <div className="sdk-variants" role="group" aria-label={`${example.title} variants`}>{example.variants.map(v=><button key={v} type="button" aria-pressed={v === variant} onClick={()=>{setVariant(v);setAnswer("");setFilter("");clearCopy();}}>{v}</button>)}</div>}
    </div>
  </section>;
}

export default function ChatSdkDemo() {
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("read-file");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top); if(visible[0]) setActive(visible[0].target.id); }, { rootMargin: "-10% 0px -55% 0px" });
    examples.forEach(e=>{const el=document.getElementById(e.id);if(el) observer.observe(el);});
    return ()=>observer.disconnect();
  }, []);
  return <div className="sdk-gallery">
    <nav className="sdk-heading-rail" aria-label="On this page">
      {examples.map(example => (
        <a key={example.id} href={`#${example.id}`} aria-label={example.title}
          aria-current={active === example.id ? "location" : undefined}
          onClick={() => setActive(example.id)}>
          <span className="sdk-rail-bar" aria-hidden="true" />
          <span className="sdk-rail-label" aria-hidden="true">{example.title}</span>
        </a>
      ))}
    </nav>
    <aside className="sdk-sidebar"><div className="sdk-sidebar-inner"><div className="sdk-sidebar-heading"><span className="sdk-desktop-label">Components</span><button type="button" className="sdk-mobile-menu" aria-expanded={menuOpen} aria-controls="sdk-component-nav" onClick={() => setMenuOpen(open => !open)}><span>Components</span><span>{menuOpen ? "Close −" : "Browse +"}</span></button><div className="sdk-theme" role="group" aria-label="Preview theme"><button type="button" aria-label="Light previews" aria-pressed={theme === "light"} onClick={()=>setTheme("light")}><Sun size={13}/></button><button type="button" aria-label="Dark previews" aria-pressed={theme === "dark"} onClick={()=>setTheme("dark")}><Moon size={13}/></button></div></div><nav id="sdk-component-nav" className={menuOpen ? "sdk-nav-open" : ""} aria-label="Widget showcase">{examples.map((e)=><a key={e.id} href={`#${e.id}`} aria-current={active === e.id ? "location" : undefined} onClick={()=>{setActive(e.id);setMenuOpen(false);}}>{e.title}</a>)}</nav></div></aside>
    <div className="sdk-examples">{examples.map((e)=><Example key={e.id} example={e} theme={theme}/>)}</div>
  </div>;
}
