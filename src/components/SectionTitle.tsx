interface SectionTitleProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function SectionTitle({ badge, title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 relative">
      {/* Decorative Golden Ambient Glow Behind Badge */}
      <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-32 h-10 bg-amber-400/15 blur-xl pointer-events-none rounded-full" />

      {/* Pill Badge with Gold Border & Shimmer */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-3.5 transition-transform duration-300 hover:scale-105">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-xs sm:text-sm font-extrabold text-emerald-800 tracking-wider uppercase">
          {badge}
        </span>
      </div>

      {/* Title with Gradient Polish */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-3">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
        {subtitle}
      </p>

      {/* Elegant Curved Underline Divider */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
        <span className="w-2 h-2 rotate-45 border-2 border-emerald-600 bg-amber-400 rounded-xs" />
        <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
      </div>
    </div>
  );
}
