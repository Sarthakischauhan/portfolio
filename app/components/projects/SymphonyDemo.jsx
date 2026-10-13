"use client";

import { useState } from "react";
import { Play, Pause, ArrowUpRight } from "lucide-react";

export default function SymphonyDemo() {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[10px] text-white/50">
          <span>symphony / terminal</span>
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-pressed={playing}
            className="flex items-center gap-1.5 rounded-sm px-1 py-1 text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {playing ? <Pause size={11} aria-hidden="true" /> : <Play size={11} aria-hidden="true" />}
            {playing ? "Pause demo" : "Play demo"}
          </button>
        </div>
        <a href="/projects/symphony/tui.png" target="_blank" rel="noreferrer" aria-label="View the Symphony terminal capture at full size">
          {/* Native img keeps the GIF animation and the exported terminal pixels intact. */}
          <img
            src={playing ? "/projects/symphony/demo.gif" : "/projects/symphony/tui.png"}
            alt="Symphony terminal showing a request, grouped read and patch tools, a test command, and a response ready for diff review."
            width="1300"
            height="908"
            className="h-auto w-full"
          />
        </a>
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 text-[10px] leading-relaxed tracking-wide text-white/50">
        <span>Real TUI · scripted sample task · no live model calls</span>
        <a href="/projects/symphony/tui.png" target="_blank" rel="noreferrer" className="flex items-center gap-1 transition-colors hover:text-white">
          Full size <ArrowUpRight size={11} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
