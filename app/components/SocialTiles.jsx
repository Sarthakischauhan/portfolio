import Link from "next/link";
import React from "react";

const baseLink =
  "relative text-white/60 hover:text-white transition-colors before:absolute before:left-0 before:-bottom-0.5 before:h-[1px] before:w-full before:scale-x-0 before:bg-gray-500 hover:before:animate-underline-lr";

const SocialTiles = () => {
  return (
    <div className="w-full py-2 mt-2 select-none font-geist text-nav">
      <div className="container mx-auto flex justify-start items-center space-x-3">
        <Link href="https://github.com/Sarthakischauhan" className={baseLink}>
          github
          <span className="sr-only">GitHub</span>
        </Link>

        <Link href="/Resume.pdf" className={baseLink}>
          resume
          <span className="sr-only">Resume</span>
        </Link>

        <Link
          href="https://www.linkedin.com/in/sarthakchauhan01/"
          className={baseLink}
        >
          linkedin
          <span className="sr-only">LinkedIn</span>
        </Link>

        <Link href="https://x.com/sarchauhann" className={baseLink}>
          twitter
          <span className="sr-only">Twitter</span>
        </Link>

        <Link
          href="https://dribbble.com/Sarthakischauhan"
          className={baseLink}
        >
          dribbble
          <span className="sr-only">Dribbble</span>
        </Link>
      </div>
    </div>
  );
};

export default SocialTiles;
