import React from 'react'

const CodeSnippet = ({children}) => {
  const childrenArray = React.Children.toArray(children)
  // Find the pre element which contains the code block
  const preElement = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === "pre"
  )
  
  // Extract the code content from the nested structure
  const codeContent = preElement?.props?.children?.props?.children || ''

  return (
    <div className="relative w-full max-w-[50rem] overflow-x-auto my-4 border-[1.5px] border-imgborder rounded-[3px]">
      <pre className="rounded-s p-4">
        <code className="text-[12px] font-medium font-mono whitespace-pre-wrap break-words text-white">
          {codeContent}
        </code>
      </pre>
    </div>
  )
}

export default CodeSnippet