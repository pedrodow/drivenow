export default function LoadingFrota() {
  return (
    <div className="px-5 py-12 md:px-16" aria-hidden="true">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-32 rounded bg-white/5" />
        <div className="mt-6 h-9 w-72 rounded bg-white/5" />
        <div className="mt-3 h-5 w-96 max-w-full rounded bg-white/5" />

        <div className="mt-10 flex gap-2 border-b border-white/5 pb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-white/5" />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass overflow-hidden rounded-lg">
              <div className="aspect-[4/3] bg-white/5" />
              <div className="flex flex-col gap-3 p-5">
                <div className="h-5 w-2/3 rounded bg-white/5" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-10 w-full rounded-lg bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
