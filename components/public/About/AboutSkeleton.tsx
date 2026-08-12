export function AboutSkeleton() {
  return (
    <section className="py-10 pb-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32%_66%] gap-[26px]">
          {/* Chap — Profile Card skeleton */}
          <div className="self-start sticky top-[104px]">
            <div className="p-6 bg-card rounded-2xl border border-border">
              <div className="h-[340px] mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="pb-6 flex flex-col gap-3">
                <div className="h-7 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="flex gap-2.5 mt-2">
                  <div className="h-12 w-36 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                  <div className="h-12 w-36 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2.5 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* O'ng — Content skeleton */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-10 pt-12 pb-10 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="h-10 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-6 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              </div>
              <div className="flex items-center justify-between pb-5 border-b border-border">
                <div className="flex gap-10">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="h-10 w-16 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                      <div className="h-4 w-28 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="w-[110px] h-[110px] bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col gap-6">
                <div className="h-8 w-48 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="flex flex-wrap gap-[17.8px]">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
