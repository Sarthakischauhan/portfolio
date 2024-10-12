import Link from 'next/link'
const ExternalCTA = ({action, content, icon}) => {
  return (
      <Link
        href={action}
        rel="noopener noreferrer"
        className="group inline-flex items-center space-x-1 text-[14px] font-medium text-gray-300 hover:text-gray-100 bg-[#202020] hover:bg-[#282828] border border-[rgba(255,255,255,0.1)] rounded px-2.5 py-1.5 transition-colors duration-150"
      >
        <span>{content}</span>
        {icon}
      </Link>

  )
}

export default ExternalCTA