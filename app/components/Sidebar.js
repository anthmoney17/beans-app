'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const navItems = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/learn', label: 'Learn', icon: '📖' },
  { href: '/play', label: 'Practice', icon: '◎' },
  { href: '/exchange', label: 'Exchange', icon: '⇄' },
  { href: '/leaderboard', label: 'Records', icon: '◈' },
]

const quotes = [
  { text: "The years will pass anyway. The question is what you build with them.", author: "Southern Proverb" },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "Discipline today, freedom tomorrow.", author: "Beans" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
]

export default function Sidebar() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [currentPath, setCurrentPath] = useState('/')
  const [quote, setQuote] = useState(quotes[0])

useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
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

  const sidebarStyle = {
    width: '220px',
    background: 'var(--deep)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: 50,
    overflowY: 'auto'
  }

  const logoStyle = {
    padding: '24px 20px 16px',
    borderBottom: '1px solid var(--border)'
  }

  const logoLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  }

  const logoTextStyle = {
    fontFamily: 'Playfair Display, serif',
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--white)',
    letterSpacing: '0.5px'
  }

  const logoSubStyle = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '8px',
    letterSpacing: '2px',
    color: 'var(--gold-dim)',
    textTransform: 'uppercase'
  }

  const getNavStyle = (href) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 16px',
    borderRadius: '6px',
    color: currentPath === href ? 'var(--white)' : 'var(--text-muted)',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.15s',
    cursor: 'pointer',
    margin: '1px 8px',
    background: currentPath === href ? 'var(--green-subtle)' : 'transparent',
    borderLeft: currentPath === href ? '2px solid var(--green)' : '2px solid transparent',
    textDecoration: 'none'
  })

  return (
    <aside style={sidebarStyle}>

      <div style={logoStyle}>
        <a href="/" style={logoLinkStyle}>
          <div style={{ width: '32px', height: '32px', flexShrink: 0 }}>
            <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
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
            <div style={logoTextStyle}>BEANS</div>
            <div style={logoSubStyle}>Trading Co.</div>
          </div>
        </a>
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {navItems.map(item => (
          <a key={item.href} href={item.href} style={getNavStyle(item.href)}>
            <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}

        <div style={{ height: '1px', background: 'var(--border)', margin: '12px 16px' }} />

        <a href="/profile" style={getNavStyle('/profile')}>
          <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>✦</span>
          <span style={{ color: currentPath === '/profile' ? 'var(--gold)' : 'var(--gold-dim)' }}>Thaleon</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '1px', background: 'var(--gold-subtle)', border: '1px solid var(--gold-dim)', color: 'var(--gold)', padding: '2px 6px', borderRadius: '3px' }}>AI</span>
        </a>

        <a href="/trade" style={getNavStyle('/trade')}>
          <span style={{ fontSize: '14px', width: '18px', textAlign: 'center', flexShrink: 0 }}>⚙</span>
          <span>Settings</span>
        </a>
      </nav>

      <div style={{ margin: '8px', borderRadius: '8px', overflow: 'hidden', position: 'relative', height: '160px', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 40%, #0a0f0c 100%)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border-light)', flexShrink: 0, background: '#0f1a12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                <ellipse cx="10" cy="13" rx="6" ry="6" fill="#4a7c59" />
                <ellipse cx="10" cy="8" rx="5" ry="6" fill="#4a7c59" />
                <circle cx="8" cy="9" r="1" fill="#1a1714" />
                <circle cx="12" cy="9" r="1" fill="#1a1714" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>{getUsername()}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '1px' }}>STEWARD · LEVEL {level}</div>
            </div>
          </div>
          <div style={{ height: '2px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: xpProgress + '%', background: 'var(--gold)', borderRadius: '1px', transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>{xp} XP</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>{xpForNext} XP</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ borderLeft: '2px solid var(--gold-dim)', padding: '8px 12px' }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.6', marginBottom: '4px' }}>"{quote.text}"</p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '1px' }}>— {quote.author}</p>
        </div>
      </div>

      {user && (
        <div style={{ padding: '0 16px 20px' }}>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth' }}
            style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-dim)', fontSize: '12px', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      )}

    </aside>
  )
}