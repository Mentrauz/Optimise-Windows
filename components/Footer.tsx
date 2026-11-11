const links = [
  { label: "Email", href: "mailto:11soumyasingh2@gmail.com" },
  { label: "Portfolio", href: "https://portfolio-mentrauzs-projects.vercel.app/" },
  { label: "X", href: "https://x.com/mentrauz" },
  { label: "GitHub", href: "https://github.com/Mentrauz" },
  { label: "Source", href: "https://github.com/Mentrauz/Optimise-Windows" },
];

export function Footer() {
  return (
    <footer className="footer">
      <span>For Windows 11 26H2 · Not affiliated with Microsoft</span>
      <span className="footer__credits">
        <span>
          Made by <b>Soumya Singh</b>
        </span>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {l.label}
          </a>
        ))}
      </span>
      <p className="footer__note">
        Every setting here comes from years of trial and error while troubleshooting Windows, and they&rsquo;re my personal
        recommendations. Want to add or change something?{" "}
        <a href="mailto:11soumyasingh2@gmail.com">Email me</a> or{" "}
        <a href="https://github.com/Mentrauz/Optimise-Windows/pulls" target="_blank" rel="noopener noreferrer">open a PR on GitHub</a> :D
      </p>
    </footer>
  );
}
