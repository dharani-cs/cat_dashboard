export default function ChartCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-slate-900">Maintenance Trend</h3>
      <div className="flex h-40 items-end gap-3 rounded-lg bg-slate-50 p-4">
        {[45, 70, 55, 85, 65, 90].map((height, index) => (
          <div key={index} className="flex-1 rounded-t-lg bg-yellow-400" style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}
