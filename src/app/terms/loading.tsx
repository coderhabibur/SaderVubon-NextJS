export default function TermsLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14 animate-pulse">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-10 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>

        {/* Page Header Card Skeleton */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8 space-y-4">
          <div className="h-6 w-44 bg-emerald-100 rounded-full" />
          <div className="h-8 sm:h-10 w-4/5 max-w-lg bg-gray-300 rounded-xl" />
          <div className="space-y-2 pt-1">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 rounded" />
          </div>
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="h-3.5 w-32 bg-gray-150 rounded" />
            <div className="h-3.5 w-36 bg-emerald-100/70 rounded" />
          </div>
        </div>

        {/* 3 Value Pillars Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Terms Sections Skeleton */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 shrink-0" />
                <div className="h-5 w-52 sm:w-64 bg-gray-300 rounded-md" />
              </div>
              <div className="pl-9 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-10/12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}

          {/* Support Section Skeleton */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="space-y-2 w-full sm:w-auto">
              <div className="h-4 w-60 bg-gray-300 rounded" />
              <div className="h-3 w-64 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-2.5 shrink-0">
              <div className="h-9 w-32 bg-white rounded-xl border border-gray-200" />
              <div className="h-9 w-28 bg-emerald-600/70 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
