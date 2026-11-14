import {
  categories,
  featureChanges,
  licencePrograms,
  protectionTools,
  recommendedPrograms,
  tools,
  tweaks,
  type Category,
} from "./content";

export interface SearchItem {
  id: string;
  title: string;
  route: string;
  groupName: string;
  icon: Category["icon"];
  fields: { title: string; name: string; summary: string; body: string };
}

const WEIGHTS = { title: 6, name: 4, summary: 2, body: 1 } as const;

const STOPWORDS = new Set(["how", "to", "the", "a", "an", "my", "i", "of", "for", "in", "on", "and", "is", "do", "can", "get", "make", "with", "up", "pc", "me", "it", "your"]);

/** Extra words a query word also matches. */
const SYNONYMS: Record<string, string[]> = {
  speed: ["performance", "fast"],
  fast: ["performance", "speed"],
  slow: ["performance", "speed"],
  lag: ["performance", "gaming"],
  fps: ["gaming", "game"],
  battery: ["power"],
  iso: ["download", "install"],
  installer: ["download", "install"],
  antivirus: ["security", "defender"],
  viru: ["security", "defender", "malware"],
  licence: ["license", "activation", "key"],
  license: ["licence", "activation", "key"],
  key: ["licence", "activation"],
  boot: ["startup"],
};

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

/** How well one query word matches a list of words: 0 (no match) to 1 (exact). */
function matchQuality(q: string, ws: string[]): number {
  let best = 0;
  for (const w of ws) {
    if (w === q) return 1;
    if (w.startsWith(q)) best = Math.max(best, 0.8);
    else if (q.length >= 3 && w.includes(q)) best = Math.max(best, 0.5);
    else if (best < 0.4 && q.length >= 4) {
      const max = q.length >= 8 ? 2 : 1;
      if (editDistance(q, w) <= max) best = 0.4;
    }
  }
  return best;
}

type Indexed = { item: SearchItem; title: string; fields: [string[], number][] };

function index(item: SearchItem): Indexed {
  const f = item.fields;
  return {
    item,
    title: words(f.title).join(" "),
    fields: [
      [words(f.title), WEIGHTS.title],
      [words(f.name), WEIGHTS.name],
      [words(f.summary), WEIGHTS.summary],
      [words(f.body), WEIGHTS.body],
    ],
  };
}

const join = (...parts: (string | undefined)[]) => parts.filter(Boolean).join(" ");

const searchItems: SearchItem[] = [
  ...tweaks.map((t) => {
    const c = categories.find((c) => c.id === t.category)!;
    return {
      id: t.id,
      title: t.title,
      route: t.category,
      groupName: c.name,
      icon: c.icon,
      fields: { title: t.title, name: join(c.name, t.path.join(" ")), summary: join(t.summary, c.blurb), body: join(t.steps.join(" "), t.why) },
    };
  }),
  ...featureChanges.map((f) => ({
    id: f.id,
    title: f.title,
    route: "features",
    groupName: "Optional feature changes",
    icon: "features" as const,
    fields: { title: f.title, name: join(f.group, f.path.join(" ")), summary: f.summary, body: join(f.steps.join(" "), f.why) },
  })),
  {
    id: "windows-iso",
    title: "Get a Windows ISO",
    route: "tools",
    groupName: "Optional tools",
    icon: "tools",
    fields: {
      title: "Get a Windows ISO",
      name: "Optional tools Windows download",
      summary: "Official Windows download links for the Windows 11 ISO, plus how to verify it and make a bootable USB.",
      body: "install media Media Creation Tool Rufus clean install reinstall",
    },
  },
  ...tools.map((t) => ({
    id: t.id,
    title: t.name,
    route: "tools",
    groupName: "Optional tools",
    icon: "tools" as const,
    fields: { title: t.name, name: join(t.maker, t.kind), summary: t.tagline, body: join(...t.use.map((o) => o.name), ...t.skip.map((o) => o.name)) },
  })),
  ...licencePrograms.map((p) => ({
    id: p.id,
    title: p.title,
    route: "tools",
    groupName: "Legitimate licences",
    icon: "tools" as const,
    fields: { title: p.title, name: join("licence", p.audience, p.gives), summary: p.summary, body: join(p.eligibility.join(" "), p.steps.join(" ")) },
  })),
  ...recommendedPrograms.map((p) => ({
    id: p.id,
    title: p.name,
    route: "programs",
    groupName: "Programs I recommend",
    icon: "programs" as const,
    fields: { title: p.name, name: p.maker, summary: p.tagline, body: join(p.why, p.steps.join(" ")) },
  })),
  ...protectionTools.map((p) => ({
    id: p.id,
    title: p.name,
    route: "protect",
    groupName: "Protect yourself",
    icon: "protect" as const,
    fields: { title: p.name, name: p.maker, summary: p.tagline, body: join(p.why, p.steps.join(" ")) },
  })),
];

const indexed = searchItems.map(index);

export function search(query: string, limit: number): SearchItem[] {
  const all = words(query);
  const filtered = all.filter((w) => !STOPWORDS.has(w));
  const qs = filtered.length ? filtered : all;
  if (qs.length === 0) return [];
  const phrase = qs.join(" ");

  const scored = indexed
    .map(({ item, title, fields }) => {
      let score = 0;
      let matched = 0;
      for (const q of qs) {
        let best = 0;
        for (const [ws, weight] of fields) {
          best = Math.max(best, matchQuality(q, ws) * weight);
          for (const syn of SYNONYMS[q] ?? []) best = Math.max(best, matchQuality(syn, ws) * weight * 0.7);
        }
        if (best > 0) matched++;
        score += best;
      }
      if (qs.length > 1 && title.includes(phrase)) score += 10;
      return { item, score, matched };
    })
    .filter((r) => r.matched > 0);
  // Drop weak matches (stray typo or substring hits) when there are much stronger ones.
  const top = Math.max(0, ...scored.map((r) => r.score));
  return scored
    .filter((r) => r.score >= top * 0.3)
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
