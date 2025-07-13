export default function Blockquote({ children, type = 'default' }) {
  let className = 'border-l-4 pl-4 italic my-6 mt-10 mb-10';
  switch (type) {
    case 'warning':
      className += ' border-warning text-yellow-800 bg-yellow-50';
      break;
    case 'info':
      className += ' border-info text-blue-800 bg-blue-50';
      break;
    default:
      className += ' border-quote';
  }
  return (
    <blockquote className={className}>
      {children}
    </blockquote>
  );
}