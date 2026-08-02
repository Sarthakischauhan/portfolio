"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Tiles() {
  const roles = [
    { title: "Software Engineer", duration: "2025 - now" },
    { title: "Sr. Intern", duration: "May 25" },
    { title: "Intern", duration: "May 24" },
  ];

  return (
    <div className="flex flex-col">
      <h4 className="opacity-60 font-medium text-section-heading">EXPERIENCE</h4>
      <div className="mt-2">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-1 align-center">
            <h2 className="text-white text-body">
              Tesla
            </h2>
            <Link href={"https://www.tesla.com/drive"} className="self-center">
              <ArrowUpRight className="w-3 h-4"/>
            </Link>
          </div>
          <div className="flex flex-col gap-3 w-full opacity-60">
            {roles.map((role, index) => (
                <div key={role.title} className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-3 w-full">
                    <h4 className="text-white/80 min-w-0">{role.title}</h4>
                    <div className="ml-auto flex items-center gap-2 shrink-0">
                      <h4 className="text-white/70">{role.duration}</h4>
                    </div>
                  </div>
                  {index < roles.length - 1 ? (
                    <div className="border-b border-gray-300 opacity-10"></div>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
