export default function GradientCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
      <div className="rounded-xl p-6 text-white bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-40 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-wider opacity-80">Plan</div>
        <div className="text-xl font-semibold">Indigo → Pink</div>
      </div>
      <div className="rounded-xl p-6 text-white bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 min-h-40 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-wider opacity-80">Plan</div>
        <div className="text-xl font-semibold">Emerald → Blue</div>
      </div>
      <div className="rounded-xl p-6 text-zinc-900 bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 min-h-40 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-wider opacity-70">Plan</div>
        <div className="text-xl font-semibold">Warm pastel</div>
      </div>
    </div>
  )
}
