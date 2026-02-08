import React from 'react'
import CopyButton from './CopyButton'
const CodeSnippet = ({children}) => {
  const childrenArray = React.Children.toArray(children)
  // Find the pre element which contains the code block
  const preElement = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === "pre"
  )
  
  // Extract the raw text content from the MDX structure
  const getRawText = (node) => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(getRawText).join('')
    if (node?.props?.children) return getRawText(node.props.children)
    return ''
  }

  // Get the raw code content
  const rawContent = getRawText(preElement)
  const codeContent = preElement?.props?.children?.props?.children || ''

  // Not exactly needed but added by claude. Good addition and a fail safe check.
  const cleanedCode = rawContent
    .replace(/^```\w*\n?/, '') 
    .replace(/```$/, '')        
    .trim()

  return (
    <div className="relative w-full max-w-[50rem] overflow-x-auto my-4 border-[1.5px] border-imgborder rounded-[3px]">
      <CopyButton text={cleanedCode} />
      <pre className="rounded-s px-4 my-1">
        <code className="text-[13px] font-semibold font-mono whitespace-pre-wrap break-words text-white">
          {codeContent}
        </code>
      </pre>
    </div>
  )
}

export default CodeSnippet;