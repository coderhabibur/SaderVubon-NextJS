export default function GlobalLoading() {
  return (
    <div className="bg-gray-50/60 flex-1 py-6 sm:py-10 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8 space-y-10">
        {/* 1. Homepage Hero Slider Skeleton */}
        <div className="rounded-3xl p-6 sm:p-12 lg:p-16 bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-emerald-950/80 relative overflow-hidden min-h-[300px] sm:min-h-[380px] flex flex-col justify-center">
          <div className="h-6 w-32 bg-emerald-800/70 rounded-full mb-4" />
          <div className="h-9 sm:h-12 w-3/4 max-w-xl bg-emerald-800/90 rounded-2xl mb-3" />
          <div className="h-5 w-full max-w-md bg-emerald-800/50 rounded-md mb-6" />
          <div className="flex gap-3">
            <div className="h-12 w-36 bg-amber-400/40 rounded-xl" />
            <div className="h-12 w-32 bg-white/20 rounded-xl hidden sm:block" />
          </div>
        </div>

        {/* 2. Horizontal Category Circles Row Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-44 bg-gray-300 rounded-lg" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2.5 shrink-0">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-emerald-100/70 border-2 border-emerald-200/50" />
                <div className="h-3.5 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Featured Products Grid Skeleton */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 bg-gray-300 rounded-lg" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200/80 shadow-2xs flex flex-col space-y-3"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-xl" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="flex items-center justify-between pt-2 mt-auto">
                  <div className="h-5 w-16 bg-emerald-100 rounded" />
                  <div className="h-8 w-20 bg-amber-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
