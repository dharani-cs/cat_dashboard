"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";

const machines = [
  {
    id: "CAT-101",
    model: "320D Excavator",
    health: "Healthy",
    status: "Running",
    service: "12 Jul 2026",
  },
  {
    id: "CAT-102",
    model: "950 GC Loader",
    health: "Warning",
    status: "Maintenance",
    service: "15 Jul 2026",
  },
  {
    id: "CAT-103",
    model: "D6 Dozer",
    health: "Critical",
    status: "Stopped",
    service: "18 Jul 2026",
  },
];

export default function MachineTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>ID</th>
            <th>Model</th>
            <th>Health</th>
            <th>Status</th>
            <th>Last Service</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="border-b">
              <td>{machine.id}</td>
              <td>{machine.model}</td>
              <td>{machine.health}</td>
              <td>{machine.status}</td>
              <td>{machine.service}</td>
              <td className="flex gap-2 py-3">
                <button className="text-blue-600">
                  <Eye size={18} />
                </button>

                <button className="text-yellow-600">
                  <Pencil size={18} />
                </button>

                <button className="text-red-600">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}