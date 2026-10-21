"use client";

import { useState } from "react";
import { ReadFileWidget, PatchWidget, SearchWidget, QuestionWidget } from "@sarchauhan/chat/widgets";
import "./chat-sdk-demo.css";

export default function ChatSdkDemo() {
  const [answer, setAnswer] = useState(null);
  return (
    <div className="chat-root chat-sdk-demo rounded-lg border border-white/10 p-4" data-theme="dark" style={{ background: "#0a0a0a", color: "#ededed", "--chat-bg": "#0a0a0a", "--chat-primary": "#8ca0cc", "--chat-primary-fg": "#0a0a0a" }}>
      <p className="mb-5 text-xs text-white/55">Live SDK components · expand a tool to inspect its output.</p>
      <div className="space-y-3">
        <ReadFileWidget path="src/agent.ts" content={'import { Chat } from "@sarchauhan/chat";\n\nexport const App = () => <Chat adapter={adapter} />;'} language="tsx" state="complete" />
        <PatchWidget path="src/agent.ts" before={'<Chat adapter={adapter} />\n'} after={'<Chat adapter={adapter} showAttachments={false} />\n'} state="complete" />
        <SearchWidget query="ChatAdapter" results={[{ path: "src/adapter.ts", line: 3, text: "export const adapter: ChatAdapter = {" }, { path: "src/app.tsx", line: 2, text: 'import type { ChatAdapter } from "@sarchauhan/adapter";' }]} state="complete" />
      </div>
      <div className="mt-6 border-t border-white/10 pt-4">
        <QuestionWidget prompt="What would you build with it?" description="Try an interactive question. This demo runs locally in your browser." options={[{ label: "Coding agent", value: "coding", description: "Tools, diffs, and streamed replies." }, { label: "Support assistant", value: "support", description: "Answers, sources, and follow-up questions." }]} allowCustom={false} disabled={!!answer} onSubmit={(response) => setAnswer(response.values.join(", "))} />
        {answer && <div className="mt-3 flex items-center justify-between text-xs text-white/65"><span role="status">Saved for this demo.</span><button type="button" onClick={() => setAnswer(null)} className="underline underline-offset-4 hover:text-white">Try again</button></div>}
      </div>
    </div>
  );
}
