export default function Loading() {
  return (
    <section className="py-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chap — Profile card skeleton */}
          <div className="lg:self-start lg:sticky lg:top-[104px]">
            <div className="bg-card rounded-2xl border border-border p-6 animate-pulse">
              <div className="h-[350px] mb-5 rounded-2xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-xl mb-3" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-xl mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-xl mb-5" />
              <div className="flex gap-2.5 mb-4">
                <div className="h-12 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              </div>
              <div className="flex gap-2.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* O'rta — Work Experience + Expert Area skeleton */}
          <div className="flex flex-col gap-6">
            <div className="bg-card rounded-2xl border border-border p-8 animate-pulse">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-6">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="w-14 h-14 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                  <div className="flex-1">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 animate-pulse">
              <div className="h-6 w-44 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* O'ng — Recent Projects skeleton */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-44 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              </div>
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 mb-3 bg-gray-200 dark:bg-gray-800 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}