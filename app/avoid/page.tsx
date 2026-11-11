import type { Metadata } from "next";
import Link from "next/link";
import { avoidList } from "@/lib/content";
import { CategoryIcon } from "@/components/Icons";
import { Footer } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Leave these alone",
  description: "Popular Windows \"optimisations\" that do more harm than good, and what to do instead.",
};

export default function AvoidPage() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header__icon" style={{ background: "#c42b1c" }}>
          <CategoryIcon icon="avoid" size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Leave these alone</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>Leave these alone</h1>
        </div>
      </div>
      <p className="page-lede">
        These show up in every &ldquo;speed up Windows&rdquo; video. They either do nothing on a modern PC or quietly
        break something you&rsquo;ll need later.
      </p>

      <div className="infobar infobar--info" role="note" style={{ marginBottom: 16 }}>
        <span className="infobar__icon" aria-hidden>i</span>
        <span>
          <b>Rule of thumb.</b> If a tweak needs a script, a registry edit or an app that promises to &ldquo;boost&rdquo;
          your PC, it&rsquo;s probably not worth it. Windows 11 already manages memory, services and drives well.
        </span>
      </div>

      <div className="stack">
        {avoidList.map((a) => (
          <article key={a.title} className="card myth">
            <span className="myth__icon">
              <CategoryIcon icon="avoid" size={20} />
            </span>
            <div>
              <h2 className="t-body-strong" style={{ margin: 0 }}>{a.title}</h2>
              <p className="myth__claim">&ldquo;{a.claim}&rdquo;</p>
              <p className="myth__reality">{a.reality}</p>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link href="/performance" className="btn btn--accent">See what actually helps</Link>
        <Link href="/" className="btn">Back to Home</Link>
      </div>
      <Footer />
    </div>
  );
}
