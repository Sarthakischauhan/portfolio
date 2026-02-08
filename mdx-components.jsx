import { BlockQuote, InlineCode } from "./app/components";

export function useMDXComponents(components) {
  return {
    ...components,
    code: InlineCode,
    blockquote: (props) => <BlockQuote {...props} />, // Pass all props
  };
}
