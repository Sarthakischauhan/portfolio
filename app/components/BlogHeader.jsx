import React from 'react'
import moment from 'moment-timezone'

export default function BlogHeader({ children, date }) {
  const childrenArray = React.Children.toArray(children)
  const title = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === 'h1'
  )

  const tags = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === 'p' && child.props.className === 'tag'
  )

  return (
    <header className="rounded-lg">
      <div className="flex flex-col items-center">
        {title && <h1 className="text-4xl font-bold mb-4">{title.props.children}</h1>}
        <time className="text-sm text-gray-400 mb-4 block">
          {moment(new Date(date)).format("MMMM Do YYYY")}
        </time>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
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
