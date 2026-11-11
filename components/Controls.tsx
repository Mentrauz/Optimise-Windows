"use client";

import type { Impact } from "@/lib/content";

export function ToggleSwitch({
  checked,
  onChange,
  onLabel = "On",
  offLabel = "Off",
  ariaLabel,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className="switch"
      style={{ background: "none", border: 0, padding: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <span className="switch__label t-body">{checked ? onLabel : offLabel}</span>
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
    </button>
  );
}

export function ImpactMeter({ impact }: { impact: Impact }) {
  const level = impact === "High" ? 3 : impact === "Medium" ? 2 : 1;
  return (
    <span className="badge" title={`${impact} impact`}>
      <span className="meter" aria-hidden>
        <i className={level >= 1 ? "on" : ""} />
        <i className={level >= 2 ? "on" : ""} />
        <i className={level >= 3 ? "on" : ""} />
      </span>
      {impact} impact
    </span>
  );
}

export function ProgressRing({
  value,
  size = 64,
  stroke = 5,
  label,
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  label?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <span
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      style={{ position: "relative", width: size, height: size, display: "inline-grid", placeItems: "center", flex: "none" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--stroke-divider)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 400ms cubic-bezier(0,0,0,1)" }}
        />
      </svg>
      {label != null && <span style={{ position: "relative", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{label}</span>}
    </span>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string; icon?: React.ReactNode }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.icon}
          {o.label}
        </button>
      ))}
    </div>
  );
}
