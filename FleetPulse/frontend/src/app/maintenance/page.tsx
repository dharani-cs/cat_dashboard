"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

type Technician = {
  id: number;
  name: string;
  role: string;
  certification: string;
  distance: string;
  availability: string;
  rating: string;
  phone: string;
  vehicle: string;
  eta: string;
};

type Centre = {
  name: string;
  distance: string;
  availability: string;
  contact: string;
};

const technicians: Technician[] = [
  {
    id: 1,
    name: "Ravi Menon",
    role: "Field Service Engineer",
    certification: "CAT Certified Hydraulics Specialist",
    distance: "3 km",
    availability: "Available now",
    rating: "4.9/5",
    phone: "+91 98765 43210",
    vehicle: "Service truck 12",
    eta: "12 min",
  },
  {
    id: 2,
    name: "Sanjay Rao",
    role: "Mobile Maintenance Specialist",
    certification: "CAT Certified Powertrain Technician",
    distance: "8 km",
    availability: "Available in 15 min",
    rating: "4.7/5",
    phone: "+91 91234 56789",
    vehicle: "Van 04",
    eta: "21 min",
  },
];

const fallbackCentre: Centre = {
  name: "Caterpillar Service Centre - Chennai",
  distance: "18 km",
  availability: "Separator kit available in 2 days",
  contact: "+91 44444 55555",
};

export default function MaintenancePage() {
  const [accepted, setAccepted] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<Technician>(technicians[0]);
  const [spareStatus, setSpareStatus] = useState<"checking" | "available" | "delayed">("checking");
  const [statusStep, setStatusStep] = useState(0);

  const summary = useMemo(() => {
    const serviceCharge = 8500;
    const travelCharge = accepted ? 1200 : 0;
    const partsCost = 3200;
    const laborCost = 1800;
    const downtimeSaved = 24000;
    const total = serviceCharge + travelCharge + partsCost + laborCost;
    return { serviceCharge, travelCharge, partsCost, laborCost, downtimeSaved, total };
  }, [accepted]);

  const handleAccept = () => {
    setAccepted(true);
    setSelectedTechnician(technicians[0]);
    setSpareStatus("delayed");
    setStatusStep(1);
  };

  const steps = ["Assigned", "En Route", "On-Site", "In Progress"];

  return (
    <AppShell title="Service Dispatch">
      <div className="rounded-3xl border border-yellow-500/40 bg-gradient-to-br from-black via-slate-900 to-yellow-700 p-6 text-white shadow-2xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Caterpillar service flow</p>
            <h3 className="mt-2 text-2xl font-semibold">Fast service acceptance for the fault machine</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-200">
              The system assigns the nearest service engineer, checks separator availability, and prepares a clear customer-ready cost summary.
            </p>
          </div>
          <button
            onClick={handleAccept}
            className="rounded-full bg-yellow-400 px-5 py-2.5 font-semibold text-black transition hover:bg-yellow-300"
          >
            Accept Service
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Repair crew deployment</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <div key={step} className={`rounded-full px-3 py-1 text-sm font-semibold ${index <= statusStep ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {step}
                </div>
              ))}
            </div>
            {accepted ? (
              <div className="mt-4 rounded-2xl border border-yellow-300 bg-yellow-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{selectedTechnician.name}</p>
                    <p className="text-sm text-slate-600">{selectedTechnician.role}</p>
                    <p className="mt-1 text-sm text-slate-700">Certification: {selectedTechnician.certification}</p>
                  </div>
                  <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-yellow-300">
                    ETA {selectedTechnician.eta}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                  <p>Distance: {selectedTechnician.distance}</p>
                  <p>Rating: {selectedTechnician.rating}</p>
                  <p>Phone: {selectedTechnician.phone}</p>
                  <p>Vehicle: {selectedTechnician.vehicle}</p>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Click the service button to allocate the nearest technician.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Spare parts logistics</h3>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Part Name & ID: Hydraulic Seal Kit (#CAT-9921)</p>
              <p className="mt-2">Stock Status: {accepted && spareStatus === "delayed" ? "Sourced from Regional Hub - Courier Dispatched" : "In Stock - Local Warehouse (12 km away)"}</p>
              <p className="mt-2 text-slate-600">Logistics note: The dispatch engine will follow up with the regional hub if the local warehouse is depleted.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-400 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Service payment summary</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-black/90 px-3 py-2 text-yellow-300">
              <span>Service charge</span>
              <span>₹{summary.serviceCharge.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
              <span>Parts cost</span>
              <span>₹{summary.partsCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
              <span>Labor cost</span>
              <span>₹{summary.laborCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2">
              <span>Travel charge</span>
              <span>₹{summary.travelCharge.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-white">
              <span className="font-semibold">Total amount</span>
              <span className="font-semibold">₹{summary.total.toLocaleString()}</span>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
              Downtime cost saved: ₹{summary.downtimeSaved.toLocaleString()} by resolving the issue before a full breakdown.
            </div>
            <p className="mt-3 rounded-xl border border-yellow-300 bg-white/80 p-3 text-sm text-slate-600">
              Customer-friendly estimate: dispatch confirmed with a Caterpillar-certified technician and a clear parts availability update.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}