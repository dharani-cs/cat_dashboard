"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import CaterpillarLogo from "@/components/CaterpillarLogo";

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const storedUser = localStorage.getItem("fleetpulse-user");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem("fleetpulse-auth", "true");
        router.push("/dashboard");
        return;
      }
    }

    if (email === "admin@fleetpulse.com" && password === "admin123") {
      localStorage.setItem("fleetpulse-auth", "true");
      router.push("/dashboard");
      return;
    }

    setError("Invalid credentials. Try admin@fleetpulse.com / admin123");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-yellow-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-yellow-500 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-lg">
        <div className="mb-4 flex justify-center">
          <CaterpillarLogo />
        </div>

        <h1 className="text-center text-4xl font-extrabold text-yellow-400">FleetPulse</h1>
        <p className="mt-2 text-center text-gray-400">AI Predictive Maintenance System</p>
        <h2 className="mt-8 text-center text-2xl font-semibold text-white">Welcome Back</h2>
        <p className="mb-8 text-center text-gray-500">Login to continue</p>

        <div className="relative mb-5">
          <Mail className="absolute left-3 top-3.5 text-yellow-400" size={20} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-11 pr-4 text-white outline-none focus:border-yellow-400"
          />
        </div>

        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3.5 text-yellow-400" size={20} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-11 pr-12 text-white outline-none focus:border-yellow-400"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-yellow-400">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-400">
            <input type="checkbox" className="accent-yellow-400" />
            Remember Me
          </label>
          <button className="text-yellow-400 hover:underline">Forgot Password?</button>
        </div>

        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        <button onClick={handleLogin} className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-500">
          Login
          <ArrowRight size={20} />
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-400">New to FleetPulse?</p>
          <Link href="/register" className="mt-3 block w-full rounded-xl border border-yellow-400 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
            Create New Account
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">Caterpillar FleetPulse © 2026</p>
      </div>
    </main>
  );
}