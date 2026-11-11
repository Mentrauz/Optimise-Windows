"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Profile } from "@/lib/content";

type ThemeMode = "system" | "light" | "dark";
type ProfileChoice = Profile | "all";

interface AppState {
  done: Set<string>;
  toggleDone: (id: string) => void;
  resetDone: () => void;
  profile: ProfileChoice;
  setProfile: (p: ProfileChoice) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  hydrated: boolean;
}

const Ctx = createContext<AppState | null>(null);

const KEY_DONE = "wo.done";
const KEY_PROFILE = "wo.profile";
const KEY_THEME = "wo.theme";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode etc.) — state stays in memory */
  }
}

function applyTheme(t: ThemeMode) {
  const el = document.documentElement;
  if (t === "system") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", t);
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState<Set<string>>(() => new Set());
  const [profile, setProfileState] = useState<ProfileChoice>("all");
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = read(KEY_DONE);
      if (raw) setDone(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore corrupt data */
    }
    const p = read(KEY_PROFILE) as ProfileChoice | null;
    if (p === "all" || p === "laptop" || p === "desktop" || p === "gaming") setProfileState(p);
    const t = read(KEY_THEME) as ThemeMode | null;
    if (t === "light" || t === "dark" || t === "system") setThemeState(t);
    setHydrated(true);
  }, []);

  const toggleDone = useCallback((id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      write(KEY_DONE, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const resetDone = useCallback(() => {
    setDone(new Set());
    write(KEY_DONE, "[]");
  }, []);

  const setProfile = useCallback((p: ProfileChoice) => {
    setProfileState(p);
    write(KEY_PROFILE, p);
  }, []);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    write(KEY_THEME, t);
    applyTheme(t);
  }, []);

  const value = useMemo(
    () => ({ done, toggleDone, resetDone, profile, setProfile, theme, setTheme, hydrated }),
    [done, toggleDone, resetDone, profile, setProfile, theme, setTheme, hydrated],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used inside AppStateProvider");
  return v;
}

/** Inline script that applies the saved theme before first paint (no flash). */
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${KEY_THEME}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
