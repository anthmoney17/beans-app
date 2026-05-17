'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        } else {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({ user_id: user.id, xp: 0, level: 1, beans: 500 })
            .select()
            .single()
          setProfile(newProfile)
        }
      }

      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading...</p>

  if (!user) return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <p style={{ color: '#6b8a72' }}>You are not signed in.</p>
      <a href="/auth" style={{ color: '#2ecc71' }}>Sign in here</a>
    </div>
  )

  const xp = profile?.xp || 0
  const level = profile?.level || 1
  const beans = profile?.beans || 500
  const streak = profile?.streak || 0
  const xpForNextLevel = level * 200
  const xpProgress = Math.min((xp % xpForNextLevel) / xpForNextLevel * 100, 100)

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '40px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#1a7a43', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px', fontWeight: 'bold', flexShrink: 0 }}>
          {user.email[0].toUpperCase()}
        </div>
        <div>
          <h1 style={{ margin: 0, color: '#f0f7f2', fontSize: '22px', fontWeight: 'bold' }}>{user.email}</h1>
          <p style={{ margin: '4px 0 0', color: '#6b8a72', fontSize: '13px' }}>Member since {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2ecc71' }}>{level}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Level</div>
        </div>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2ecc71' }}>{xp}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>XP</div>
        </div>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#c9a84c' }}>{Math.floor(beans)}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Beans</div>
        </div>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#c9a84c' }}>{streak}🔥</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Streak</div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#6b8a72', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>XP Progress</span>
          <span style={{ color: '#2ecc71', fontSize: '12px', fontWeight: 'bold' }}>Level {level + 1} in {xpForNextLevel - (xp % xpForNextLevel)} XP</span>
        </div>
        <div style={{ background: '#1e2e22', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: xpProgress + '%', background: 'linear-gradient(90deg, #1a7a43, #2ecc71)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '40px' }}>
        <a href="/learn" style={{ display: 'block', padding: '16px', background: '#1a7a43', color: 'white', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Learn</a>
        <a href="/play" style={{ display: 'block', padding: '16px', background: '#111a14', color: '#2ecc71', border: '1px solid #1e2e22', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Play</a>
        <a href="/trade" style={{ display: 'block', padding: '16px', background: '#111a14', color: '#2ecc71', border: '1px solid #1e2e22', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Trade</a>
      </div>

      <button
        onClick={async () => { await supabase.auth.signOut(); window.location.href = '/auth' }}
        style={{ padding: '12px 24px', background: 'none', border: '1px solid #1e2e22', borderRadius: '4px', color: '#6b8a72', cursor: 'pointer', fontSize: '13px' }}
      >
        Sign Out
      </button>

    </div>
  )
}