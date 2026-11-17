export default function OrderSuccessLoading() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 sm:py-16 animate-pulse font-sans">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-lg text-center space-y-6">
          {/* Circular Success Badge Skeleton */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto" />

          {/* Heading Skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-300 rounded-xl mx-auto" />
            <div className="h-4 w-80 bg-gray-200 rounded mx-auto" />
          </div>

          {/* Order Info Pills */}
          <div className="flex justify-center gap-3 pt-2">
            <div className="h-8 w-32 bg-gray-100 rounded-full" />
            <div className="h-8 w-28 bg-emerald-50 rounded-full" />
          </div>

          {/* Order Details Card Skeleton */}
          <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-100 text-left space-y-3">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <div className="h-4 w-44 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <div className="h-5 w-24 bg-gray-300 rounded" />
                <div className="h-5 w-20 bg-emerald-200 rounded" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <div className="h-12 flex-1 bg-emerald-700/60 rounded-2xl" />
            <div className="h-12 flex-1 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
