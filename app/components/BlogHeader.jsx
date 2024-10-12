import React from 'react'
import moment from 'moment'

export default function BlogHeader({ children, date }) {
  const childrenArray = React.Children.toArray(children)
  const title = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === 'h1'
  )
  const desc = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === "h2"
  )
  const tags = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === 'p' && child.props.className === 'tag'
  )

  return (
    <header className="rounded-lg">
      <div className="flex flex-col items-center space-y-[20px]">
        <time className="text-sm text-white block">
            {moment(new Date(date)).format("MMMM Do YYYY")}
        </time>
        {title && <h1 className="text-4xl tracking-wide font-bold text-center m-0">{title.props.children}</h1>}
        {desc && <h2 className="text-sm tracking-wide text-center font-light m-0">{desc.props.children}</h2>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white bg-opacity-95 cursor-pointer text-black rounded-full text-sm"
              >
                {tag.props.children}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
