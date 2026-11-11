"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight16Regular } from "@fluentui/react-icons";
import { byImpact, categories, matchesProfile, profiles, tweaks, type CategoryId } from "@/lib/content";
import { useAppState } from "./AppState";
import { CategoryIcon } from "./Icons";
import { Segmented, ToggleSwitch } from "./Controls";
import { TweakCard } from "./TweakCard";

export function CategoryView({ id }: { id: CategoryId }) {
  const cat = categories.find((c) => c.id === id)!;
  const { profile, setProfile, done } = useAppState();
  const [hideDone, setHideDone] = useState(false);

  const all = useMemo(() => tweaks.filter((t) => t.category === id).sort(byImpact), [id]);
  const visible = all.filter((t) => matchesProfile(t, profile) && !(hideDone && done.has(t.id)));
  const hiddenByProfile = all.filter((t) => !matchesProfile(t, profile));
  const doneHere = all.filter((t) => done.has(t.id)).length;

  const idx = categories.findIndex((c) => c.id === id);
  const next = categories[(idx + 1) % categories.length];

  return (
    <div className="page" key={id}>
      <div className="page-header">
        <span className="page-header__icon" style={{ background: cat.tint }}>
          <CategoryIcon icon={cat.icon} size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>{cat.name}</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>
            {cat.name}
          </h1>
        </div>
      </div>
      <p className="page-lede">{cat.blurb}</p>

      <div className="toolbar">
        <Segmented
          label="Show tweaks for"
          value={profile}
          options={profiles.map((p) => ({ id: p.id, label: p.label }))}
          onChange={setProfile}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="t-caption muted">
            {doneHere} of {all.length} done
          </span>
          <ToggleSwitch checked={hideDone} onChange={setHideDone} onLabel="Hide done" offLabel="Hide done" ariaLabel="Hide tweaks marked as done" />
        </div>
      </div>

      <div className="stack">
        {visible.map((t) => (
          <TweakCard key={t.id} tweak={t} />
        ))}
        {visible.length === 0 && (
          <div className="card empty">
            {hideDone && doneHere > 0 ? "Nice — you've done everything here." : "Nothing here for this profile."}
          </div>
        )}
      </div>

      {hiddenByProfile.length > 0 && (
        <p className="t-caption muted" style={{ marginTop: 12 }}>
          {hiddenByProfile.length} more {hiddenByProfile.length === 1 ? "tweak is" : "tweaks are"} hidden for this profile.{" "}
          <button type="button" className="link" style={{ background: "none", border: 0, padding: 0, font: "inherit" }} onClick={() => setProfile("all")}>
            Show everything
          </button>
        </p>
      )}

      <h2 className="t-body-strong section-title">Next up</h2>
      <Link href={`/${next.id}`} className="rec-item card" style={{ gridTemplateColumns: "40px 1fr auto" }}>
        <span className="tile__plate" style={{ background: next.tint }}>
          <CategoryIcon icon={next.icon} size={20} />
        </span>
        <span>
          <span className="t-body-strong" style={{ display: "block" }}>
            {next.name}
          </span>
          <span className="t-caption muted">{next.blurb}</span>
        </span>
        <ArrowRight16Regular />
      </Link>
    </div>
  );
}
