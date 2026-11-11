// Original abstract artwork in the spirit of Windows 11's soft, layered visuals.
export function HeroArt() {
  const petals = [
    { rot: -62, g: "pA", o: 0.55, s: 1.0 },
    { rot: -30, g: "pB", o: 0.7, s: 1.08 },
    { rot: 0, g: "pC", o: 0.85, s: 1.14 },
    { rot: 30, g: "pB", o: 0.75, s: 1.06 },
    { rot: 60, g: "pA", o: 0.6, s: 0.96 },
  ];
  return (
    <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <defs>
        <linearGradient id="pA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fd8ff" />
          <stop offset="0.55" stopColor="#3b8eea" />
          <stop offset="1" stopColor="#5b3fd1" />
        </linearGradient>
        <linearGradient id="pB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d6f0ff" />
          <stop offset="0.5" stopColor="#4aa3f0" />
          <stop offset="1" stopColor="#0a4fbf" />
        </linearGradient>
        <linearGradient id="pC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#7cc4ff" />
          <stop offset="1" stopColor="#1f5fd6" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4aa3f0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4aa3f0" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="edge" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <ellipse cx="330" cy="250" rx="240" ry="190" fill="url(#glow)" />

      {/* blurred shadow layer */}
      <g transform="translate(330 330)" filter="url(#soft)" opacity="0.6">
        {petals.map((p, i) => (
          <path
            key={`s${i}`}
            d="M0 0 C -70 -60, -70 -190, 0 -250 C 70 -190, 70 -60, 0 0 Z"
            fill={`url(#${p.g})`}
            transform={`rotate(${p.rot}) scale(${p.s})`}
          />
        ))}
      </g>

      {/* crisp petals */}
      <g transform="translate(330 330)" filter="url(#edge)">
        {petals.map((p, i) => (
          <path
            key={i}
            d="M0 0 C -70 -60, -70 -190, 0 -250 C 70 -190, 70 -60, 0 0 Z"
            fill={`url(#${p.g})`}
            opacity={p.o}
            transform={`rotate(${p.rot}) scale(${p.s})`}
            style={{ mixBlendMode: "normal" }}
          />
        ))}
        <path
          d="M0 0 C -40 -50, -40 -150, 0 -200 C 40 -150, 40 -50, 0 0 Z"
          fill="#ffffff"
          opacity="0.28"
        />
      </g>
    </svg>
  );
}
