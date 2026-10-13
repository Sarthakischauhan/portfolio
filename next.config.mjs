import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: "/projects/symphony/assets/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
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
