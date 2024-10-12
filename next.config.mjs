/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options:{
        remarkPlugins: [remarkGfm],
        rehypePlugins: []
    }
 }
);
const nextConfig = withMDX({
    pageExtensions: ["jsx","js","mdx"],
})
  
export default nextConfig;
