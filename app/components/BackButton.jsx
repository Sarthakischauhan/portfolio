import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const baseClass =
  "inline-flex items-center gap-2 text-nav tracking-nav text-white/70 transition-colors hover:text-white";

const BackButton = ({ href = "/", label = "back home", className = "" }) => (
  <Link href={href} className={`${baseClass} ${className}`}>
    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    <span>{label}</span>
  </Link>
);

export default BackButton;
