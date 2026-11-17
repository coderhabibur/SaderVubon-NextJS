export default function ProductLoading() {
  return (
    <div className="bg-white min-h-screen py-8 sm:py-12 animate-pulse">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>

        {/* 2-Column Product Detail Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square w-full bg-gray-100 rounded-3xl border border-gray-200/80" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-100 rounded-2xl border border-gray-200/60" />
              ))}
            </div>
          </div>

          {/* Right Column: Info Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="h-5 w-24 bg-emerald-100 rounded-full" />
            <div className="h-8 sm:h-10 w-4/5 bg-gray-200 rounded-xl" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-28 bg-amber-100 rounded" />
              <div className="h-4 w-20 bg-gray-100 rounded" />
            </div>

            <div className="h-10 w-44 bg-gray-200 rounded-xl" />

            <div className="space-y-2 py-4 border-y border-gray-100">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="space-y-3 pt-2">
              <div className="h-12 w-full bg-amber-400/50 rounded-2xl" />
              <div className="h-12 w-full bg-emerald-700/40 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
