import { LayoutDashboard, Truck, Wrench, AlertTriangle, QrCode, FileBarChart, Settings } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Truck, label: "Machines" },
  { icon: Wrench, label: "Maintenance" },
  { icon: AlertTriangle, label: "AI Prediction" },
  { icon: QrCode, label: "QR Job Card" },
  { icon: FileBarChart, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black p-6 text-white">
      <h1 className="mb-10 text-3xl font-bold text-yellow-400">FleetPulse</h1>
      <nav className="space-y-4">
        {navItems.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active ? "bg-yellow-500/20 text-yellow-400" : "text-slate-300"}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
