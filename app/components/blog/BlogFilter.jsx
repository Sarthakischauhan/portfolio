"use client"
import { Filter, ListFilter } from "lucide-react";
import { useState } from "react";

const BlogFilter = ({ selectedTag, setSelectedTag, allTags }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-50 inline-flex font-geist">
      <button
        type="button"
        aria-label="Filter posts"
        className="inline-flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:border-white hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ListFilter className="h-4=5 w-5" />
      </button>
      {open ? (
        <div className="absolute right-0 top-full mt-2 min-w-[10rem] rounded-lg border border-white/10 bg-black/80 p-2 backdrop-blur z-[999] shadow-lg">
          <ul className="flex flex-col gap-1">
            {allTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  className={`w-full rounded-md px-2 py-1 text-left text-body transition-colors ${
                    selectedTag === tag ? "text-white" : "text-white/70"
                  } hover:text-white hover:bg-white/5`}
                  onClick={() => {
                    setSelectedTag(tag);
                    setOpen(false);
                  }}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default BlogFilter;
