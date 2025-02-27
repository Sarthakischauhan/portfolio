/** @type {import('next').NextConfig} */
import rehypeHighlight from 'rehype-highlight';
import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options:{
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight]
    }
 }
);
const nextConfig = withMDX({
    pageExtensions: ["jsx","js","mdx"],
})
  
export default nextConfig;
