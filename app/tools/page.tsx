import type { Metadata } from "next";
import Link from "next/link";
import { officialSources, tools } from "@/lib/content";
import { CategoryIcon } from "@/components/Icons";
import { ToolCard } from "@/components/ToolCard";
import { LicenceSection } from "@/components/LicenceSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Optional tools",
  description: "The safe parts of O&O ShutUp10++ and Chris Titus Tech's Windows Utility, how to use ViVeTool to unlock new features early, how to use the FMHY link index safely, official Windows and Office downloads, and every legitimate way to get a licence.",
};

const tints: Record<string, string> = { shutup10: "#5C2E91", winutil: "#0063B1", vivetool: "#5D5A58", fmhy: "#C239B3" };

export default function ToolsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header__icon" style={{ background: "#4f6bed" }}>
          <CategoryIcon icon="tools" size={26} />
        </span>
        <div>
          <nav className="breadcrumb t-caption" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Optional tools</span>
          </nav>
          <h1 className="t-title" style={{ margin: 0 }}>Optional tools</h1>
        </div>
      </div>
      <p className="page-lede">
        You don&rsquo;t need any of these. Everything else on this site uses settings already in Windows. These popular
        free tools can make several of those changes at once, but only some of their options are worth using. Here&rsquo;s
        which ones.
      </p>

      <div className="infobar infobar--info" role="note" style={{ marginBottom: 16 }}>
        <span className="infobar__icon" aria-hidden>i</span>
        <span>
          <b>Three rules for any tweaking tool.</b> Download it only from the official source. Create a restore point first.
          And never select everything. If you don&rsquo;t know what an option does, leave it alone.
        </span>
      </div>

      <div className="stack" style={{ gap: 16 }}>
        {tools.map((t) => (
          <ToolCard key={t.id} tool={t} tint={tints[t.id] ?? "#0078D4"} />
        ))}
      </div>

      <h2 className="t-subtitle" style={{ margin: "40px 0 4px" }}>Get Windows and Office the official way</h2>
      <p className="page-lede" style={{ marginBottom: 16 }}>
        Genuine installers are free to download from Microsoft. A licence is what you pay for, and there are legitimate
        ways to get one without spending much.
      </p>
      <div className="grid-3">
        {officialSources.map((s) => (
          <section key={s.title} className="card source">
            <span className="principle__icon">
              <CategoryIcon icon="download" size={18} />
            </span>
            <h3 className="t-body-strong" style={{ margin: "12px 0 4px" }}>{s.title}</h3>
            <p className="muted t-caption" style={{ margin: "0 0 12px" }}>{s.text}</p>
            <div className="source__links">
              {s.links.map((l) => (
                <a
                  key={l.url}
                  className="link"
                  href={l.url}
                  {...(l.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label} ›
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="infobar infobar--critical" role="note" style={{ marginTop: 16 }}>
        <span className="infobar__icon" aria-hidden>×</span>
        <span>
          <b>Not covered here: activation scripts.</b> Tools that activate Windows or Office without a licence break
          Microsoft&rsquo;s licence terms and need full admin access to your PC. There are other ways to get legitimate
          licences, like Microsoft&rsquo;s official developer, student and nonprofit programmes.{" "}
          <a className="link" href="#licences">See all of them below</a>, or read{" "}
          <Link className="link" href="/avoid">Leave these alone</Link>.
        </span>
      </div>

      <LicenceSection />

      <Footer />
    </div>
  );
}
