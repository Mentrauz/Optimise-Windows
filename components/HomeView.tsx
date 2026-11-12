"use client";

import Link from "next/link";
import {
  ArrowRight16Regular,
  ChevronRight16Regular,
  Settings20Regular,
  ArrowUndo20Regular,
  Person20Regular,
  Laptop20Regular,
  Desktop20Regular,
  Games20Regular,
  People20Regular,
} from "@fluentui/react-icons";
import { byImpact, categories, featureChanges, matchesProfile, principles, tweaks } from "@/lib/content";
import { useAppState } from "./AppState";
import { CategoryIcon } from "./Icons";
import { ImpactMeter, ProgressRing, Segmented } from "./Controls";
import { HeroArt } from "./HeroArt";
import { Footer } from "./Footer";

const principleIcons = [Settings20Regular, ArrowUndo20Regular, Person20Regular];

export function HomeView() {
  const { profile, setProfile, done, hydrated, resetDone } = useAppState();

  const recommended = tweaks
    .filter((t) => matchesProfile(t, profile) && !done.has(t.id))
    .filter((t) => profile === "all" || t.for.length > 0 || t.impact === "High")
    .sort(byImpact)
    .slice(0, 6);

  const relevant = [...tweaks, ...featureChanges].filter((t) => matchesProfile(t, profile));
  const relevantDone = relevant.filter((t) => done.has(t.id)).length;
  const pct = relevant.length ? relevantDone / relevant.length : 0;
  const minutesLeft = relevant.filter((t) => !done.has(t.id)).reduce((m, t) => m + t.minutes, 0);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__copy">
          <div className="hero__eyebrow">A calm guide to a faster PC</div>
          <h1 className="t-title-large">Make Windows feel faster. Skip the risky stuff.</h1>
          <p>
            Simple changes using settings already in Windows 11. Each one takes a minute or two, explains why it helps,
            and tells you how to switch it back.
          </p>
          <div className="hero__actions">
            <Link href={recommended[0] ? `/${recommended[0].category}#${recommended[0].id}` : "/performance"} className="btn btn--accent">
              Start with the essentials
              <ArrowRight16Regular />
            </Link>
            <Link href="/avoid" className="btn btn--warn">
              What we won&rsquo;t ask you to do
            </Link>
          </div>
        </div>
        <div className="hero__art">
          <HeroArt />
        </div>
      </section>

      <h2 className="t-body-strong section-title">Tune for</h2>
      <Segmented
        label="Tune for"
        value={profile}
        onChange={setProfile}
        options={[
          { id: "all", label: "Everyone", icon: <People20Regular fontSize={16} /> },
          { id: "laptop", label: "Laptop", icon: <Laptop20Regular fontSize={16} /> },
          { id: "desktop", label: "Desktop", icon: <Desktop20Regular fontSize={16} /> },
          { id: "gaming", label: "Gaming", icon: <Games20Regular fontSize={16} /> },
        ]}
      />

      <div className="grid-2" style={{ marginTop: 16 }}>
        <section className="card" aria-labelledby="rec-h">
          <div style={{ padding: "16px 16px 8px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 id="rec-h" className="t-body-strong" style={{ margin: 0 }}>
              Recommended for you
            </h2>
            <span className="t-caption muted">Highest impact first</span>
          </div>
          <div style={{ padding: "0 4px 4px" }}>
            {recommended.length === 0 ? (
              <div className="empty">You&rsquo;ve done every recommended tweak. Nice work.</div>
            ) : (
              recommended.map((t) => {
                const cat = categories.find((c) => c.id === t.category)!;
                return (
                  <Link key={t.id} href={`/${t.category}#${t.id}`} className="rec-item">
                    <span className="tile__plate" style={{ background: cat.tint, width: 28, height: 28, borderRadius: 6 }}>
                      <CategoryIcon icon={cat.icon} size={16} />
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block" }}>{t.title}</span>
                      <span className="t-caption muted" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 2 }}>
                        <span>{cat.name}</span>
                        <ImpactMeter impact={t.impact} />
                      </span>
                    </span>
                    <ChevronRight16Regular style={{ color: "var(--text-2)" }} />
                  </Link>
                );
              })
            )}
          </div>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <section className="card status-card" aria-label="Progress">
            <ProgressRing value={hydrated ? pct : 0} size={88} stroke={6} label={<span className="t-subtitle">{hydrated ? Math.round(pct * 100) : 0}%</span>} />
            <div>
              <div className="t-subtitle">{relevantDone === relevant.length && hydrated ? "All tuned up" : "Your progress"}</div>
              <div className="muted" style={{ marginTop: 2 }}>
                {hydrated ? relevantDone : 0} of {relevant.length} tweaks done
                {profile !== "all" ? ` for ${profile}` : ""}.
              </div>
              <div className="t-caption faint" style={{ marginTop: 6 }}>
                About {minutesLeft} minutes left in total. Progress is saved in this browser only.
              </div>
              {hydrated && done.size > 0 && (
                <button type="button" className="btn btn--subtle" style={{ marginTop: 8, marginLeft: -12 }} onClick={resetDone}>
                  Reset progress
                </button>
              )}
            </div>
          </section>

          <section className="card" aria-labelledby="rules-h">
            <h2 id="rules-h" className="t-body-strong" style={{ margin: 0, padding: "16px 16px 0" }}>
              Our ground rules
            </h2>
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <div className="principle" key={p.title} style={i > 0 ? { borderTop: "1px solid var(--stroke-divider)" } : undefined}>
                  <span className="principle__icon">
                    <Icon fontSize={18} />
                  </span>
                  <div>
                    <div className="t-body-strong">{p.title}</div>
                    <div className="muted t-caption" style={{ marginTop: 2 }}>
                      {p.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <h2 className="t-body-strong section-title">Browse by category</h2>
      <div className="grid-3">
        {categories.map((c) => {
          const ts = tweaks.filter((t) => t.category === c.id);
          const d = ts.filter((t) => done.has(t.id)).length;
          return (
            <Link key={c.id} href={`/${c.id}`} className="tile">
              <span className="tile__plate" style={{ background: c.tint }}>
                <CategoryIcon icon={c.icon} size={22} />
              </span>
              <span>
                <span className="t-body-strong" style={{ display: "block" }}>
                  {c.name}
                </span>
                <span className="t-caption muted">{c.blurb}</span>
              </span>
              <span className="tile__foot">
                <span className="progress" aria-hidden>
                  <span style={{ width: `${hydrated ? (d / ts.length) * 100 : 0}%` }} />
                </span>
                <span className="t-caption faint" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {hydrated ? d : 0}/{ts.length}
                </span>
              </span>
            </Link>
          );
        })}
        <Link href="/features" className="tile">
          <span className="tile__plate" style={{ background: "#0F7B8A" }}>
            <CategoryIcon icon="features" size={22} />
          </span>
          <span>
            <span className="t-body-strong" style={{ display: "block" }}>
              Optional feature changes
            </span>
            <span className="t-caption muted">New Start, taskbar, search and right-click options that cut clutter.</span>
          </span>
          <span className="tile__foot t-caption" style={{ color: "var(--accent-text)" }}>
            Make Windows feel better <ArrowRight16Regular />
          </span>
        </Link>
        <Link href="/programs" className="tile">
          <span className="tile__plate" style={{ background: "#9D5D00" }}>
            <CategoryIcon icon="programs" size={22} />
          </span>
          <span>
            <span className="t-body-strong" style={{ display: "block" }}>
              Programs I recommend
            </span>
            <span className="t-caption muted">Cleaners, uninstallers, driver tools and a browser worth installing.</span>
          </span>
          <span className="tile__foot t-caption" style={{ color: "var(--accent-text)" }}>
            See my picks <ArrowRight16Regular />
          </span>
        </Link>
        <Link href="/protect" className="tile">
          <span className="tile__plate" style={{ background: "#107C10" }}>
            <CategoryIcon icon="protect" size={22} />
          </span>
          <span>
            <span className="t-body-strong" style={{ display: "block" }}>
              Protect yourself
            </span>
            <span className="t-caption muted">Windows Security, checking downloads with VirusTotal, and finding leaked passwords.</span>
          </span>
          <span className="tile__foot t-caption" style={{ color: "var(--accent-text)" }}>
            Check before you run <ArrowRight16Regular />
          </span>
        </Link>
        <Link href="/tools" className="tile">
          <span className="tile__plate" style={{ background: "#4f6bed" }}>
            <CategoryIcon icon="tools" size={22} />
          </span>
          <span>
            <span className="t-body-strong" style={{ display: "block" }}>
              Optional tools
            </span>
            <span className="t-caption muted">The safe parts of O&amp;O ShutUp10++, WinUtil and ViVeTool, plus official Windows and Office downloads.</span>
          </span>
          <span className="tile__foot t-caption" style={{ color: "var(--accent-text)" }}>
            For confident users <ArrowRight16Regular />
          </span>
        </Link>
        <Link href="/avoid" className="tile">
          <span className="tile__plate" style={{ background: "#c42b1c" }}>
            <CategoryIcon icon="avoid" size={22} />
          </span>
          <span>
            <span className="t-body-strong" style={{ display: "block" }}>
              Leave these alone
            </span>
            <span className="t-caption muted">Popular &ldquo;tweaks&rdquo; that do more harm than good.</span>
          </span>
          <span className="tile__foot t-caption" style={{ color: "var(--accent-text)" }}>
            Read before you tweak <ArrowRight16Regular />
          </span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}

