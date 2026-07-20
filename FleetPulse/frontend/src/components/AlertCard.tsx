import { AlertTriangle } from "lucide-react";

const alerts = [
  "CAT-102 - Engine temperature high",
  "CAT-118 - Oil change due soon",
  "CAT-125 - Hydraulic pressure warning",
];

export default function AlertCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-500" size={20} />
        <h3 className="text-xl font-bold text-slate-900">Recent Alerts</h3>
      </div>
      <ul className="space-y-3 text-sm text-slate-600">
        {alerts.map((alert) => (
          <li key={alert} className="rounded-lg bg-slate-50 px-3 py-2">
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}
