const InlineCode = ({ children }) => {
  return (
    <code className="bg-white/10 text-inlinecode px-1.5 py-0.5 rounded-sm text-sm font-mono">
      {children}
    </code>
  );
};

export default InlineCode; 