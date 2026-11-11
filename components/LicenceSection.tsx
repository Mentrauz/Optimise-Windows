"use client";

import { useState } from "react";
import {
  ChevronDown20Regular,
  Open16Regular,
  Key20Regular,
  People16Regular,
  Money16Regular,
  Info16Regular,
} from "@fluentui/react-icons";
import { audiences, licencePrograms, notALicence, type Audience, type LicenceProgram } from "@/lib/content";
import { Segmented } from "./Controls";

function LicenceCard({ p }: { p: LicenceProgram }) {
  const [open, setOpen] = useState(false);
  const bodyId = `${p.id}-body`;
  return (
    <div className="expander" id={p.id} data-open={open}>
      <div
        className="expander__header licence__header"
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
        <span className="expander__lead" aria-hidden>
          <Key20Regular fontSize={22} />
        </span>
        <span style={{ minWidth: 0 }}>
          <span className="expander__title">{p.title}</span>
          <span className="expander__summary">{p.summary}</span>
        </span>
        <span className="expander__meta">
          <span className="chip">{p.cost}</span>
        </span>
        <span className="expander__chevron" aria-hidden>
          <ChevronDown20Regular fontSize={16} />
        </span>
      </div>

      <div className="expander__body" id={bodyId} role="region" aria-label={p.title}>
        <div className="expander__inner" inert={!open}>
          <div className="expander__row facts">
            <div>
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Money16Regular /> What you get
              </h4>
              <p>{p.gives}</p>
            </div>
            <div>
              <h4 style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <People16Regular /> Who can get it
              </h4>
              <ul className="licence__elig">
                {p.eligibility.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="expander__row">
            <h4 className="tool__h">How to get it</h4>
            <ol className="steps">
              {p.steps.map((s, i) => (
                <li key={i}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="expander__row">
            <h4 className="tool__h" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Info16Regular /> Limits
            </h4>
            <p style={{ margin: 0 }}>{p.limits}</p>
          </div>

          {p.caution && (
            <div className="expander__row">
              <div className="infobar infobar--caution" role="note">
                <span className="infobar__icon" aria-hidden>!</span>
                <span>
                  <b>Good to know.</b> {p.caution}
                </span>
              </div>
            </div>
          )}

          <div className="expander__row expander__row--actions">
            {p.links.map((l, i) => (
              <a
                key={l.url}
                className={`btn${i === 0 ? " btn--accent" : ""}`}
                href={l.url}
                {...(l.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Open16Regular />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LicenceSection() {
  const [aud, setAud] = useState<Audience | "all">("all");
  const list = licencePrograms.filter((p) => aud === "all" || p.audience === aud);

  return (
    <section id="licences" style={{ scrollMarginTop: 64 }}>
      <h2 className="t-subtitle" style={{ margin: "40px 0 4px" }}>
        Legitimate ways to get a licence
      </h2>
      <p className="page-lede" style={{ marginBottom: 16 }}>
        You may already have one. If not, Microsoft runs official programmes for students, teachers, developers and
        nonprofits. Each one below lists who qualifies, what you get and exactly how to sign up.
      </p>

      <div className="toolbar">
        <Segmented
          label="Show programmes for"
          value={aud}
          onChange={setAud}
          options={[{ id: "all" as const, label: "All" }, ...audiences.map((a) => ({ id: a.id, label: a.label }))]}
        />
      </div>

      {(aud === "all" ? audiences : audiences.filter((a) => a.id === aud)).map((a) => {
        const group = list.filter((p) => p.audience === a.id);
        if (group.length === 0) return null;
        return (
          <div key={a.id} style={{ marginBottom: 20 }}>
            <h3 className="t-body-strong" style={{ margin: "0 0 8px" }}>
              {a.label}
            </h3>
            <div className="stack">
              {group.map((p) => (
                <LicenceCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        );
      })}

      <div className="card" style={{ padding: 16, marginTop: 8 }}>
        <h3 className="t-body-strong" style={{ margin: "0 0 10px" }}>
          These don&rsquo;t give you a licence
        </h3>
        <ul className="optlist">
          {notALicence.map((n) => (
            <li key={n.title}>
              <Info16Regular style={{ color: "var(--text-2)" }} />
              <span>
                <b>{n.title}</b>
                <span className="muted">{n.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
