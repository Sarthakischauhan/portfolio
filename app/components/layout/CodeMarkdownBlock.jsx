"use client";

import { CodeMarkdown } from "@sarchauhan/code-markdown";

/**
 * Wrapper around CodeMarkdown component to be used inside a client component 
 * @param {*} props 
 * @returns 
 */
const CodeMarkdownBlock = (props) => <CodeMarkdown {...props} />;

export default CodeMarkdownBlock;
