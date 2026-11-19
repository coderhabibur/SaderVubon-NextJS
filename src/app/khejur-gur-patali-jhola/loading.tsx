export default function KhejurGurLoading() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen animate-pulse font-sans">
      {/* 1. Brand Bar Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between p-3.5 sm:px-6 rounded-2xl bg-white border border-[#E5D4C4] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#E5D4C4]/60" />
            <div className="space-y-1.5">
              <div className="h-5 w-28 bg-[#DEC7B2]/70 rounded-md" />
              <div className="h-3 w-36 bg-[#DEC7B2]/40 rounded" />
            </div>
          </div>
          <div className="hidden md:block h-7 w-64 bg-[#FAF2E8] border border-[#E5D4C4] rounded-full" />
          <div className="h-10 sm:h-11 w-36 sm:w-44 bg-[#8B3A14]/30 rounded-full" />
        </div>
      </div>

      {/* 2. Centered Hero Section Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 pt-8 pb-16 sm:pb-20">
        <div className="max-w-4xl xl:max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Rating Pill Skeleton */}
          <div className="h-7 w-64 bg-[#FAF1E6] border border-[#E5D0BC] rounded-full mb-4" />

          {/* Headline Molasses Banner Skeleton */}
          <div className="w-full max-w-3xl h-28 sm:h-24 bg-[#7A2E12]/85 border-2 border-[#C25E18]/60 rounded-2xl sm:rounded-3xl mb-6 flex flex-col items-center justify-center gap-2.5 px-6">
            <div className="h-5 w-4/5 bg-white/30 rounded-lg" />
            <div className="h-4 w-1/2 bg-amber-300/40 rounded-md" />
          </div>

          {/* Centered CTA Button Skeleton */}
          <div className="w-64 sm:w-72 h-14 bg-gradient-to-r from-[#8B3A14] via-[#A8471B] to-[#8B3A14] rounded-2xl mb-8 sm:mb-10 shadow-lg border border-[#C25E18]/70" />

          {/* Centerpiece Showcase Image Frame Skeleton */}
          <div className="relative max-w-xl sm:max-w-2xl lg:max-w-3xl w-full mx-auto bg-white rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4.5 border-2 border-[#E5D4C4] shadow-xl">
            <div className="w-full aspect-[16/10] bg-[#F8EFE4] rounded-2xl sm:rounded-3xl" />
          </div>

          {/* Reassurance Line Skeleton */}
          <div className="h-5 w-80 max-w-full bg-[#5C240D]/20 rounded-full mt-7 sm:mt-9" />
        </div>
      </div>

      {/* 3. Trust Pillars Ribbon Skeleton (Max-w-7xl) */}
      <div className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-xs border border-[#E5D4C4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#FAF7F2] p-2.5 sm:p-3 lg:p-3.5 rounded-xl sm:rounded-2xl border border-[#E5D4C4] flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-[#8B3A14]/15 shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-4 w-20 bg-gray-300/80 rounded" />
                  <div className="h-3 w-28 bg-gray-200/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
