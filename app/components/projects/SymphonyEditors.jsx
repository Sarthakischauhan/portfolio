"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import CodeMarkdownBlock from "../layout/CodeMarkdownBlock";
import { portfolioTheme } from "../../styles/portfolioTheme";
import { editors } from "../../../content/projects/symphony-content";

export default function SymphonyEditors() {
  return (
    <Tabs defaultValue="zed">
      <TabsList aria-label="Editor setup" className="flex w-fit max-w-full flex-wrap justify-start">
        {editors.map((editor) => (
          <TabsTrigger key={editor.id} value={editor.id}>
            <img src={editor.icon} alt="" width="16" height="16" className="h-4 w-4 opacity-80" />
            {editor.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {editors.map((editor) => (
        <TabsContent key={editor.id} value={editor.id} className="space-y-4">
          <p className="text-xs leading-relaxed tracking-wide text-white/60">{editor.instruction}</p>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <CodeMarkdownBlock language="json" theme={portfolioTheme} className="border-0">{editor.code}</CodeMarkdownBlock>
          </div>
          <a href={editor.docs} className="text-[11px] text-white/55 underline underline-offset-4 transition-colors hover:text-white">{editor.linkLabel} ↗</a>
        </TabsContent>
      ))}
    </Tabs>
  );
}
