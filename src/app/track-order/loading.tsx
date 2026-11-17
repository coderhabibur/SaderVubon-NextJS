export default function TrackOrderLoading() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16 animate-pulse font-sans">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6 text-center">
          <div className="space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 mx-auto" />
            <div className="h-7 w-48 bg-gray-300 rounded-xl mx-auto" />
            <div className="h-4 w-72 bg-gray-200 rounded mx-auto" />
          </div>

          <div className="space-y-3 pt-2">
            <div className="h-12 w-full bg-gray-100 rounded-2xl border border-gray-200" />
            <div className="h-12 w-full bg-emerald-600/70 rounded-2xl" />
          </div>

          {/* Timeline Skeleton */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center px-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="h-3 w-12 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
