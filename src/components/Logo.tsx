export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 132" className={className}>
      <defs>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00"/>
          <stop offset="100%" stopColor="#FFAA00"/>
        </linearGradient>
        <linearGradient id="greenIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A8A45"/>
          <stop offset="100%" stopColor="#0D5C2E"/>
        </linearGradient>
      </defs>
      {/* HOUSE ICON */}
      <polygon points="58,10 104,52 12,52" fill="url(#greenIcon)"/>
      <rect x="84" y="18" width="10" height="20" rx="2" fill="#1A8A45"/>
      <rect x="20" y="52" width="76" height="50" rx="2" fill="#F2FAF5" stroke="#1A8A45" strokeWidth="1.5"/>
      {/* Door */}
      <rect x="44" y="70" width="22" height="32" rx="3" fill="url(#orangeGrad)"/>
      <path d="M44,70 Q55,58 66,70" fill="url(#orangeGrad)"/>
      <circle cx="63" cy="87" r="2" fill="white"/>
      {/* Window left */}
      <rect x="24" y="60" width="15" height="12" rx="2" fill="none" stroke="#1A8A45" strokeWidth="1"/>
      <line x1="31.5" y1="60" x2="31.5" y2="72" stroke="#1A8A45" strokeWidth="1" opacity="0.5"/>
      <line x1="24" y1="66" x2="39" y2="66" stroke="#1A8A45" strokeWidth="1" opacity="0.5"/>
      {/* Window right */}
      <rect x="77" y="60" width="15" height="12" rx="2" fill="none" stroke="#1A8A45" strokeWidth="1"/>
      <line x1="84.5" y1="60" x2="84.5" y2="72" stroke="#1A8A45" strokeWidth="1" opacity="0.5"/>
      <line x1="77" y1="66" x2="92" y2="66" stroke="#1A8A45" strokeWidth="1" opacity="0.5"/>
      {/* VERTICAL DIVIDER */}
      <rect x="122" y="8" width="1.5" height="116" rx="1" fill="#E0E0E0"/>
      {/* FLORIDA label */}
      <text x="140" y="34" fontFamily="Montserrat, Arial, sans-serif" fontSize="9.5" fontWeight="800" fill="#1A8A45" letterSpacing="5">FLORIDA</text>
      {/* FAST */}
      <text x="136" y="88" fontFamily="'Barlow Condensed', 'Arial Narrow', Arial, sans-serif" fontSize="68" fontWeight="800" fill="url(#orangeGrad)" letterSpacing="1">FAST</text>
      {/* Underline rule */}
      <rect x="138" y="94" width="295" height="3" rx="1.5" fill="url(#orangeGrad)"/>
      {/* HOME SALE */}
      <text x="141" y="113" fontFamily="Montserrat, Arial, sans-serif" fontSize="15" fontWeight="300" fill="#333333" letterSpacing="10">HOME SALE</text>
      {/* Tagline */}
      <text x="141" y="128" fontFamily="Montserrat, Arial, sans-serif" fontSize="7.5" fontWeight="600" fill="#BBBBBB" letterSpacing="3.5">CASH OFFERS · CENTRAL FLORIDA</text>
    </svg>
  );
}
