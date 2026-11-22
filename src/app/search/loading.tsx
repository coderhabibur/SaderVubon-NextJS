export default function SearchLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="h-4 w-10 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Search Header Bar Skeleton */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-gray-200/90 shadow-2xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-6 w-48 bg-gray-300 rounded-lg" />
              <div className="h-3.5 w-32 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-10 w-40 bg-gray-100 rounded-xl border border-gray-200" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 border border-gray-200/90 shadow-2xs flex flex-col space-y-3"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-2xl" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="flex items-center justify-between pt-2 mt-auto">
                <div className="h-5 w-16 bg-emerald-100 rounded" />
                <div className="h-9 w-24 bg-amber-400/40 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
