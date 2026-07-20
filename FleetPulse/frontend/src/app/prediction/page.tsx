"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

const telemetry = [
  { hour: "00", pressure: 82, temp: 74 },
  { hour: "02", pressure: 79, temp: 77 },
  { hour: "04", pressure: 88, temp: 81 },
  { hour: "06", pressure: 92, temp: 85 },
  { hour: "08", pressure: 111, temp: 97 },
  { hour: "10", pressure: 126, temp: 104 },
  { hour: "12", pressure: 138, temp: 116 },
];

export default function PredictionPage() {
  const [serviceDecision, setServiceDecision] = useState<"needed" | "not-needed" | null>(null);

  return (
    <AppShell title="AI Prediction">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Why this happened</h3>
            <p className="mt-2 text-sm text-slate-600">Telemetry shows the anomaly was triggered by a pressure spike followed by a heat surge.</p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">Hydraulic Pressure vs Temperature</span>
                <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">Trigger zone</span>
              </div>
              <div className="space-y-3">
                {telemetry.map((point) => (
                  <div key={point.hour} className="flex items-center gap-3">
                    <span className="w-10 text-sm text-slate-500">{point.hour}</span>
                    <div className="h-2 flex-1 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, point.pressure)}%` }} />
                    </div>
                    <span className="text-sm text-slate-600">P {point.pressure} / T {point.temp}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Prescriptive AI insight</h3>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">Based on historical data from 14 similar CAT models in this climate region, continuing operation without replacing the seal will likely cause a primary engine block crack, increasing repair costs by 400%.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">When and what the model predicts</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-slate-900 p-4 text-white">
                <p className="text-sm text-slate-300">Confidence score</p>
                <p className="mt-1 text-2xl font-semibold">92% probability of imminent component failure</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Root cause AI tag</p>
                <p className="mt-2 font-semibold text-slate-900">Anomaly detected: Micro-abrasions in Hydraulic Seal Cylinder 3</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Remaining useful life</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-700">11.5 operating hours until failure</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Service decision</h3>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setServiceDecision("needed")}
                className={`rounded-xl px-4 py-2 ${serviceDecision === "needed" ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white text-slate-700"}`}
              >
                Service Needed
              </button>
              <button
                onClick={() => setServiceDecision("not-needed")}
                className={`rounded-xl px-4 py-2 ${serviceDecision === "not-needed" ? "bg-slate-900 text-white" : "border border-slate-300 bg-white text-slate-700"}`}
              >
                Not Needed
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {serviceDecision === "needed"
                ? "Service request recorded for dispatch review."
                : serviceDecision === "not-needed"
                  ? "Decision recorded. The machine can be monitored further."
                  : "Caterpillar service team will evaluate if the fault is critical or can be deferred."}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}