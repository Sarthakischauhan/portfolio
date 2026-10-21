export const quickStart = `import { Chat } from "@sarchauhan/chat";
import type { ChatAdapter } from "@sarchauhan/adapter";
import "@sarchauhan/chat/styles.css";

const adapter: ChatAdapter = {
  async *sendMessage() {
    yield {
      id: "reply-1",
      role: "assistant",
      parts: [{ type: "text", text: "Hello!" }],
    };
  },
};

export function App() {
  return <Chat adapter={adapter} />;
}`;

export const aiSdk = `import { Chat } from "@sarchauhan/chat";
import { createAiSdkAdapter } from "@sarchauhan/adapter/ai-sdk";
import "@sarchauhan/chat/styles.css";

const adapter = createAiSdkAdapter({
  chatUrl: "/api/chat",
  threadsUrl: "/api/threads",
});

export function App() {
  return <Chat adapter={adapter} />;
}`;
