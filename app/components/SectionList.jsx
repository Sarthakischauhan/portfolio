const sectionLabelClass =
  "text-xs font-geist uppercase tracking-section-label text-white/60";

export const SectionList = ({
  label,
  items,
  renderHeading,
  renderBody,
  getKey,
  animationDelay = 0.1,
}) => (
  <div
    className="animate-fade-in-up font-geist"
    style={{ animationDelay: `${animationDelay}s` }}
  >
    <p className={sectionLabelClass}>{label}</p>
    <div className="mt-3 flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index} className="space-y-2">
          <p className="flex items-baseline gap-3">
            {renderHeading(item, index)}
          </p>
          <div className="text-body text-white/70 leading-2">
            {renderBody(item, index)}
          </div>
        </div>
      ))}
    </div>
  </div>
);
