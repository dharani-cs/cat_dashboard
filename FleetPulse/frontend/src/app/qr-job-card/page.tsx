"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

type Step = {
  id: number;
  title: string;
  completed: boolean;
};

export default function QRJobCardPage() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: "Depressurize hydraulic lines", completed: false },
    { id: 2, title: "Unbolt seal housing", completed: false },
    { id: 3, title: "Replace hydraulic seal kit", completed: false },
    { id: 4, title: "Re-test pressure stability", completed: false },
  ]);
  const [safetySigned, setSafetySigned] = useState(false);
  const [repairStarted, setRepairStarted] = useState(false);
  const [repairCompleted, setRepairCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [photoTaken, setPhotoTaken] = useState(false);

  useEffect(() => {
    if (!repairStarted || repairCompleted) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [repairStarted, repairCompleted]);

  const toggleStep = (id: number) => {
    setSteps((current) => current.map((step) => (step.id === id ? { ...step, completed: !step.completed } : step)));
  };

  const completionPercent = useMemo(() => {
    const completed = steps.filter((step) => step.completed).length;
    return Math.round((completed / steps.length) * 100);
  }, [steps]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <AppShell title="QR Job Card">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-600">Mechanic toolkit</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Digital repair walkthrough</h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{completionPercent}% complete</span>
            </div>

            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <label key={step.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <input type="checkbox" checked={step.completed} onChange={() => toggleStep(step.id)} className="h-4 w-4 rounded border-slate-300" />
                  <span className={step.completed ? "text-slate-400 line-through" : "text-slate-700"}>{step.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Photo evidence upload</h3>
            <p className="mt-2 text-sm text-slate-600">Capture proof of the damaged and replaced component before closing the work order.</p>
            <button
              onClick={() => setPhotoTaken(true)}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Open Camera / Upload Photo
            </button>
            {photoTaken ? <p className="mt-3 text-sm text-emerald-700">Photo attached successfully.</p> : null}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">3D part viewer</h3>
            <p className="mt-2 text-sm text-slate-600">Open the schematic for the hydraulic seal housing to verify alignment.</p>
            <a href="https://www.caterpillar.com" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-slate-900">
              Open Technical Schematic
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Safety & LOTO</h3>
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">⚠ Warning: Engine block temperature is currently 85°C. Wait 15 minutes for cooldown before touching.</p>
            </div>
            <label className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <input type="checkbox" checked={safetySigned} onChange={() => setSafetySigned((value) => !value)} className="h-4 w-4 rounded border-slate-300" />
              I have engaged the physical safety locks on the excavator tracks.
            </label>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Real-time repair timer</h3>
            <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-sm text-slate-300">Elapsed time</p>
              <p className="mt-2 text-3xl font-semibold">{formatTime(elapsedSeconds)}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setRepairStarted(true)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Start Repair</button>
              <button onClick={() => setRepairCompleted(true)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Complete Repair</button>
            </div>
            {repairCompleted ? <p className="mt-3 text-sm text-emerald-700">Repair completed successfully. Actual time recorded.</p> : null}
          </div>
        </div>
      </div>
    </AppShell>
  );
}