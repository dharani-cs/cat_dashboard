"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

type JobCard = {
  id: number;
  machineCode: string;
  location: string;
  fault: string;
  technician: string;
  customer: string;
  mobile: string;
  status: string;
  createdAt: string;
};

export default function ReportsPage() {
  const [jobCards, setJobCards] = useState<JobCard[]>([]);

  useEffect(() => {
    const loadCards = () => {
      const storedCards = localStorage.getItem("fleetpulse-job-cards");
      if (storedCards) {
        setJobCards(JSON.parse(storedCards));
      }
    };

    loadCards();
    window.addEventListener("storage", loadCards);
    return () => window.removeEventListener("storage", loadCards);
  }, []);

  const summary = useMemo(() => {
    const totalDispatches = jobCards.length;
    const downtimeAvoidedHours = totalDispatches * 6;
    const technicianEfficiency = totalDispatches > 0 ? 92 : 0;
    const partsSavings = totalDispatches * 18000;
    const savedCost = totalDispatches * 54000;

    return { totalDispatches, downtimeAvoidedHours, technicianEfficiency, partsSavings, savedCost };
  }, [jobCards]);

  const downloadPdf = () => {
    const content = `FleetPulse Preventive Service Report
=================================

Total dispatches: ${summary.totalDispatches}
Downtime avoided: ${summary.downtimeAvoidedHours} hours
Technician efficiency: ${summary.technicianEfficiency}%
Spare parts savings: ₹${summary.partsSavings.toLocaleString()}
Estimated cost saved: ₹${summary.savedCost.toLocaleString()}

Approved job cards:
${jobCards.map((card) => `- ${card.machineCode} | ${card.location} | ${card.fault} | ${card.technician}`).join("\n")}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fleetpulse-report.txt";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    window.open(url, "_blank", "noopener,noreferrer");
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Service Ticket & Reports">
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Executive business report</h3>
              <p className="mt-2 text-sm text-slate-600">Proof of downtime avoided, technician performance, and cost savings.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={downloadPdf} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Open Report
              </button>
              <button onClick={downloadPdf} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
                Download Report
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Downtime avoided</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.downtimeAvoidedHours} hrs</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-sm text-sky-700">Technician efficiency</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.technicianEfficiency}%</p>
            </div>
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-700">Estimated savings</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">₹{summary.savedCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Job card report</h3>
          <p className="mt-2 text-sm text-slate-600">Approved service requests appear here automatically once the customer confirms the alert.</p>

          {jobCards.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              No job cards yet. Approve a service request from the machines page to create one.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {jobCards.map((card) => (
                <div key={card.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{card.machineCode} • {card.location}</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{card.status}</span>
                  </div>
                  <p className="mt-2">Fault predicted: {card.fault}</p>
                  <p>Customer: {card.customer}</p>
                  <p>Mobile: {card.mobile}</p>
                  <p>Assigned technician: {card.technician}</p>
                  <p className="mt-2 text-xs text-slate-500">Created: {card.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}