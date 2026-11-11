import React from "react";

export default function NeLogo({
  variant = "navy",
  size = "md",
  showWordmark = true,
  subtitle = "PARFUMS",
  className = "",
}) {
  // Color presets
  const colors = {
    navy: {
      primary: "#14213D",
      accent: "#FF6B5B",
      gold: "#C5A059",
      text: "#14213D",
      sub: "#5A77A6",
    },
    cream: {
      primary: "#F4EDE0",
      accent: "#FF6B5B",
      gold: "#DFBF7E",
      text: "#F4EDE0",
      sub: "#E9DCB8",
    },
    coral: {
      primary: "#FF6B5B",
      accent: "#14213D",
      gold: "#C5A059",
      text: "#FF6B5B",
      sub: "#14213D",
    },
  };

  const current = colors[variant] || colors.navy;

  const sizeMap = {
    sm: { icon: 32, text: "text-lg", sub: "text-[9px]" },
    md: { icon: 42, text: "text-xl", sub: "text-[10px]" },
    lg: { icon: 56, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 72, text: "text-3xl", sub: "text-sm" },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Interlocking NE Monogram Crest */}
      <div
        className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: s.icon, height: s.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle Octagonal / Diamond Luxury Shield Border */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="12"
            stroke={current.primary}
            strokeWidth="1.8"
            strokeOpacity="0.4"
          />
          <rect
            x="11"
            y="11"
            width="78"
            height="78"
            rx="8"
            stroke={current.gold}
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Interlocking 'N' and 'E' Luxury Monogram */}
          {/* Letter N: Left vertical bar, Diagonal, Right vertical bar */}
          <path
            d="M26 26V74"
            stroke={current.primary}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M26 28L54 72"
            stroke={current.primary}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M54 26V74"
            stroke={current.primary}
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Letter E: Interlaced with right stem of N, with horizontal luxury arms */}
          {/* E Top arm */}
          <path
            d="M54 32H75"
            stroke={current.primary}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* E Center arm with Coral accent */}
          <path
            d="M54 50H70"
            stroke={current.accent}
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* E Bottom arm */}
          <path
            d="M54 68H75"
            stroke={current.primary}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Luxury Serif Accents */}
          <line
            x1="22"
            y1="26"
            x2="30"
            y2="26"
            stroke={current.gold}
            strokeWidth="2"
          />
          <line
            x1="22"
            y1="74"
            x2="30"
            y2="74"
            stroke={current.gold}
            strokeWidth="2"
          />
          <line
            x1="75"
            y1="29"
            x2="75"
            y2="35"
            stroke={current.gold}
            strokeWidth="2"
          />
          <line
            x1="75"
            y1="65"
            x2="75"
            y2="71"
            stroke={current.gold}
            strokeWidth="2"
          />
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col tracking-wider">
          <span
            className={`font-serif font-bold tracking-[0.28em] uppercase ${s.text}`}
            style={{ color: current.text }}
          >
            NEXWORLD
          </span>
          {subtitle && (
            <span
              className={`font-sans tracking-[0.38em] uppercase font-medium ${s.sub}`}
              style={{ color: current.sub }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
