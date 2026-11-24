export default function AdminLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse font-sans">
      {/* Top Banner Skeleton */}
      <div className="bg-white border border-blue-100 p-6 rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-3">
          <div className="h-4 w-28 bg-blue-100 rounded-full" />
          <div className="h-7 w-64 bg-slate-700/50 rounded-xl" />
          <div className="h-4 w-96 bg-blue-100 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-blue-600/30 rounded-xl" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-blue-100 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-700/60 rounded" />
              <div className="w-8 h-8 rounded-lg bg-blue-50" />
            </div>
            <div className="h-8 w-24 bg-slate-600/50 rounded-lg" />
            <div className="h-3 w-36 bg-blue-100 rounded" />
          </div>
        ))}
      </div>

      {/* Main Table / Grid Skeleton */}
      <div className="bg-white border border-blue-100 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-blue-100">
          <div className="h-6 w-40 bg-slate-700/50 rounded-lg" />
          <div className="h-9 w-60 bg-blue-100 rounded-xl" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-blue-50 rounded-xl border border-blue-100 flex items-center px-4 justify-between">
              <div className="h-4 w-48 bg-slate-700/40 rounded" />
              <div className="h-4 w-24 bg-slate-700/30 rounded" />
              <div className="h-8 w-20 bg-blue-900/30 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

