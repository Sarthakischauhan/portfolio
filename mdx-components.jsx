import InlineCode from './app/components/InlineCode'

export function useMDXComponents(components) {
    return {
      ...components,
      code: InlineCode,
    }
  }