"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

const baseAlerts = [
  { machine: "CAT-102", fault: "Engine temperature rising", severity: "Critical", eta: "2 min", part: "Cooling system / radiator", nextStep: "Reduce load immediately and move the machine to a safe stop zone. Contact the service team for inspection.", customerAction: "Please stop the machine and avoid further operation until the issue is assessed." },
  { machine: "CAT-103", fault: "Fuel efficiency drop", severity: "Warning", eta: "4 min", part: "Fuel injector", nextStep: "Inspect injector spray and clean or replace the component as needed.", customerAction: "Schedule a quick check and monitor fuel usage for the next cycle." },
  { machine: "CAT-104", fault: "Battery voltage fluctuation", severity: "Warning", eta: "5 min", part: "Battery / alternator", nextStep: "Test charging output and replace weak batteries to avoid sudden shutdown.", customerAction: "Avoid long idle periods and keep the charging system monitored." },
  { machine: "CAT-105", fault: "Excessive vibration", severity: "Critical", eta: "3 min", part: "Drive shaft bearing", nextStep: "Immediately inspect the bearings and reduce operating speed until serviced.", customerAction: "Stop operation and request urgent inspection." },
  { machine: "CAT-106", fault: "Oil pressure irregular", severity: "Warning", eta: "7 min", part: "Oil pump", nextStep: "Check pressure and fluid quality before continuing with heavy workloads.", customerAction: "Inspect oil level and contact support if the warning remains." },
  { machine: "CAT-107", fault: "Brake wear alert", severity: "Warning", eta: "8 min", part: "Brake pad assembly", nextStep: "Inspect brake pad thickness and replace if below safety threshold.", customerAction: "Reduce speed and plan a maintenance visit soon." },
  { machine: "CAT-108", fault: "Turbocharger lag", severity: "Warning", eta: "6 min", part: "Turbocharger", nextStep: "Evaluate boost pressure and inspect for air leaks.", customerAction: "Avoid high-load operation until the issue is reviewed." },
  { machine: "CAT-109", fault: "Cooling fan anomaly", severity: "Warning", eta: "9 min", part: "Cooling fan motor", nextStep: "Test fan operation and replace the motor if it is failing.", customerAction: "Keep the engine temperature under observation during the shift." },
  { machine: "CAT-110", fault: "Sensor drift detected", severity: "Warning", eta: "5 min", part: "Telemetry sensor", nextStep: "Recalibrate the sensor and confirm the reading against a manual check.", customerAction: "Do not rely on the sensor alone until it is validated." },
  { machine: "CAT-111", fault: "Transmission slip", severity: "Critical", eta: "2 min", part: "Transmission system", nextStep: "Pull the machine from service and inspect transmission fluid and clutch engagement.", customerAction: "Stop work immediately and request urgent service support." },
];

export default function DashboardPage() {
  const [selectedAlert, setSelectedAlert] = useState(baseAlerts[0]);
  const [alerts, setAlerts] = useState(baseAlerts);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((value) => value + 1);
      setAlerts((current) => {
        const rotated = [...current];
        const moved = rotated.shift();
        if (moved) rotated.push(moved);
        return rotated;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const liveStats = useMemo(() => ({
    healthy: 92,
    warning: 24,
    critical: 12,
    updated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }), [tick]);

  return (
    <AppShell title="Predictive Maintenance Dashboard">
      <div
        className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,247,237,0.88)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid gap-6 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Machines</p>
          <p className="mt-3 text-4xl font-bold text-yellow-600">{baseAlerts.length + 18}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Healthy</p>
          <p className="mt-3 text-4xl font-bold text-green-600">{liveStats.healthy}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Warning</p>
          <p className="mt-3 text-4xl font-bold text-orange-500">{liveStats.warning}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Critical</p>
          <p className="mt-3 text-4xl font-bold text-red-600">{liveStats.critical}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur">
        Live feed refresh: <span className="font-semibold text-slate-900">{liveStats.updated}</span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Live fault predictions</h3>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">10 active alerts</span>
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <button
                key={alert.machine}
                onClick={() => setSelectedAlert(alert)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${selectedAlert.machine === alert.machine ? "border-yellow-400 bg-yellow-50" : "border-slate-200 bg-slate-50 hover:border-yellow-300"}`}
              >
                <div>
                  <p className="font-semibold text-slate-800">{alert.machine}</p>
                  <p className="text-sm text-slate-500">{alert.fault}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">{alert.severity}</p>
                  <p className="text-xs text-slate-500">Prediction in {alert.eta}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="relative min-h-[360px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(2,6,23,0.75), rgba(120,53,15,0.45)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.2),_transparent_45%)]" />
            <div className="relative p-6 text-white">
              <div className="rounded-2xl border border-white/20 bg-white/15 p-4 shadow-xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">Caterpillar service insight</p>
                <h3 className="mt-2 text-2xl font-semibold">{selectedAlert.machine}</h3>
                <p className="mt-2 text-sm text-slate-200">{selectedAlert.fault}</p>
              </div>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">Affected part</p>
                  <p className="mt-1 text-sm text-slate-200">{selectedAlert.part}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">Next step</p>
                  <p className="mt-1 text-sm text-slate-200">{selectedAlert.nextStep}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold">What the customer should do</p>
                  <p className="mt-1 text-sm text-slate-200">{selectedAlert.customerAction}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </AppShell>
  );
}