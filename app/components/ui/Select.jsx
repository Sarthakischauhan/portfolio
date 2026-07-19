import { ChevronDown } from "lucide-react";

const Select = ({
  id,
  label,
  options = [],
  className = "",
  selectClassName = "",
  ...props
}) => {
  const selectId = id || props.name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label
      htmlFor={selectId}
      className={`group block space-y-2 font-geist ${className}`}
    >
      {label ? (
        <span className="block text-[10px] font-medium uppercase tracking-section-label text-white/45 transition-colors group-focus-within:text-white/70">
          {label}
        </span>
      ) : null}
      <span className="relative block">
        <select
          id={selectId}
          className={`h-10 w-full appearance-none rounded-md border border-white/10 bg-[#171717] px-3 pr-9 text-sm text-white/80 outline-none transition-colors hover:border-white/20 hover:bg-[#262626] focus:border-white/35 focus:bg-[#171717] focus:ring-2 focus:ring-white/10 ${selectClassName}`}
          {...props}
        >
          {options.map((option) => {
            const value =
              typeof option === "string" ? option : option.value || option.label;
            const optionLabel = typeof option === "string" ? option : option.label;

            return (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-white/70"
          strokeWidth={1.8}
        />
      </span>
    </label>
  );
};

export default Select;
