const Toggle = ({
  id,
  label,
  checked = false,
  className = "",
  ...props
}) => {
  const toggleId = id || props.name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={toggleId}
      className={`group flex h-10 items-center justify-between gap-3 rounded-md border border-white/10 bg-[#171717] px-3 font-geist transition-colors hover:border-white/20 hover:bg-[#262626] ${className}`}
    >
      <span className="text-sm text-white/72 transition-colors group-focus-within:text-white/90">
        {label}
      </span>
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input
          id={toggleId}
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <span className="absolute inset-0 rounded-full border border-white/10 bg-[#0A0A0A] transition-colors peer-checked:border-white/20 peer-checked:bg-[#EDEDED] peer-focus-visible:ring-2 peer-focus-visible:ring-white/10" />
        <span className="absolute left-1 h-3 w-3 rounded-full bg-white/45 transition-all peer-checked:translate-x-4 peer-checked:bg-[#0A0A0A]" />
      </span>
    </label>
  );
};

export default Toggle;
