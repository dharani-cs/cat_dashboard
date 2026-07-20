"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, BadgeCheck, Building2, Users } from "lucide-react";
import CaterpillarLogo from "@/components/CaterpillarLogo";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", employeeId: "", department: "", role: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in the required fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem("fleetpulse-user", JSON.stringify({ ...form }));
    localStorage.setItem("fleetpulse-auth", "true");
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-yellow-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-3xl border border-yellow-500 bg-zinc-900/95 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-4 flex justify-center">
          <CaterpillarLogo />
        </div>

        <h1 className="text-center text-4xl font-bold text-yellow-400">FleetPulse</h1>
        <p className="mt-2 mb-8 text-center text-gray-400">Create New Account</p>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Full Name" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400" />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email Address" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400" />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="text" placeholder="Phone Number" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400" />
          </div>

          <div className="relative">
            <BadgeCheck className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} type="text" placeholder="Employee ID" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400" />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400">
              <option value="">Select Department</option>
              <option>Maintenance</option>
              <option>Operations</option>
              <option>Engineering</option>
              <option>Administration</option>
            </select>
          </div>

          <div className="relative">
            <Users className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 text-white outline-none focus:border-yellow-400">
              <option value="">Select Role</option>
              <option>Admin</option>
              <option>Supervisor</option>
              <option>Technician</option>
            </select>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 pr-10 text-white outline-none focus:border-yellow-400" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-yellow-400" size={20} />
            <input value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-10 pr-10 text-white outline-none focus:border-yellow-400" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" className="accent-yellow-400" />
            I agree to the Terms & Conditions
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button onClick={handleRegister} className="w-full rounded-xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-500">
            Register
          </button>

          <Link href="/" className="block w-full rounded-xl border border-yellow-400 py-3 text-center font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}