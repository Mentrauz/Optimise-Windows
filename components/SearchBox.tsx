"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search20Regular } from "@fluentui/react-icons";
import { search } from "@/lib/search";
import { CategoryIcon } from "./Icons";

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(q, 8), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  const go = (id: string, category: string) => {
    setOpen(false);
    setQ("");
    inputRef.current?.blur();
    router.push(`/${category}#${id}`);
  };

  return (
    <div className="searchbox" ref={wrapRef}>
      <label htmlFor="global-search" className="visually-hidden">
        Find a setting
      </label>
      <input
        ref={inputRef}
        id="global-search"
        className="searchbox__input"
        type="search"
        placeholder="Find a setting"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && q.trim().length > 0}
        aria-controls="search-results"
        aria-activedescendant={results[active] ? `sr-${results[active].id}` : undefined}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            go(results[active].id, results[active].route);
          } else if (e.key === "Escape") {
            setOpen(false);
            inputRef.current?.blur();
          }
        }}
      />
      {!q && <span className="searchbox__kbd" aria-hidden>Ctrl K</span>}
      <span className="searchbox__icon" aria-hidden>
        <Search20Regular fontSize={16} />
      </span>

      {open && q.trim() && (
        <div className="flyout" id="search-results" role="listbox" aria-label="Search results">
          {results.length === 0 ? (
            <div className="flyout__empty">No results for &ldquo;{q.trim()}&rdquo;</div>
          ) : (
            results.map((t, i) => {
              return (
                <div
                  key={t.id}
                  id={`sr-${t.id}`}
                  role="option"
                  aria-selected={i === active}
                  className="flyout__item"
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    go(t.id, t.route);
                  }}
                >
                  <span style={{ color: "var(--text-2)", display: "grid" }}>
                    <CategoryIcon icon={t.icon} size={18} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
                    <span className="t-caption muted">{t.groupName}</span>
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
