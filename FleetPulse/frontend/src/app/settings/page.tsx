"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  const [warningThreshold, setWarningThreshold] = useState(95);
  const [criticalThreshold, setCriticalThreshold] = useState(110);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [radiusKm, setRadiusKm] = useState(15);
  const [certification, setCertification] = useState("Hydraulics");
  const [telemetryFeed, setTelemetryFeed] = useState(true);

  return (
    <AppShell title="Settings">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Alert threshold configuration</h3>
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Warning threshold: {warningThreshold}°C</span>
              <input type="range" min="80" max="120" value={warningThreshold} onChange={(e) => setWarningThreshold(Number(e.target.value))} className="w-full accent-amber-500" />
            </label>
            <label className="block text-sm text-slate-700">
              <span className="mb-2 block font-medium">Critical threshold: {criticalThreshold}°C</span>
              <input type="range" min="90" max="130" value={criticalThreshold} onChange={(e) => setCriticalThreshold(Number(e.target.value))} className="w-full accent-red-500" />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Notification channels</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span>SMS alerts via Twilio</span>
              <input type="checkbox" checked={smsAlerts} onChange={() => setSmsAlerts((value) => !value)} className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span>Email reports</span>
              <input type="checkbox" checked={emailReports} onChange={() => setEmailReports((value) => !value)} className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span>Push notifications</span>
              <input type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications((value) => !value)} className="h-4 w-4" />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Technician dispatch rules</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span>Auto-assign nearest mechanic</span>
              <input type="checkbox" checked={autoDispatch} onChange={() => setAutoDispatch((value) => !value)} className="h-4 w-4" />
            </label>
            <label className="block">
              <span className="mb-2 block font-medium">Dispatch radius: {radiusKm} km</span>
              <input type="range" min="5" max="50" value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} className="w-full accent-sky-500" />
            </label>
            <label className="block">
              <span className="mb-2 block font-medium">Preferred certification</span>
              <select value={certification} onChange={(e) => setCertification(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2">
                <option>Hydraulics</option>
                <option>Powertrain</option>
                <option>Electrical</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">API & integration toggles</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
              <span>Live telemetry data feed</span>
              <input type="checkbox" checked={telemetryFeed} onChange={() => setTelemetryFeed((value) => !value)} className="h-4 w-4" />
            </label>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-medium text-slate-900">Current integration status</p>
              <p className="mt-1">{telemetryFeed ? "Connected to mock Caterpillar telemetry API" : "Disconnected - using demo telemetry"}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}