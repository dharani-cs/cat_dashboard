"use client";

import AppShell from "@/components/AppShell";

export default function ProfilePage() {
  return (
    <AppShell title="Profile">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-white">
              AM
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Asha Menon</h3>
              <p className="text-sm text-slate-600">Fleet Operations Manager</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 p-3">Email: asha.menon@fleetpulse.com</div>
            <div className="rounded-xl border border-slate-200 p-3">Phone: +91 98765 43210</div>
            <div className="rounded-xl border border-slate-200 p-3">Region: Chennai Operations</div>
            <div className="rounded-xl border border-slate-200 p-3">Role: Supervisor / Maintenance Lead</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Account overview</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Active alerts</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Dispatches managed</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">48</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Preferences</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>SMS alerts</span>
                <span className="font-semibold text-emerald-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>Email summaries</span>
                <span className="font-semibold text-emerald-700">Enabled</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <span>Auto dispatch</span>
                <span className="font-semibold text-emerald-700">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
