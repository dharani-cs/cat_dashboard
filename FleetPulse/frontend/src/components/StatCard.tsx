type StatCardProps = {
  title: string;
  value: string;
  tone?: "yellow" | "green" | "orange" | "red";
};

const toneClasses = {
  yellow: "text-yellow-500",
  green: "text-green-600",
  orange: "text-orange-500",
  red: "text-red-600",
};

export default function StatCard({ title, value, tone = "yellow" }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className={`mt-2 text-4xl font-bold ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}
