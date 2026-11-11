import type { Metadata } from "next";
import Link from "next/link";
import { recommendedPrograms } from "@/lib/content";
import { CategoryIcon } from "@/components/Icons";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Programs I recommend",
  description: "A short list of free and paid programs worth installing: BleachBit, Revo Uninstaller, DDU, NVCleanstall and Brave, with how to use each one safely.",
};

export default function ProgramsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header__icon" style={{ background: "#9D5D00" }}>
          <CategoryIcon icon="programs" size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Programs I recommend</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>Programs I recommend</h1>
        </div>
      </div>
      <p className="page-lede">
        Everything else on this site uses settings already in Windows. These are the few extra programs I think are worth
        installing, and how to use each one safely. This is a short list for now.
      </p>

      <div className="infobar infobar--info" role="note" style={{ marginBottom: 16 }}>
        <span className="infobar__icon" aria-hidden>i</span>
        <span>
          <b>Download from the official site only.</b> Create a restore point before using any of these, and read the
          &ldquo;Watch out&rdquo; note first. Looking for the tweaking scripts and activation tools?{" "}
          <Link className="link" href="/tools">See Optional tools</Link>.
        </span>
      </div>

      <div className="stack" style={{ gap: 16 }}>
        {recommendedPrograms.map((p) => (
          <article key={p.id} className="card tool" id={p.id}>
            <header className="tool__head">
              <span className="tile__plate" style={{ background: "#9D5D00" }}>
                <CategoryIcon icon="programs" size={22} />
              </span>
              <div style={{ minWidth: 0 }}>
                <h2 className="t-subtitle" style={{ margin: 0 }}>{p.name}</h2>
                <div className="t-caption muted">{p.maker}</div>
              </div>
              <div className="tool__chips">
                <span className="chip">{p.cost}</span>
                <span className="chip">{p.level}</span>
              </div>
            </header>

            <p className="tool__tagline">{p.tagline}</p>

            <div className="tool__row expander__row--actions">
              <a className="btn btn--accent" href={p.source.url} target="_blank" rel="noopener noreferrer">
                Official site
              </a>
              <span className="t-caption muted">{p.source.label}</span>
            </div>

            <div className="tool__row">
              <h3 className="tool__h">Why I recommend it</h3>
              <p style={{ margin: 0 }}>{p.why}</p>
            </div>

            <div className="tool__row">
              <h3 className="tool__h">How to use it</h3>
              <ol className="steps">
                {p.steps.map((s, i) => (
                  <li key={i}>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="tool__row">
              <h3 className="tool__h">To undo</h3>
              <p style={{ margin: 0 }}>{p.undo}</p>
            </div>

            {p.caution && (
              <div className="tool__row">
                <div className="infobar infobar--critical" role="note">
                  <span className="infobar__icon" aria-hidden>!</span>
                  <span>
                    <b>Watch out.</b> {p.caution}
                  </span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <Footer />
    </div>
  );
}
