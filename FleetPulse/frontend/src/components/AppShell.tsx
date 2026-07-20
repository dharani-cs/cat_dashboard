"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Truck, Wrench, QrCode, FileBarChart, Settings, User, Bell, LogOut } from "lucide-react";
import CaterpillarLogo from "./CaterpillarLogo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/machines", label: "Machines", icon: Truck },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/qr-job-card", label: "QR Job Card", icon: QrCode },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("fleetpulse-user");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-72 border-r border-slate-200 bg-white/95 p-6 text-slate-800 shadow-sm backdrop-blur">
        <div className="mb-8">
          <CaterpillarLogo className="mb-2" />
        </div>
        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${active ? "bg-yellow-500 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-5 shadow-sm backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-600">Caterpillar Predictive Maintenance</p>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <div className="relative">
              <button onClick={() => setShowNotifications((value) => !value)} className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200">
                <Bell size={18} />
              </button>
              {showNotifications ? (
                <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <div className="mt-2 space-y-2 text-sm text-slate-600">
                    <p className="rounded-lg bg-amber-50 p-2">CAT-102: Hydraulic seal alert pending confirmation.</p>
                    <p className="rounded-lg bg-emerald-50 p-2">Maintenance dispatch completed for CAT-118.</p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative">
              <button onClick={() => setShowMenu((value) => !value)} className="rounded-full bg-slate-900 p-2 text-white">
                <User size={18} />
              </button>
              {showMenu ? (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="p-8">
          <div
            className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,247,237,0.88)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
