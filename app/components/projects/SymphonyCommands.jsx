"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import assets from "../../../content/projects/symphony-assets.json";

const commands = [
  { command: "/diff", image: "command-diff", title: "Review the changes", description: "Inspect the workspace diff, move between files, and see exactly what changed." },
  { command: "/learning", image: "command-learning", title: "Keep what the agent learns", description: "Browse curated memory from the current session and shared knowledge in one place." },
  { command: "Ctrl+G", image: "command-subagents", title: "Follow the subagents", description: "See delegated tasks and their status, then open a child session to inspect its work." },
  { command: "/model", image: "command-models", title: "Choose across model providers", description: "Browse models from different providers and switch the model behind your conversation." },
  { command: "/addons", image: "command-addons", title: "Extend the agent", description: "Inspect loaded add-ons, their tools and slash commands, and any loading failures. Reload changes with /reload." },
];

export default function SymphonyCommands() {
  const [active, setActive] = useState(0);
  const track = useRef(null);
  const frame = useRef(null);
  const activeRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    const element = track.current;
    const observer = new ResizeObserver(() => {
      element.scrollTo({ left: activeRef.current * element.clientWidth, behavior: "instant" });
    });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
  }, []);

  function move(index) {
    const next = Math.max(0, Math.min(commands.length - 1, index));
    setActive(next);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current.scrollTo({ left: next * track.current.clientWidth, behavior: reduced ? "instant" : "smooth" });
  }

  function handleScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = track.current;
      setActive(Math.max(0, Math.min(commands.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
    });
  }

  return (
    <div className="space-y-4" role="region" aria-roledescription="carousel" aria-label="Symphony slash commands">
      <div
        ref={track}
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); move(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        aria-label="Command screenshots. Use left and right arrows or swipe to browse."
        className="flex snap-x snap-mandatory overflow-x-auto rounded-lg border border-white/10 bg-[#0a0a0a] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {commands.map((item, index) => (
          <div key={item.command} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${commands.length}: ${item.command}`} className="aspect-[1300/908] w-full shrink-0 snap-center">
            {/* Load the current slide and its neighbors; distant captures wait. */}
            {Math.abs(active - index) <= 1 ? (
                <img src={assets[item.image]} alt={`Symphony ${item.command} view: ${item.title}.`} width="1300" height="908" loading="lazy" decoding="async" className="h-auto w-full" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <code className="text-xs text-white/85">{commands[active].command}</code>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => move(active - 1)} disabled={active === 0} aria-label="Previous command" className="rounded-sm p-1 text-white/60 transition-colors hover:text-white disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft size={14} aria-hidden="true" /></button>
          <button type="button" onClick={() => move(active + 1)} disabled={active === commands.length - 1} aria-label="Next command" className="rounded-sm p-1 text-white/60 transition-colors hover:text-white disabled:opacity-25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowRight size={14} aria-hidden="true" /></button>
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true" className="min-h-[4.5rem] space-y-1.5">
        <h3 className="text-xs text-white/90">{commands[active].title}</h3>
        <p className="text-[11px] leading-relaxed tracking-wide text-white/60">{commands[active].description}</p>
      </div>
    </div>
  );
}
