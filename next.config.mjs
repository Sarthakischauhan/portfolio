import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/llm.txt", destination: "/llms.txt", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
      {
        source: "/projects/symphony/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  pageExtensions: ["jsx", "js", "mdx"],
  experimental: {
    mdxRs: true,
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-highlight"],
  },
});

export default withMDX(nextConfig);
