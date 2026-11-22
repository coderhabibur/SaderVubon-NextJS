export default function AccountLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-12 animate-pulse font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>

        {/* Tab Switcher Skeleton */}
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex bg-gray-200/80 p-1.5 rounded-2xl shadow-2xs">
            <div className="flex-1 h-11 bg-white rounded-xl shadow-xs" />
            <div className="flex-1 h-11 rounded-xl" />
          </div>

          {/* Auth Card Skeleton */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xs space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl mx-auto" />
              <div className="h-6 w-52 bg-gray-300 rounded-lg mx-auto" />
              <div className="h-3.5 w-64 bg-gray-200 rounded mx-auto" />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="h-3.5 w-32 bg-gray-200 rounded" />
                <div className="h-12 w-full bg-gray-100 rounded-xl border border-gray-200" />
              </div>

              <div className="space-y-2">
                <div className="h-3.5 w-24 bg-gray-200 rounded" />
                <div className="h-12 w-full bg-gray-100 rounded-xl border border-gray-200" />
              </div>

              <div className="h-12 w-full bg-emerald-600/70 rounded-xl pt-2" />
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <div className="h-3.5 w-48 bg-gray-200 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
