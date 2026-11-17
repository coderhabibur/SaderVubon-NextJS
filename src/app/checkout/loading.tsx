export default function CheckoutLoading() {
  return (
    <div className="bg-gray-50/70 min-h-screen py-8 sm:py-12 animate-pulse font-sans">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="h-8 w-44 bg-gray-300 rounded-xl mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>

        {/* 2-Column Checkout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details Skeleton */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100" />
                <div className="h-6 w-48 bg-gray-200 rounded-lg" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-12 w-full bg-gray-100 rounded-xl border border-gray-200/60" />
                </div>

                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-12 w-full bg-gray-100 rounded-xl border border-gray-200/60" />
                </div>

                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                  <div className="h-20 w-full bg-gray-100 rounded-xl border border-gray-200/60" />
                </div>

                {/* Delivery Zone Cards Skeleton */}
                <div className="pt-2 space-y-2">
                  <div className="h-4 w-36 bg-gray-200 rounded" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-gray-100 rounded-2xl border border-gray-200" />
                    <div className="h-16 bg-gray-100 rounded-2xl border border-gray-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 bg-gray-100 rounded-2xl border border-gray-200" />
                <div className="h-14 bg-gray-100 rounded-2xl border border-gray-200" />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Skeleton */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300/60 shadow-md space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="h-6 w-36 bg-gray-200 rounded-lg" />
                <div className="h-4 w-16 bg-gray-100 rounded" />
              </div>

              {/* Items row skeletons */}
              <div className="space-y-3 py-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                      <div className="h-3 w-20 bg-gray-100 rounded" />
                    </div>
                    <div className="h-4 w-14 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>

              {/* Price Calculation Skeleton */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-14 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <div className="h-6 w-28 bg-gray-300 rounded" />
                  <div className="h-6 w-24 bg-emerald-200 rounded" />
                </div>
              </div>

              {/* Place Order CTA Skeleton */}
              <div className="h-14 w-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
