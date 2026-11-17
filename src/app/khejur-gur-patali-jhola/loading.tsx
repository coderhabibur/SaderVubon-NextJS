export default function KhejurGurLoading() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen animate-pulse font-sans">
      {/* 2. Brand Bar Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between p-3.5 sm:px-6 rounded-2xl bg-white border border-[#E5D4C4] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E5D4C4]/50" />
            <div className="space-y-1.5">
              <div className="h-5 w-28 bg-[#DEC7B2]/70 rounded-md" />
              <div className="h-3 w-36 bg-[#DEC7B2]/40 rounded" />
            </div>
          </div>
          <div className="hidden md:block h-7 w-64 bg-[#FAF2E8] border border-[#E5D4C4] rounded-full" />
          <div className="h-10 sm:h-11 w-36 sm:w-44 bg-[#8B3A14]/30 rounded-full" />
        </div>
      </div>

      {/* 3. Hero Section Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy Skeleton */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="h-7 w-64 bg-[#FAF1E6] border border-[#E5D0BC] rounded-full mx-auto lg:mx-0" />
            <div className="space-y-2.5">
              <div className="h-10 sm:h-12 w-4/5 bg-[#6E2E16]/20 rounded-2xl mx-auto lg:mx-0" />
              <div className="h-10 sm:h-12 w-3/5 bg-[#8B3A14]/25 rounded-2xl mx-auto lg:mx-0" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto lg:mx-0 pt-2">
              <div className="h-4 w-full bg-gray-200/80 rounded" />
              <div className="h-4 w-5/6 bg-gray-200/80 rounded mx-auto lg:mx-0" />
              <div className="h-4 w-2/3 bg-gray-200/80 rounded mx-auto lg:mx-0" />
            </div>

            {/* 4 Feature Badges Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#E5D4C4]">
                  <div className="w-8 h-8 rounded-xl bg-[#F6EDE2] shrink-0" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            {/* 2 CTA Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <div className="h-14 w-full sm:w-64 bg-[#8B3A14]/40 rounded-2xl" />
              <div className="h-14 w-full sm:w-56 bg-[#25D366]/30 rounded-2xl" />
            </div>
          </div>

          {/* Right Column: Interactive Showcase Skeleton */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl p-4 border-2 border-[#E5D4C4] shadow-md space-y-3">
              <div className="w-full aspect-[4/3] sm:aspect-square bg-[#F8EFE4] rounded-2xl" />
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-9 bg-[#FAF2E8] border border-[#DEC7B2] rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Trust Pillars Ribbon Skeleton */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-4 sm:p-6 border border-[#E5D4C4] shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E5D4C4] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B3A14]/15 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
