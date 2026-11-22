export default function AboutLoading() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen py-6 sm:py-12 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>

        {/* HERO SECTION Skeleton */}
        <div className="rounded-3xl bg-gradient-to-br from-[#042618] via-[#063d27] to-[#031d13] p-6 sm:p-10 lg:p-14 mb-12 border border-emerald-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="h-7 w-56 bg-amber-400/20 rounded-full" />
              <div className="space-y-2">
                <div className="h-8 sm:h-12 w-full bg-emerald-800/80 rounded-2xl" />
                <div className="h-8 sm:h-12 w-4/5 bg-emerald-800/80 rounded-2xl" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="h-4 w-full bg-emerald-800/50 rounded-md" />
                <div className="h-4 w-11/12 bg-emerald-800/50 rounded-md" />
              </div>

              {/* Trust Checkpoints Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-400/30 shrink-0" />
                    <div className="h-4 w-44 bg-emerald-800/60 rounded" />
                  </div>
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <div className="h-12 w-36 bg-amber-400/40 rounded-xl" />
                <div className="h-12 w-40 bg-white/10 rounded-xl border border-white/20" />
              </div>
            </div>

            {/* Right Image Frame Skeleton (order-1 on mobile, order-2 on desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-3xl border-4 border-amber-400/20 bg-emerald-950/60 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] min-h-[340px] sm:min-h-[420px] lg:min-h-[460px]" />
            </div>
          </div>
        </div>

        {/* METRICS GRID Skeleton (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100" />
              <div className="h-7 w-24 bg-gray-300 rounded-lg" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* CORE VALUES GRID Skeleton (3 Cards) */}
        <div className="space-y-4 mb-14">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <div className="h-6 w-32 bg-emerald-100 rounded-full mx-auto" />
            <div className="h-8 w-64 bg-gray-300 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100" />
                <div className="h-5 w-44 bg-gray-300 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
