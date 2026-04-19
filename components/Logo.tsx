interface LogoProps {
  /** 'light' = white text for dark backgrounds (navbar)
   *  'dark'  = charcoal text for light backgrounds (footer on light, etc.)
   *  'rose'  = rose/taupe on ivory (decorative use) */
  variant?: 'light' | 'dark' | 'rose'
  className?: string
}

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  const nameColor =
    variant === 'light' ? '#FFFFFF'
    : variant === 'rose' ? '#C8A49A'
    : '#2D2827'

  const subColor =
    variant === 'light' ? 'rgba(255,255,255,0.65)'
    : variant === 'rose' ? '#C8A49A'
    : 'rgba(45,40,39,0.55)'

  return (
    <svg
      viewBox="0 0 260 42"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Iris Milstein Real Estate"
      style={{ display: 'block' }}
    >
      {/* ── IRIS ── */}
      {/* I */}
      <line x1="0" y1="2" x2="0" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* R */}
      <line x1="6" y1="2" x2="6" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <path d="M6 2 Q14 2 14 7 Q14 12 6 12" fill="none" stroke={nameColor} strokeWidth="1.2" />
      <line x1="10" y1="12" x2="14" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* I */}
      <line x1="19" y1="2" x2="19" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* S */}
      <path d="M33 4 Q26 2 25 7 Q24 12 30 12 Q36 12 35 17 Q34 23 27 22" fill="none" stroke={nameColor} strokeWidth="1.2" />

      {/* gap */}

      {/* ── MILSTEIN ── */}
      {/* M — special diagonal style */}
      <line x1="42" y1="2" x2="42" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <line x1="42" y1="2" x2="49" y2="14" stroke={nameColor} strokeWidth="1.2" />
      <line x1="56" y1="2" x2="49" y2="14" stroke={nameColor} strokeWidth="1.2" />
      <line x1="56" y1="2" x2="56" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* vertical accent lines inside M */}
      <line x1="46" y1="2" x2="46" y2="10" stroke={nameColor} strokeWidth="0.6" opacity="0.7" />
      <line x1="52" y1="2" x2="52" y2="10" stroke={nameColor} strokeWidth="0.6" opacity="0.7" />

      {/* I */}
      <line x1="62" y1="2" x2="62" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* L */}
      <line x1="68" y1="2" x2="68" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <line x1="68" y1="22" x2="76" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* S */}
      <path d="M90 4 Q83 2 82 7 Q81 12 87 12 Q93 12 92 17 Q91 23 84 22" fill="none" stroke={nameColor} strokeWidth="1.2" />
      {/* T */}
      <line x1="96" y1="2" x2="106" y2="2" stroke={nameColor} strokeWidth="1.2" />
      <line x1="101" y1="2" x2="101" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* E */}
      <line x1="111" y1="2" x2="111" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <line x1="111" y1="2" x2="120" y2="2" stroke={nameColor} strokeWidth="1.2" />
      <line x1="111" y1="12" x2="118" y2="12" stroke={nameColor} strokeWidth="1.2" />
      <line x1="111" y1="22" x2="120" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* I */}
      <line x1="125" y1="2" x2="125" y2="22" stroke={nameColor} strokeWidth="1.2" />
      {/* N */}
      <line x1="131" y1="2" x2="131" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <line x1="131" y1="2" x2="141" y2="22" stroke={nameColor} strokeWidth="1.2" />
      <line x1="141" y1="2" x2="141" y2="22" stroke={nameColor} strokeWidth="1.2" />

      {/* ── REAL ESTATE ── */}
      <text
        x="0"
        y="38"
        fontSize="7"
        letterSpacing="4"
        fill={subColor}
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="300"
      >
        REAL ESTATE
      </text>
    </svg>
  )
}
