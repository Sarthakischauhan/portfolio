"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Tiles({ workExperience = [] }) {
  const [expandedRole, setExpandedRole] = useState(null);

  const roles = useMemo(
    () => [
      {
        id: "software-engineer",
        title: "Software Engineer",
        duration: "2025 - now",
        detail: "Building web interfaces, agents and microservices at Tesla.",
      },
      {
        id: "sr-intern",
        title: "Sr. Intern",
        duration: "May 25",
        detail:
          workExperience[0]?.roledesc ??
          "Built a design system coding agent adopted by 800+ frontend developers.",
      },
      {
        id: "intern",
        title: "Intern",
        duration: "May 24",
        detail:
          workExperience[1]?.roledesc ??
          "Built key Tesla Insurance features across web and mobile surfaces.",
      },
    ],
    [workExperience]
  );

  const toggleRole = (roleId) => {
    setExpandedRole((currentRole) =>
      currentRole === roleId ? null : roleId
    );
  };

  return (
    <div className="flex flex-col">
      <h4 className="opacity-60 font-medium text-section-heading">EXPERIENCE</h4>
      <div className="mt-2">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-1 align-center">
            <h2 className="text-white text-body">Tesla</h2>
            <Link href={"https://www.tesla.com/drive"} className="self-center">
              <ArrowUpRight className="w-3 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 w-full opacity-60">
            {roles.map((role, index) => {
              const isExpanded = expandedRole === role.id;

              return (
                <div key={role.id} className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-3 w-full">
                    <h4 className="text-white/80 min-w-0">{role.title}</h4>
                    <div className="ml-auto flex items-center gap-2 shrink-0">
                      <h4 className="text-white/70">{role.duration}</h4>
                      <button
                        type="button"
                        onClick={() => toggleRole(role.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle ${role.title} details`}
                        className="text-white/45 transition-all duration-200 hover:text-white/80"
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ease-out ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-0.5 pr-8 text-[11px] leading-relaxed text-white/65">
                        {role.detail}
                      </p>
                    </div>
                  </div>
                  {index < roles.length - 1 ? (
                    <div className="border-b border-gray-300 opacity-10"></div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
