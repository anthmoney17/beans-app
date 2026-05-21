'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const navItems = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/learn', label: 'Learn', icon: '📖' },
  { href: '/play', label: 'Practice', icon: '◎' },
  { href: '/exchange', label: 'Exchange', icon: '⇄' },
  { href: '/journal', label: 'Journal', icon: '✎' },
  { href: '/leaderboard', label: 'Records', icon: '◈' },
  { href: '/community', label: 'Community', icon: '◉' },
]

const bottomItems = [
  { href: '/profile', label: 'Thaleon', icon: '✦', gold: true },
  { href: '/settings', label: 'Settings', icon: '⚙' },
]

const quotes = [
  { text: "The years will pass anyway. The question is what you build with them.", author: "Southern Proverb" },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "The goal isn't to predict the market. The goal is to prepare for it.", author: "Unknown" },
  { text: "Wealth is not about having a lot of money. It's about having a lot of options.", author: "Chris Rock" },
  { text: "Discipline today, freedom tomorrow.", author: "Beans" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
]

export default function Sidebar() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [currentPath, setCurrentPath] = useState('/')
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
    setCurrentPath(window.location.pathname)

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        setProfile(data)
      }
    }
    getUser()
  }, [])

  const getUsername = () => {
    if (profile?.username) return profile.username
    if (user?.email) return user.email.split('@')[0]
    return 'Steward'
  }

  const xp = profile?.xp || 0
  const level = profile?.level || 1
  const xpForNext = level * 200
  const xpProgress = Math.min((xp % xpForNext) / xpForNext * 100, 100)

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', flexShrink: 0 }}>
            <svg viewBox="0 0 32 32" fill="none">
              <ellipse cx="16" cy="20" rx="10" ry="11" fill="#4a7c59" />
              <ellipse cx="16" cy="12" rx="8" ry="10" fill="#4a7c59" />
              <ellipse cx="16" cy="16" rx="9" ry="10" fill="#4a7c59" />
              <ellipse cx="13" cy="11" rx="3" ry="4" fill="rgba(255,255,255,0.12)" />
              <path d="M10 22 Q16 27 22 22" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="13" cy="15" r="1.5" fill="#1a1714" />
              <circle cx="19" cy="15" r="1.5" fill="#1a1714" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: '600', color: 'var(--white)', letterSpacing: '0.5px' }}>BEANS</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>Trading Co.</div>
          </div>
        </a>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {navItems.map(item => (
          
            key={item.href}
            href={item.href}
            className={`nav-item ${currentPath === item.href ? 'active' : ''}`}
          >
            <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}

        <div style={{ height: '1px', background: 'var(--border)', margin: '12px 16px' }} />

        {bottomItems.map(item => (
          
            key={item.href}
            href={item.href}
            className={`nav-item ${item.gold ? 'nav-item-gold' : ''} ${currentPath === item.href ? 'active' : ''}`}
            style={item.gold ? { color: 'var(--gold-dim)' } : {}}
          >
            <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.gold && <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '1px', background: 'var(--gold-subtle)', border: '1px solid var(--gold-dim)', color: 'var(--gold)', padding: '2px 6px', borderRadius: '3px' }}>AI</span>}
          </a>
        ))}
      </nav>

      {/* BEAN CHARACTER PANEL */}
      <div style={{ margin: '8px', borderRadius: '8px', overflow: 'hidden', position: 'relative', height: '180px', background: 'var(--surface)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 40%, #0a0f0c 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-light)', flexShrink: 0 }}>
              <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                <rect width="28" height="28" fill="#0f1a12" />
                <ellipse cx="14" cy="17" rx="8" ry="9" fill="#4a7c59" />
                <ellipse cx="14" cy="10" rx="7" ry="8" fill="#4a7c59" />
                <circle cx="11.5" cy="12" r="1.2" fill="#1a1714" />
                <circle cx="16.5" cy="12" r="1.2" fill="#1a1714" />
                <path d="M10 18 Q14 21 18 18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>{getUsername()}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '1px' }}>STEWARD · LEVEL {level}</div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill-gold" style={{ width: xpProgress + '%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>{xp} XP</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>{xpForNext} XP</span>
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div style={{ padding: '12px 16px 20px' }}>
        <div className="quote-block">
          <p style={{ marginBottom: '4px' }}>"{quote.text}"</p>
          <p style={{ fontSize: '10px', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px', fontStyle: 'normal' }}>— {quote.author}</p>
        </div>
      </div>

      {/* SIGN OUT */}
      {user && (
        <div style={{ padding: '0 16px 16px' }}>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth' }}
            style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-dim)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
          >
            <span>↪</span> Sign Out
          </button>
        </div>
      )}
    </aside>
  )
}