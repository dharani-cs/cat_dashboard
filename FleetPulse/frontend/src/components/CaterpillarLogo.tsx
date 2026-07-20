import React from "react";

type CaterpillarLogoProps = {
  compact?: boolean;
  className?: string;
};

export default function CaterpillarLogo({ compact = false, className = "" }: CaterpillarLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg ring-1 ring-yellow-500/40">
        <svg viewBox="0 0 64 64" className="h-7 w-7" fill="none" aria-hidden="true">
          <rect x="10" y="12" width="44" height="36" rx="10" fill="#111827" />
          <path d="M20 24h24" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 34h28" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
          <circle cx="22" cy="40" r="4" fill="#FACC15" />
          <circle cx="42" cy="40" r="4" fill="#FACC15" />
          <path d="M26 18h12" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {!compact ? (
        <div className="leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-yellow-600">Caterpillar</p>
          <p className="text-lg font-bold text-slate-900">FleetPulse</p>
        </div>
      ) : null}
    </div>
  );
}
