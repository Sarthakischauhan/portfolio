import Link from 'next/link'
const ExternalCTA = ({action, content, icon}) => {
  return (
      <Link
        href={action}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center space-x-1 text-[12px] font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-[#f8f8f8] hover:bg-[#f0f0f0] dark:bg-[#202020] dark:hover:bg-[#282828] border border-[rgba(255,255,255,0.1)] rounded px-2.5 py-1.5 transition-colors duration-150"
      >

        <span>{content}</span>
        {icon}
      </Link>

  )
}

export default ExternalCTA