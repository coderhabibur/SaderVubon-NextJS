export default function HomeLoading() {
  return (
    <div className="bg-white font-sans overflow-hidden animate-pulse select-none">
      {/* 1. Hero Carousel Slider Skeleton (Exact Match to HeroSlider) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#fbf9f4] via-[#f7f5ed] to-[#ffffff] pt-3 pb-6 sm:py-12 lg:py-16">
        {/* Decorative Luxury Abstract Background Blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left Column: Text & CTAs (mobile: order-2, desktop: order-1) */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 bg-white/95 border border-emerald-200/90 px-3.5 py-1.5 rounded-full shadow-xs w-max mb-3.5">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                <div className="h-3.5 w-36 bg-emerald-100 rounded" />
              </div>

              {/* Headings */}
              <div className="space-y-2 mb-4">
                <div className="h-7 sm:h-9 lg:h-10 w-4/5 bg-gray-200/90 rounded-xl" />
                <div className="h-7 sm:h-9 lg:h-10 w-full bg-gray-300/80 rounded-xl" />
              </div>

              {/* Description Paragraph */}
              <div className="space-y-1.5 mb-6 max-w-xl">
                <div className="h-3.5 sm:h-4 w-full bg-gray-200/70 rounded" />
                <div className="h-3.5 sm:h-4 w-4/5 bg-gray-200/60 rounded" />
              </div>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                {/* Primary Button */}
                <div className="h-11 sm:h-13 w-44 sm:w-52 rounded-2xl bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] opacity-85 shadow-md" />
                {/* Secondary Button */}
                <div className="h-11 sm:h-13 w-36 sm:w-44 rounded-2xl bg-white/95 border border-gray-200 shadow-xs" />
              </div>

              {/* Small Trust Metrics Strip */}
              <div className="flex items-center gap-4 sm:gap-7 pt-4 border-t border-gray-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-200" />
                  <div className="h-3.5 w-20 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-200" />
                  <div className="h-3.5 w-24 bg-gray-200 rounded" />
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-300" />
                  <div className="h-3.5 w-20 bg-gray-200 rounded" />
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (mobile: order-1, desktop: order-2) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] aspect-[5/4] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl bg-gray-200/90 shadow-2xl border-4 border-white/90 overflow-hidden flex flex-col justify-between p-4 sm:p-5">
                {/* Floating "VERIFIED PURE" Tag (Top Right) */}
                <div className="self-end bg-white/95 px-3 py-1 rounded-full shadow-md border border-emerald-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="h-2.5 w-18 bg-emerald-100 rounded" />
                </div>

                {/* Bottom Glass Caption Pill */}
                <div className="self-center bg-black/60 rounded-full px-5 py-2 flex items-center gap-2.5">
                  <div className="h-3 w-20 bg-amber-400/80 rounded" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="h-3 w-40 bg-white/70 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2 pt-4 sm:pt-8">
            <div className="w-8 h-2.5 rounded-full bg-emerald-800/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* 2. Trust Feature Badges - Floating Glassmorphic Strip */}
      <section className="relative z-20 mt-3 sm:-mt-8 container mx-auto px-4 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-lg sm:shadow-xl shadow-emerald-950/5 border border-emerald-100/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 sm:gap-4 p-2 sm:p-0 rounded-xl bg-emerald-50/40 sm:bg-transparent border border-emerald-100/60 sm:border-none"
              >
                <div className="w-9 h-9 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-100/80 to-emerald-200/60 shrink-0 border border-emerald-200/80" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-4 sm:h-5 w-24 sm:w-28 bg-gray-200 rounded" />
                  <div className="h-3 sm:h-3.5 w-16 sm:w-20 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Categories Carousel Skeleton */}
      <section className="container mx-auto px-4 lg:px-8 py-8 sm:py-16 relative">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="h-3 w-16 bg-emerald-100 rounded" />
          </div>
          <div className="h-8 sm:h-10 w-64 sm:w-80 bg-gray-200 rounded-xl mx-auto mb-2.5" />
          <div className="h-4 w-72 sm:w-96 bg-gray-100 rounded mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-8 h-0.5 bg-amber-300 rounded-full" />
            <span className="w-2 h-2 rotate-45 border-2 border-emerald-600 bg-amber-400 rounded-xs" />
            <span className="w-8 h-0.5 bg-amber-300 rounded-full" />
          </div>
        </div>

        {/* Carousel Cards Strip */}
        <div className="flex gap-4 sm:gap-6 overflow-hidden py-3 px-1">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="group relative shrink-0 w-[180px] sm:w-[220px] md:w-[240px] h-[280px] sm:h-[300px] rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xs bg-gray-200/90 flex flex-col justify-between p-4 sm:p-5"
            >
              {/* Top Right Arrow Circle */}
              <div className="self-end w-8 h-8 rounded-full bg-white/70 shadow-xs" />

              {/* Bottom Gradient Overlay Box */}
              <div className="space-y-2 bg-gradient-to-t from-emerald-950/80 via-emerald-950/50 to-transparent p-3 rounded-2xl -mx-2 -mb-2">
                <div className="h-4 sm:h-5 w-24 bg-white/80 rounded" />
                <div className="h-3 w-16 bg-amber-300/80 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Deals & Combos Section Skeleton (Luxury Gradient Accent) */}
      <section className="py-10 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e4] to-[#fbf8f0] border-y border-amber-200/60">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="h-3 w-28 bg-amber-200 rounded" />
            </div>
            <div className="h-8 sm:h-10 w-72 sm:w-96 bg-gray-300/80 rounded-xl mx-auto mb-2" />
            <div className="h-4 w-64 sm:w-80 bg-gray-200 rounded mx-auto" />
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-xs flex flex-col overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="relative w-full pt-[92%] bg-gradient-to-b from-gray-50/60 to-white overflow-hidden">
                  <div className="absolute top-2.5 left-2.5 h-5 w-14 bg-amber-200/80 rounded-md" />
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-100" />
                </div>

                {/* Details Placeholder */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="h-3 w-16 bg-emerald-100 rounded mb-2" />
                    <div className="h-4 w-full bg-gray-200 rounded mb-1.5" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>

                  <div className="pt-2 border-t border-gray-100 mt-2 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <div className="h-6 w-20 bg-gray-300 rounded" />
                      <div className="h-4 w-12 bg-gray-100 rounded" />
                    </div>
                    {/* Order Button */}
                    <div className="h-9 sm:h-10 w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <div className="inline-block h-12 w-48 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 opacity-80 shadow-md" />
          </div>
        </div>
      </section>

      {/* 5. Clean White Product Section Skeleton */}
      <section className="bg-white py-10 sm:py-16 lg:py-20 relative border-t border-gray-200/70">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Title */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <div className="h-3 w-20 bg-emerald-100 rounded" />
            </div>
            <div className="h-8 sm:h-10 w-64 sm:w-80 bg-gray-200 rounded-xl mx-auto mb-2.5" />
            <div className="h-4 w-72 sm:w-96 bg-gray-100 rounded mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-8 h-0.5 bg-amber-300 rounded-full" />
              <span className="w-2 h-2 rotate-45 border-2 border-emerald-600 bg-amber-400 rounded-xs" />
              <span className="w-8 h-0.5 bg-amber-300 rounded-full" />
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-xs flex flex-col overflow-hidden"
              >
                <div className="relative w-full pt-[92%] bg-gradient-to-b from-gray-50/60 to-white" />
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="h-3 w-16 bg-emerald-100 rounded mb-2" />
                    <div className="h-4 w-full bg-gray-200 rounded mb-1.5" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                  <div className="pt-2 border-t border-gray-100 mt-2 space-y-3">
                    <div className="h-6 w-20 bg-gray-300 rounded" />
                    <div className="h-9 sm:h-10 w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
