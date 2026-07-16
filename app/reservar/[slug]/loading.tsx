export default function LoadingReservar() {
  return (
    <div className="px-5 py-12 md:px-16" aria-hidden="true">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-48 rounded bg-white/5" />
        <div className="mt-6 h-9 w-80 max-w-full rounded bg-white/5" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="h-6 w-48 rounded bg-white/5" />
            <div className="h-24 w-full rounded-lg bg-white/5" />
            <div className="h-24 w-full rounded-lg bg-white/5" />
          </div>
          <div className="h-64 w-full rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}
