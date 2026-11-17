export default function ShopLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10 animate-pulse">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 1. Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded-md" />
          <div className="h-4 w-3 bg-gray-200 rounded-md" />
          <div className="h-4 w-24 bg-gray-200 rounded-md" />
        </div>

        {/* 2. Hero Banner Skeleton */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-emerald-950/80 via-emerald-900/70 to-emerald-950/80 mb-8 relative overflow-hidden">
          <div className="h-6 w-36 bg-emerald-800/60 rounded-full mb-3" />
          <div className="h-8 sm:h-10 w-64 sm:w-96 bg-emerald-800/80 rounded-xl mb-3" />
          <div className="h-4 w-full max-w-xl bg-emerald-800/50 rounded-md mb-2" />
          <div className="h-4 w-3/4 max-w-md bg-emerald-800/40 rounded-md" />
        </div>

        {/* 3. Main Shop Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar Skeleton */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-4 shadow-2xs">
              <div className="h-5 w-28 bg-gray-200 rounded-md" />
              <div className="space-y-2 pt-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <div className="h-4 w-28 bg-gray-100 rounded" />
                    <div className="h-4 w-6 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 space-y-4 shadow-2xs">
              <div className="h-5 w-24 bg-gray-200 rounded-md" />
              <div className="h-2 w-full bg-gray-100 rounded-full" />
              <div className="flex justify-between gap-3 pt-2">
                <div className="h-8 w-20 bg-gray-100 rounded-lg" />
                <div className="h-8 w-20 bg-gray-100 rounded-lg" />
              </div>
            </div>
          </aside>

          {/* Right Product Grid Skeleton */}
          <div className="lg:col-span-9">
            {/* Top Toolbar Skeleton */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="h-4 w-40 bg-gray-200 rounded-md" />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-100 rounded-xl" />
                <div className="h-8 w-24 bg-gray-100 rounded-xl" />
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
              {[...Array(6)].map((_, i) => (
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
    </div>
  );
}
