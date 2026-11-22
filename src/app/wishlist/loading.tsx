export default function WishlistLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>

        {/* Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="h-8 w-52 bg-gray-300 rounded-xl mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        </div>

        {/* Wishlist Items Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 border border-gray-200/90 shadow-2xs flex flex-col space-y-3"
            >
              <div className="w-full aspect-square bg-gray-100 rounded-2xl relative" />
              <div className="h-3.5 w-16 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="pt-2 mt-auto space-y-2">
                <div className="h-5 w-20 bg-emerald-100 rounded" />
                <div className="h-10 w-full bg-emerald-600/70 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
