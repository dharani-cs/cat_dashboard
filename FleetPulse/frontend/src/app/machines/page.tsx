"use client";

import { useEffect, useMemo, useState } from "react";
import AppShell from "@/components/AppShell";

const initialMachines = [
  { code: "CAT-102", location: "Kochi Port", status: "Fault likely", lastUpdate: "1 min ago", coords: { top: "62%", left: "30%" }, notification: "SMS sent to service team and customer", customer: { name: "Arun Kumar", mobile: "6374914150", receivedOn: "2026-07-01" }, predictedFault: "Hydraulic Pump", supportNumber: "+91 1800 123 4567", assignedTechnician: "Ravi Menon" },
  { code: "CAT-118", location: "Bangalore Yard", status: "Healthy", lastUpdate: "1 min ago", coords: { top: "48%", left: "72%" }, notification: "No action required", customer: { name: "Meera Rao", mobile: "9876543210", receivedOn: "2026-06-21" }, predictedFault: "Engine Cooling Fan", supportNumber: "+91 1800 123 4567", assignedTechnician: "Sanjay Rao" },
  { code: "CAT-125", location: "Mumbai Site", status: "Maintenance due", lastUpdate: "1 min ago", coords: { top: "32%", left: "24%" }, notification: "SMS reminder scheduled", customer: { name: "Karthik Shah", mobile: "8877665544", receivedOn: "2026-06-15" }, predictedFault: "Transmission Sensor", supportNumber: "+91 1800 123 4567", assignedTechnician: "Anil Thomas" },
  { code: "CAT-130", location: "Delhi Hub", status: "Healthy", lastUpdate: "1 min ago", coords: { top: "22%", left: "58%" }, notification: "All systems normal", customer: { name: "Nisha Verma", mobile: "9988776655", receivedOn: "2026-05-18" }, predictedFault: "Fuel Filter", supportNumber: "+91 1800 123 4567", assignedTechnician: "Madhav Pillai" },
];

export default function MachinesPage() {
  const [machines, setMachines] = useState(initialMachines);
  const [tick, setTick] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState(initialMachines[0]);
  const [smsMessage, setSmsMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [alertStatuses, setAlertStatuses] = useState<Record<string, "idle" | "awaiting" | "dispatched">>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((value) => value + 1);
      setMachines((current) => current.map((machine, index) => {
        if (machine.status === "Fault likely") {
          return { ...machine, lastUpdate: `${(index % 3) + 1} min ago` };
        }
        if (index % 4 === 0) {
          return { ...machine, status: "Fault likely", notification: "SMS sent to service team and customer", lastUpdate: "just now" };
        }
        return machine;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeFaults = useMemo(() => machines.filter((machine) => machine.status === "Fault likely").length, [machines]);
  const selectedAlertState = alertStatuses[selectedMachine.code] ?? "idle";

  const sendSms = (machine: typeof selectedMachine) => {
    const message = `CAT Care Alert: Machine [Code ${machine.code}] at ${machine.location} is predicting a ${machine.predictedFault} failure within 12 operating hours. To book an immediate mobile service technician to your site, reply 'YES' or call ${machine.supportNumber}.`;
    setSmsMessage(message);
    setAlertStatuses((current) => ({ ...current, [machine.code]: current[machine.code] === "dispatched" ? "dispatched" : "awaiting" }));
    setShowPopup(true);
  };

  const approveDispatch = (machine: typeof selectedMachine) => {
    const newJobCard = {
      id: Date.now(),
      machineCode: machine.code,
      location: machine.location,
      fault: machine.predictedFault,
      technician: machine.assignedTechnician,
      customer: machine.customer.name,
      mobile: machine.customer.mobile,
      status: "Dispatched",
      createdAt: new Date().toLocaleString(),
    };

    const savedCards = JSON.parse(localStorage.getItem("fleetpulse-job-cards") || "[]");
    localStorage.setItem("fleetpulse-job-cards", JSON.stringify([newJobCard, ...savedCards]));
    setAlertStatuses((current) => ({ ...current, [machine.code]: "dispatched" }));
    setShowPopup(false);
  };

  return (
    <AppShell title="Machine Tracking">
      <div
        className="rounded-[28px] border border-slate-200 bg-white/90 p-2 shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,247,237,0.88)), url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid gap-6 rounded-[24px] bg-white/70 p-6 backdrop-blur-sm xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">GPS fleet map</h3>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">Live updates every 5s</span>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#f8fafc_55%)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/10 to-transparent" />
            <div className="absolute left-[10%] top-[15%] h-16 w-16 rounded-full border-4 border-dashed border-slate-400/60" />
            <div className="absolute bottom-[12%] right-[12%] h-24 w-24 rounded-full border-4 border-dashed border-slate-400/60" />

            {machines.map((machine) => (
              <button key={machine.code} onClick={() => setSelectedMachine(machine)} className="absolute" style={{ top: machine.coords.top, left: machine.coords.left }}>
                <div className={`rounded-full px-2 py-1 text-xs font-semibold shadow ${machine.status === "Fault likely" ? "bg-red-600 text-white" : machine.status === "Maintenance due" ? "bg-orange-500 text-white" : "bg-emerald-600 text-white"}`}>
                  {machine.code}
                </div>
                <div className="mt-1 rounded-lg border border-slate-200 bg-white/90 px-2 py-1 text-[11px] text-slate-700 shadow-sm">
                  {machine.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Live machine status</h3>
            <div className="mt-4 space-y-3">
              {machines.map((machine) => (
                <button key={machine.code} onClick={() => setSelectedMachine(machine)} className={`w-full rounded-xl border p-3 text-left ${selectedMachine.code === machine.code ? "border-yellow-400 bg-yellow-50" : "border-slate-200 bg-slate-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-800">{machine.code}</p>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${machine.status === "Fault likely" ? "bg-red-100 text-red-700" : machine.status === "Maintenance due" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                      {machine.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{machine.location}</p>
                  <p className="mt-1 text-xs text-slate-500">Last update: {machine.lastUpdate}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Customer & alert details</h3>
            <p className="mt-2 text-sm text-slate-600">{activeFaults} machine(s) currently triggering automated SMS notifications.</p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">{selectedMachine.code}</p>
              <p className="mt-1 text-sm text-slate-600">Customer: {selectedMachine.customer.name}</p>
              <p className="text-sm text-slate-600">Mobile: {selectedMachine.customer.mobile}</p>
              <p className="text-sm text-slate-600">Received on: {selectedMachine.customer.receivedOn}</p>
              <button
                onClick={() => sendSms(selectedMachine)}
                disabled={selectedAlertState !== "idle"}
                className={`mt-3 rounded-lg px-3 py-2 text-sm font-semibold text-white ${selectedAlertState === "dispatched" ? "bg-emerald-600" : selectedAlertState === "awaiting" ? "bg-slate-600" : "bg-yellow-500"}`}
              >
                {selectedAlertState === "dispatched" ? "Dispatched" : selectedAlertState === "awaiting" ? "SMS Sent - Awaiting Confirmation" : "Send SMS Alert"}
              </button>
            </div>
            {smsMessage ? <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{smsMessage}</p> : null}
          </div>
        </div>
      </div>
      </div>

      {showPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-yellow-400 bg-gradient-to-br from-slate-900 via-slate-800 to-yellow-700 p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Caterpillar service alert</p>
                <h3 className="mt-2 text-2xl font-semibold">SMS alert sent successfully</h3>
              </div>
              <button onClick={() => setShowPopup(false)} className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold hover:bg-white/20">
                Close
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100">
              <p className="font-semibold">To: {selectedMachine.customer.name}</p>
              <p className="mt-2">{smsMessage}</p>
              <p className="mt-3 text-yellow-200">Customer mobile: {selectedMachine.customer.mobile}</p>
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button onClick={() => approveDispatch(selectedMachine)} className="rounded-full bg-yellow-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-yellow-300">
                Approve Service
              </button>
              <button onClick={() => setShowPopup(false)} className="rounded-full border border-white/20 px-4 py-2 font-semibold text-white transition hover:bg-white/10">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}