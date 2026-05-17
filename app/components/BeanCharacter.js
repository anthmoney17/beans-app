export default function BeanCharacter({ color = '#2ecc71', eyes = 'default', accessory = 'none', background = 'default', size = 120 }) {

    const backgrounds = {
      default: '#111a14',
      gold: '#2a1f00',
      purple: '#1a0a2e',
      blue: '#001a2e',
      red: '#2e0a0a',
      elite: '#0a0a0a',
    }
  
    const eyeOptions = {
      default: (
        <>
          <circle cx="38" cy="44" r="6" fill="white" />
          <circle cx="62" cy="44" r="6" fill="white" />
          <circle cx="40" cy="45" r="3" fill="#1a1a1a" />
          <circle cx="64" cy="45" r="3" fill="#1a1a1a" />
          <circle cx="41" cy="44" r="1" fill="white" />
          <circle cx="65" cy="44" r="1" fill="white" />
        </>
      ),
      happy: (
        <>
          <path d="M32 44 Q38 50 44 44" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M56 44 Q62 50 68 44" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ),
      cool: (
        <>
          <rect x="30" y="40" width="16" height="8" rx="4" fill="#1a1a1a" />
          <rect x="54" y="40" width="16" height="8" rx="4" fill="#1a1a1a" />
          <rect x="46" y="42" width="8" height="3" fill="#1a1a1a" />
          <rect x="30" y="40" width="16" height="8" rx="4" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
          <rect x="54" y="40" width="16" height="8" rx="4" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
        </>
      ),
      sleepy: (
        <>
          <path d="M32 44 Q38 40 44 44" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M56 44 Q62 40 68 44" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      ),
      rich: (
        <>
          <circle cx="38" cy="44" r="6" fill="white" />
          <circle cx="62" cy="44" r="6" fill="white" />
          <circle cx="40" cy="45" r="3" fill="#c9a84c" />
          <circle cx="64" cy="45" r="3" fill="#c9a84c" />
          <circle cx="41" cy="44" r="1" fill="white" />
          <circle cx="65" cy="44" r="1" fill="white" />
        </>
      ),
      fire: (
        <>
          <circle cx="38" cy="44" r="6" fill="white" />
          <circle cx="62" cy="44" r="6" fill="white" />
          <circle cx="40" cy="45" r="3" fill="#e74c3c" />
          <circle cx="64" cy="45" r="3" fill="#e74c3c" />
          <circle cx="41" cy="44" r="1" fill="white" />
          <circle cx="65" cy="44" r="1" fill="white" />
        </>
      ),
    }
  
    const accessories = {
      none: null,
      cap: (
        <>
          <ellipse cx="50" cy="22" rx="28" ry="8" fill="#1a1a1a" />
          <rect x="22" y="14" width="56" height="12" rx="6" fill="#1a1a1a" />
          <ellipse cx="50" cy="14" rx="20" ry="6" fill="#333" />
          <rect x="45" y="10" width="10" height="4" rx="2" fill="#555" />
        </>
      ),
      crown: (
        <>
          <polygon points="22,22 32,8 42,18 50,6 58,18 68,8 78,22" fill="#c9a84c" />
          <rect x="22" y="18" width="56" height="8" rx="2" fill="#c9a84c" />
          <circle cx="50" cy="8" r="4" fill="#e74c3c" />
          <circle cx="32" cy="12" r="3" fill="#2ecc71" />
          <circle cx="68" cy="12" r="3" fill="#2ecc71" />
        </>
      ),
      chain: (
        <>
          <path d="M30 72 Q50 80 70 72" stroke="#c9a84c" strokeWidth="3" fill="none" />
          <circle cx="50" cy="80" r="6" fill="#c9a84c" />
          <text x="50" y="84" textAnchor="middle" fontSize="7" fill="#080c0a" fontWeight="bold">$</text>
        </>
      ),
      glasses: (
        <>
          <circle cx="38" cy="44" r="9" fill="none" stroke="#c9a84c" strokeWidth="2" />
          <circle cx="62" cy="44" r="9" fill="none" stroke="#c9a84c" strokeWidth="2" />
          <line x1="47" y1="44" x2="53" y2="44" stroke="#c9a84c" strokeWidth="2" />
          <line x1="20" y1="44" x2="29" y2="44" stroke="#c9a84c" strokeWidth="2" />
          <line x1="71" y1="44" x2="80" y2="44" stroke="#c9a84c" strokeWidth="2" />
        </>
      ),
      tophat: (
        <>
          <rect x="30" y="4" width="40" height="20" rx="3" fill="#1a1a1a" />
          <rect x="20" y="22" width="60" height="6" rx="3" fill="#1a1a1a" />
          <rect x="30" y="22" width="40" height="3" fill="#c9a84c" />
        </>
      ),
      halo: (
        <>
          <ellipse cx="50" cy="10" rx="22" ry="6" fill="none" stroke="#c9a84c" strokeWidth="3" />
          <ellipse cx="50" cy="10" rx="22" ry="6" fill="rgba(201,168,76,0.1)" />
        </>
      ),
    }
  
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ borderRadius: '50%', background: backgrounds[background] || backgrounds.default }}
      >
        <ellipse cx="50" cy="52" rx="32" ry="36" fill={color} />
        <ellipse cx="50" cy="30" rx="26" ry="28" fill={color} />
        <ellipse cx="50" cy="30" rx="20" ry="22" fill={color} opacity="0.3" />
  
        {accessories[accessory]}
        {eyeOptions[eyes]}
  
        <path d="M40 62 Q50 70 60 62" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    )
  }