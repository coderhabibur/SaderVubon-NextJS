export default function ContactLoading() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14 animate-pulse font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Page Header Skeleton */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="h-6 w-36 bg-emerald-100 rounded-full mx-auto" />
          <div className="h-8 sm:h-10 w-64 sm:w-80 bg-gray-300 rounded-xl mx-auto" />
          <div className="h-4 w-full max-w-md bg-gray-200 rounded mx-auto" />
        </div>

        {/* 2-Column Contact Info & Form Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-5 w-44 bg-gray-300 rounded-md" />
                  <div className="h-3 w-40 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Message Form Skeleton (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xs space-y-5">
              <div className="space-y-1 pb-2">
                <div className="h-6 w-48 bg-gray-300 rounded-lg" />
                <div className="h-3.5 w-60 bg-gray-200 rounded" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3.5 w-20 bg-gray-200 rounded" />
                  <div className="h-11 w-full bg-gray-100 rounded-xl border border-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-24 bg-gray-200 rounded" />
                  <div className="h-11 w-full bg-gray-100 rounded-xl border border-gray-200" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3.5 w-20 bg-gray-200 rounded" />
                <div className="h-28 w-full bg-gray-100 rounded-xl border border-gray-200" />
              </div>

              <div className="h-12 w-full bg-emerald-600/70 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
