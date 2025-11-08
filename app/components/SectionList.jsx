const sectionLabelClass =
  "text-xs font-mono uppercase tracking-[0.3em] text-white/50 sm:text-sm";

export const SectionList = ({
  label,
  items,
  renderHeading,
  renderBody,
  getKey,
  animationDelay = 0.1,
}) => (
  <div
    className="animate-fade-in-up font-mono"
    style={{ animationDelay: `${animationDelay}s` }}
  >
    <p className={sectionLabelClass}>{label}</p>
    <div className="mt-3 flex flex-col gap-4 pl-2">
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index} className="space-y-2">
          <p className="flex flex-wrap items-baseline gap-3 text-base sm:text-lg">
            <span className="text-xs font-semibold tracking-wide text-white/40 sm:text-sm">
              -
            </span>
            {renderHeading(item, index)}
          </p>
          <div className="ml-5 text-sm leading-relaxed text-white/70 sm:ml-6 sm:text-base">
            {renderBody(item, index)}
          </div>
        </div>
      ))}
    </div>
  </div>
);
