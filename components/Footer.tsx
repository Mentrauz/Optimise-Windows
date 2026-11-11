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
    </footer>
  );
}
