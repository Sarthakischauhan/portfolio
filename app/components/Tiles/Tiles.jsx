import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Tiles() {
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
            <div className="flex justify-between w-full text-xs">
              <h4 className="text-white/80">Software Engineer</h4>
              <h4 className="text-white/70">2025 - now</h4>
            </div>
            <div className="border-b border-gray-300 opacity-10"></div>
            <div className="flex justify-between w-full text-xs">
              <h4 className="text-white/80">Sr. Intern</h4>
              <h4 className="text-white/70">may 25</h4>
            </div>
            <div className="border-b border-gray-300 opacity-10 text-xs"></div>
            <div className="flex justify-between w-full text-xs">
              <h4 className="text-white/80">Intern</h4>
              <h4 className="text-white/70">may 24</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
