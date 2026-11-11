"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown20Regular,
  CheckmarkCircle20Filled,
  Circle20Regular,
  Open16Regular,
  Copy16Regular,
  Clock16Regular,
  ArrowUndo16Regular,
  Lightbulb16Regular,
  Checkmark16Regular,
} from "@fluentui/react-icons";
import type { Tweak } from "@/lib/content";
import { useAppState } from "./AppState";
import { ImpactMeter, ToggleSwitch } from "./Controls";

function PathTrail({ path }: { path: string[] }) {
  return (
    <span className="path" aria-label={path.join(", then ")}>
      {path.map((p, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span className="path__sep" aria-hidden>›</span>}
          {i === path.length - 1 ? <b>{p}</b> : <span>{p}</span>}
        </span>
      ))}
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      {copied ? <Checkmark16Regular /> : <Copy16Regular />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function TweakCard({ tweak, defaultOpen = false }: { tweak: Tweak; defaultOpen?: boolean }) {
  const { done, toggleDone } = useAppState();
  const isDone = done.has(tweak.id);
  const [open, setOpen] = useState(defaultOpen);
  const [target, setTarget] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Open + highlight when linked to via #id (search results, home recommendations)
  useEffect(() => {
    const check = () => {
      if (window.location.hash === `#${tweak.id}`) {
        setOpen(true);
        setTarget(true);
        requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
        setTimeout(() => setTarget(false), 1800);
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [tweak.id]);

  const bodyId = `${tweak.id}-body`;

  return (
    <div ref={ref} id={tweak.id} className={`expander${target ? " is-target" : ""}`} data-open={open}>
      <div
        className="expander__header"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        <span className={`expander__lead${isDone ? " is-done" : ""}`} aria-hidden>
          {isDone ? <CheckmarkCircle20Filled fontSize={22} /> : <Circle20Regular fontSize={22} style={{ color: "var(--text-3)" }} />}
        </span>
        <span style={{ minWidth: 0 }}>
          <span className="expander__title">{tweak.title}</span>
          <span className="expander__summary">{tweak.summary}</span>
        </span>
        <span className="expander__meta">
          <ImpactMeter impact={tweak.impact} />
          <ToggleSwitch checked={isDone} onChange={() => toggleDone(tweak.id)} onLabel="Done" offLabel="To do" ariaLabel={`Mark "${tweak.title}" as done`} />
        </span>
        <span className="expander__chevron" aria-hidden>
          <ChevronDown20Regular fontSize={16} />
        </span>
      </div>

      <div className="expander__body" id={bodyId} role="region" aria-label={tweak.title}>
        <div className="expander__inner" inert={!open}>
          <div className="expander__row">
            <PathTrail path={tweak.path} />
            <ol className="steps">
              {tweak.steps.map((s, i) => (
                <li key={i}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="expander__row facts">
            <div>
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Lightbulb16Regular /> Why it helps
              </h4>
              <p>{tweak.why}</p>
            </div>
            <div>
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ArrowUndo16Regular /> To undo
              </h4>
              <p>{tweak.undo}</p>
            </div>
          </div>

          {tweak.caution && (
            <div className="expander__row">
              <div className="infobar infobar--caution" role="note">
                <span className="infobar__icon" aria-hidden>!</span>
                <span>
                  <b>Good to know.</b> {tweak.caution}
                </span>
              </div>
            </div>
          )}

          <div className="expander__row expander__row--actions">
            {tweak.deepLink && (
              <a className="btn btn--accent" href={tweak.deepLink} title="Opens the Settings page directly on a Windows PC">
                <Open16Regular />
                {tweak.deepLink.startsWith("ms-windows-store") ? "Open in Microsoft Store" : "Open in Settings"}
              </a>
            )}
            {tweak.command && (
              <>
                <span className="t-caption muted" style={{ marginLeft: tweak.deepLink ? 8 : 0 }}>
                  {tweak.command.label}
                </span>
                <code className="code-pill">{tweak.command.value}</code>
                <CopyButton text={tweak.command.value} label="Copy" />
              </>
            )}
            {!tweak.command && <CopyButton text={tweak.path.join(" > ")} label="Copy path" />}
            <span className="badge" style={{ marginLeft: "auto" }}>
              <Clock16Regular /> About {tweak.minutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
