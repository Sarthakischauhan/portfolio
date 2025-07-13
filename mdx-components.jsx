import InlineCode from './app/components/InlineCode'
import BlockQuote from './app/components/BlockQuote'

export function useMDXComponents(components) {
    return {
      ...components,
      code: InlineCode,
      blockquote: (props) => <BlockQuote {...props} />, // Pass all props
    }
  }