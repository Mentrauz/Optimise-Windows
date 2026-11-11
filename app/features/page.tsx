import type { Metadata } from "next";
import Link from "next/link";
import { featureChanges, featureGroups } from "@/lib/content";
import { CategoryIcon } from "@/components/Icons";
import { TweakCard } from "@/components/TweakCard";
import { Footer } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Optional feature changes",
  description: "New Start menu, taskbar, search and right-click options from Windows 11 25H2 and 26H2 that reduce clutter and make Windows feel better.",
};

export default function FeaturesPage() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header__icon" style={{ background: "#0F7B8A" }}>
          <CategoryIcon icon="features" size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Optional feature changes</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>Optional feature changes</h1>
        </div>
      </div>
      <p className="page-lede">
        Windows 11 25H2 and 26H2 added new ways to tidy the Start menu, taskbar, search and right-click menu, plus visual
        effects, comfort and gaming options. These are small, low-impact changes. They cut clutter and make Windows feel
        more like yours.
      </p>

      <div className="infobar infobar--info" role="note" style={{ marginBottom: 16 }}>
        <span className="infobar__icon" aria-hidden>i</span>
        <span>
          <b>Missing a setting?</b> Microsoft is rolling these out gradually, so some may not have reached your PC yet.
          Install pending updates in Windows Update, restart, and check again. Labels can vary slightly between builds.
        </span>
      </div>

      {featureGroups.map((g) => {
        const items = featureChanges.filter((f) => f.group === g.name);
        return (
          <section key={g.name} aria-labelledby={`group-${g.name}`} style={{ marginBottom: 28 }}>
            <h2 id={`group-${g.name}`} className="t-subtitle" style={{ margin: "0 0 2px" }}>{g.name}</h2>
            <p className="muted t-caption" style={{ margin: "0 0 12px" }}>{g.blurb}</p>
            <div className="stack">
              {items.map((f) => (
                <TweakCard key={f.id} tweak={f} />
              ))}
            </div>
          </section>
        );
      })}

      <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link href="/performance" className="btn btn--accent">See what actually helps</Link>
        <Link href="/" className="btn">Back to Home</Link>
      </div>
      <Footer />
    </div>
  );
}
