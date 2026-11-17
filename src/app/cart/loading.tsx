export default function CartLoading() {
  return (
    <div className="bg-gray-50/70 min-h-screen py-8 sm:py-12 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-300 rounded-xl mb-2" />
          <div className="h-4 w-60 bg-gray-200 rounded" />
        </div>

        {/* 2-Column Cart Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/90 shadow-2xs divide-y divide-gray-100">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 shrink-0" />
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="h-5 w-48 bg-gray-200 rounded mx-auto sm:mx-0" />
                    <div className="h-4 w-24 bg-gray-100 rounded mx-auto sm:mx-0" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-28 bg-gray-100 rounded-xl border border-gray-200" />
                    <div className="h-5 w-16 bg-emerald-100 rounded" />
                    <div className="w-8 h-8 rounded-full bg-red-50" />
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Actions row */}
            <div className="flex justify-between items-center pt-2">
              <div className="h-10 w-36 bg-gray-200 rounded-xl" />
              <div className="h-10 w-28 bg-gray-200 rounded-xl" />
            </div>
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
              <div className="h-6 w-32 bg-gray-200 rounded-lg pb-2 border-b border-gray-100" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-10 flex-1 bg-gray-100 rounded-xl" />
                  <div className="h-10 w-20 bg-emerald-100 rounded-xl" />
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                  <div className="h-6 w-20 bg-emerald-200 rounded" />
                </div>
              </div>

              <div className="h-12 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
