export default function BeanCharacter({ color = '#3dbe6c', eyes = 'default', accessory = 'none', background = 'default', size = 120 }) {

    const backgrounds = {
      default: '#111810',
      gold: '#1a1200',
      purple: '#120a1e',
      blue: '#091018',
      red: '#180808',
      elite: '#050505',
    }
  
    const bodyColor = color
    const shadowColor = 'rgba(0,0,0,0.25)'
    const highlightColor = 'rgba(255,255,255,0.15)'
  
    const eyeSet = {
      default: (
        <g>
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="white" />
          <circle cx="37.5" cy="47" r="4" fill="#1a1a1a" />
          <circle cx="65.5" cy="47" r="4" fill="#1a1a1a" />
          <circle cx="39" cy="45.5" r="1.5" fill="white" />
          <circle cx="67" cy="45.5" r="1.5" fill="white" />
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        </g>
      ),
      happy: (
        <g>
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="white" />
          <path d="M29 47 Q36 54 43 47" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M57 47 Q64 54 71 47" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="33" cy="52" r="3" fill="rgba(255,150,100,0.3)" />
          <circle cx="67" cy="52" r="3" fill="rgba(255,150,100,0.3)" />
        </g>
      ),
      cool: (
        <g>
          <rect x="27" y="41" width="18" height="10" rx="5" fill="#1a1a1a" />
          <rect x="55" y="41" width="18" height="10" rx="5" fill="#1a1a1a" />
          <rect x="45" y="44" width="10" height="3" fill="#1a1a1a" />
          <rect x="27" y="41" width="18" height="10" rx="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <rect x="55" y="41" width="18" height="10" rx="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <rect x="29" y="43" width="6" height="3" rx="1" fill="rgba(255,255,255,0.1)" />
          <rect x="57" y="43" width="6" height="3" rx="1" fill="rgba(255,255,255,0.1)" />
        </g>
      ),
      sleepy: (
        <g>
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="36" cy="49" rx="7" ry="4" fill={color} opacity="0.9" />
          <ellipse cx="64" cy="49" rx="7" ry="4" fill={color} opacity="0.9" />
          <path d="M30 46 Q36 43 42 46" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M58 46 Q64 43 70 46" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      ),
      rich: (
        <g>
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="white" />
          <circle cx="37.5" cy="47" r="4" fill="#d4a843" />
          <circle cx="65.5" cy="47" r="4" fill="#d4a843" />
          <circle cx="39" cy="45.5" r="1.5" fill="rgba(255,255,255,0.6)" />
          <circle cx="67" cy="45.5" r="1.5" fill="rgba(255,255,255,0.6)" />
          <circle cx="33" cy="52" r="3" fill="rgba(255,200,50,0.3)" />
          <circle cx="67" cy="52" r="3" fill="rgba(255,200,50,0.3)" />
        </g>
      ),
      fire: (
        <g>
          <ellipse cx="36" cy="46" rx="7" ry="7.5" fill="white" />
          <ellipse cx="64" cy="46" rx="7" ry="7.5" fill="white" />
          <circle cx="37.5" cy="47" r="4" fill="#e05252" />
          <circle cx="65.5" cy="47" r="4" fill="#e05252" />
          <circle cx="39" cy="45.5" r="1.5" fill="rgba(255,200,100,0.8)" />
          <circle cx="67" cy="45.5" r="1.5" fill="rgba(255,200,100,0.8)" />
          <text x="50" y="26" textAnchor="middle" fontSize="10">🔥</text>
        </g>
      ),
    }
  
    const accessorySet = {
      none: null,
      cap: (
        <g>
          <ellipse cx="50" cy="23" rx="26" ry="7" fill="#1a1a1a" />
          <path d="M24 23 Q50 8 76 23" fill="#222" />
          <ellipse cx="50" cy="23" rx="26" ry="7" fill="#252525" />
          <rect x="44" y="10" width="12" height="5" rx="2" fill="#333" />
          <ellipse cx="50" cy="22" rx="10" ry="3" fill="rgba(255,255,255,0.05)" />
        </g>
      ),
      crown: (
        <g>
          <path d="M20 26 L28 10 L36 20 L50 6 L64 20 L72 10 L80 26 Z" fill="#d4a843" />
          <rect x="20" y="22" width="60" height="10" rx="3" fill="#d4a843" />
          <rect x="20" y="22" width="60" height="4" rx="0" fill="#c49030" />
          <circle cx="50" cy="8" r="4.5" fill="#e05252" />
          <circle cx="28" cy="13" r="3" fill="#3dbe6c" />
          <circle cx="72" cy="13" r="3" fill="#3dbe6c" />
          <circle cx="50" cy="27" r="2" fill="#c49030" />
          <circle cx="35" cy="27" r="2" fill="#c49030" />
          <circle cx="65" cy="27" r="2" fill="#c49030" />
        </g>
      ),
      chain: (
        <g>
          <path d="M28 74 Q50 84 72 74" stroke="#d4a843" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M28 74 Q50 84 72 74" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeLinecap="round" />
          <circle cx="50" cy="84" r="7" fill="#d4a843" />
          <circle cx="50" cy="84" r="5" fill="#c49030" />
          <text x="50" y="88" textAnchor="middle" fontSize="7" fill="#1a1000" fontWeight="bold">$</text>
        </g>
      ),
      glasses: (
        <g>
          <circle cx="36" cy="46" r="10" fill="rgba(100,200,255,0.1)" stroke="#d4a843" strokeWidth="2" />
          <circle cx="64" cy="46" r="10" fill="rgba(100,200,255,0.1)" stroke="#d4a843" strokeWidth="2" />
          <line x1="46" y1="46" x2="54" y2="46" stroke="#d4a843" strokeWidth="2" />
          <line x1="18" y1="44" x2="26" y2="46" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="46" x2="82" y2="44" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
        </g>
      ),
      tophat: (
        <g>
          <rect x="32" y="6" width="36" height="20" rx="3" fill="#111" />
          <rect x="32" y="6" width="36" height="4" rx="2" fill="#1a1a1a" />
          <rect x="20" y="24" width="60" height="7" rx="3" fill="#111" />
          <rect x="32" y="22" width="36" height="4" fill="#d4a843" opacity="0.6" />
          <rect x="34" y="8" width="10" height="16" rx="1" fill="rgba(255,255,255,0.03)" />
        </g>
      ),
      halo: (
        <g>
          <ellipse cx="50" cy="10" rx="24" ry="7" fill="none" stroke="#d4a843" strokeWidth="3" />
          <ellipse cx="50" cy="10" rx="24" ry="7" fill="rgba(212,168,67,0.08)" />
          <ellipse cx="50" cy="10" rx="24" ry="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </g>
      ),
    }
  
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ borderRadius: '50%', background: backgrounds[background] || backgrounds.default, display: 'block' }}
      >
        <defs>
          <radialGradient id={"bg_" + size} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id={"body_" + size} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
          </radialGradient>
        </defs>
  
        <ellipse cx="50" cy="100" rx="28" ry="6" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="50" cy="58" rx="30" ry="34" fill={bodyColor} />
        <ellipse cx="50" cy="34" rx="26" ry="30" fill={bodyColor} />
        <ellipse cx="50" cy="44" rx="29" ry="32" fill={bodyColor} />
        <ellipse cx="50" cy="44" rx="29" ry="32" fill={"url(#body_" + size + ")"} />
        <ellipse cx="42" cy="32" rx="8" ry="10" fill="rgba(255,255,255,0.08)" />
  
        {accessorySet[accessory]}
        {eyeSet[eyes]}
  
        <path d="M38 64 Q50 73 62 64" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M38 63 Q50 72 62 63" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
  
        <ellipse cx="50" cy="44" rx="29" ry="32" fill={"url(#bg_" + size + ")"} />
      </svg>
    )
  }