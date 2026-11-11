"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Navigation20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
  DarkTheme20Regular,
} from "@fluentui/react-icons";
import { categories, tweaks } from "@/lib/content";
import { useAppState } from "./AppState";
import { AppMark, CategoryIcon } from "./Icons";
import { ProgressRing } from "./Controls";
import { SearchBox } from "./SearchBox";

function ThemeButton() {
  const { theme, setTheme } = useAppState();
  const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const label = theme === "system" ? "Theme: follow Windows" : theme === "light" ? "Theme: light" : "Theme: dark";
  const Icon = theme === "system" ? DarkTheme20Regular : theme === "light" ? WeatherSunny20Regular : WeatherMoon20Regular;
  return (
    <button
      type="button"
      className="btn btn--subtle btn--icon"
      onClick={() => setTheme(next)}
      aria-label={`${label}. Switch to ${next}.`}
      title={label}
    >
      <Icon />
    </button>
  );
}

function NavItem({ href, icon, label, count }: { href: string; icon: Parameters<typeof CategoryIcon>[0]["icon"]; label: string; count?: string }) {
  const pathname = usePathname();
  const current = pathname === href;
  return (
    <Link href={href} className="nav-item" aria-current={current ? "page" : undefined}>
      <CategoryIcon icon={icon} filled={current} size={20} />
      <span>{label}</span>
      {count && <span className="nav-item__count">{count}</span>}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [paneOpen, setPaneOpen] = useState(false);
  const { done, hydrated } = useAppState();

  useEffect(() => setPaneOpen(false), [pathname]);

  const total = tweaks.length;
  const doneCount = tweaks.filter((t) => done.has(t.id)).length;

  return (
    <>
      <header className="titlebar">
        <div className="titlebar__brand">
          <button
            type="button"
            className="btn btn--subtle btn--icon pane-toggle"
            aria-label={paneOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={paneOpen}
            onClick={() => setPaneOpen((o) => !o)}
          >
            <Navigation20Regular />
          </button>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AppMark />
            <span className="titlebar__brand-name">Windows Optimise</span>
          </Link>
        </div>
        <div className="titlebar__search">
          <SearchBox />
        </div>
        <div className="titlebar__actions">
          <ThemeButton />
        </div>
      </header>

      <div className="shell" data-pane={paneOpen ? "open" : "closed"}>
        <aside className="pane" aria-label="Categories">
          <div className="pane__account">
            <ProgressRing value={hydrated ? doneCount / total : 0} size={56} stroke={4} label={<span className="t-caption">{hydrated ? Math.round((doneCount / total) * 100) : 0}%</span>} />
            <div style={{ minWidth: 0 }}>
              <div className="t-body-strong">Your PC</div>
              <div className="t-caption muted">
                {hydrated ? doneCount : 0} of {total} tweaks done
              </div>
            </div>
          </div>
          <nav className="pane__nav">
            <NavItem href="/" icon="home" label="Home" />
            {categories.map((c) => {
              const ts = tweaks.filter((t) => t.category === c.id);
              const d = ts.filter((t) => done.has(t.id)).length;
              return <NavItem key={c.id} href={`/${c.id}`} icon={c.icon} label={c.name} count={hydrated && d > 0 ? `${d}/${ts.length}` : undefined} />;
            })}
            <div className="pane__sep" role="separator" />
            <NavItem href="/avoid" icon="avoid" label="Leave these alone" />
          </nav>
        </aside>
        <div className="pane-backdrop" onClick={() => setPaneOpen(false)} aria-hidden />
        <main className="content" id="main">
          {children}
        </main>
      </div>
    </>
  );
}
