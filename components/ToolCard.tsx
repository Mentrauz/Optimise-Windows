"use client";

import { useState } from "react";
import {
  CheckmarkCircle16Filled,
  DismissCircle16Filled,
  Open16Regular,
  Copy16Regular,
  Checkmark16Regular,
  ArrowUndo16Regular,
} from "@fluentui/react-icons";
import type { Tool } from "@/lib/content";
import { CategoryIcon } from "./Icons";

function CopyCommand({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      {copied ? <Checkmark16Regular /> : <Copy16Regular />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function ToolCard({ tool, tint }: { tool: Tool; tint: string }) {
  return (
    <article className="card tool" id={tool.id}>
      <header className="tool__head">
        <span className="tile__plate" style={{ background: tint }}>
          <CategoryIcon icon="tools" size={22} />
        </span>
        <div style={{ minWidth: 0 }}>
          <h2 className="t-subtitle" style={{ margin: 0 }}>
            {tool.name}
          </h2>
          <div className="t-caption muted">{tool.maker}</div>
        </div>
        <div className="tool__chips">
          <span className="chip">{tool.cost}</span>
          <span className="chip">{tool.kind}</span>
        </div>
      </header>

      <p className="tool__tagline">{tool.tagline}</p>

      <div className="tool__row expander__row--actions">
        <a className="btn btn--accent" href={tool.source.url} target="_blank" rel="noopener noreferrer">
          <Open16Regular />
          Official source
        </a>
        <span className="t-caption muted">{tool.source.label}</span>
        {tool.launch && (
          <span className="tool__launch">
            <span className="t-caption muted">{tool.launch.label}</span>
            <code className="code-pill">{tool.launch.value}</code>
            <CopyCommand value={tool.launch.value} />
          </span>
        )}
      </div>

      <div className="tool__row">
        <h3 className="tool__h">Before you start</h3>
        <ol className="steps">
          {tool.before.map((s, i) => (
            <li key={i}>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="tool__row tool__split">
        <section>
          <h3 className="tool__h">Safe to use</h3>
          <ul className="optlist">
            {tool.use.map((o) => (
              <li key={o.name}>
                <CheckmarkCircle16Filled className="optlist__ok" />
                <span>
                  <b>{o.name}</b>
                  <span className="muted">{o.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="tool__h">Skip these</h3>
          <ul className="optlist">
            {tool.skip.map((o) => (
              <li key={o.name}>
                <DismissCircle16Filled className="optlist__no" />
                <span>
                  <b>{o.name}</b>
                  <span className="muted">{o.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {tool.featureIds && (
        <div className="tool__row">
          <h3 className="tool__h">Commands for the new features</h3>
          <ul className="featureids">
            {tool.featureIds.map((f) => (
              <li key={f.name}>
                <b>{f.name}</b>
                <span className="muted t-caption">{f.note}</span>
                <span className="featureids__cmd">
                  <code className="code-pill">{f.command}</code>
                  <CopyCommand value={f.command} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="tool__row">
        <h3 className="tool__h" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <ArrowUndo16Regular /> To undo
        </h3>
        <p style={{ margin: 0 }}>{tool.undo}</p>
      </div>

      {tool.caution && (
        <div className="tool__row">
          <div className="infobar infobar--caution" role="note">
            <span className="infobar__icon" aria-hidden>!</span>
            <span>
              <b>Good to know.</b> {tool.caution}
            </span>
          </div>
        </div>
      )}
    </article>
  );
}
