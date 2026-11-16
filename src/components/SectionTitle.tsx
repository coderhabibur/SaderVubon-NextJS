interface SectionTitleProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function SectionTitle({ badge, title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      {/* Small Green Badge */}
      <span className="text-xs sm:text-sm font-black text-brand-green uppercase tracking-wider block mb-2">
        {badge}
      </span>

      {/* Big Bold Black Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2.5">
        {title}
      </h2>

      {/* Soft Grey Description Subtitle */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
