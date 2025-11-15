"use client";

import { usePathname } from "next/navigation";
import BackButton from "./BackButton";

const RouteBackButton = () => {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const isBlogDetail = pathname.startsWith("/blog/") && pathname !== "/blog";
  const href = isBlogDetail ? "/blog" : "/";
  const label = isBlogDetail ? "back to blog" : "back home";

  return (
    <div className="fixed left-4 top-10 z-50 hidden sm:block md:left-8 md:top-6">
      <BackButton href={href} label={label} />
    </div>
  );
};

export default RouteBackButton;
