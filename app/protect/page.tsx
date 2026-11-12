import type { Metadata } from "next";
import Link from "next/link";
import { protectionTools } from "@/lib/content";
import { CategoryIcon } from "@/components/Icons";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Protect yourself",
  description: "Why Windows Security is enough for everyday use, plus free tools for checking downloads and links with VirusTotal and finding leaked passwords with Have I Been Pwned.",
};

export default function ProtectPage() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header__icon" style={{ background: "#107C10" }}>
          <CategoryIcon icon="protect" size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Protect yourself</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>Protect yourself</h1>
        </div>
      </div>
      <p className="page-lede">
        Windows Security already protects you well, so you don&rsquo;t need to buy an antivirus. Start there, then use
        the free tools below for what it can&rsquo;t judge for you: whether a download or link is safe, and whether your
        passwords have leaked.
      </p>

      <div className="stack" style={{ gap: 16 }}>
        {protectionTools.map((p) => (
          <article key={p.id} className="card tool" id={p.id}>
            <header className="tool__head">
              <span className="tile__plate" style={{ background: "#107C10" }}>
                <CategoryIcon icon="protect" size={22} />
              </span>
              <div style={{ minWidth: 0 }}>
                <h2 className="t-subtitle" style={{ margin: 0 }}>{p.name}</h2>
                <div className="t-caption muted">{p.maker}</div>
              </div>
              <div className="tool__chips">
                <span className="chip">{p.cost}</span>
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
              <h3 className="tool__h">Why use it</h3>
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
