"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-8">
      <div>
        <h2 className="text-3xl font-bold">
          FleetPulse Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <Search className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <UserCircle size={34} className="cursor-pointer" />
      </div>
    </header>
  );
}
