'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import BeanCharacter from '../components/BeanCharacter'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingCharacter, setEditingCharacter] = useState(false)
  const [saving, setSaving] = useState(false)

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

  const saveCharacter = async () => {
    setSaving(true)
    await supabase
      .from('profiles')
      .update({
        character_color: profile.character_color,
        character_eyes: profile.character_eyes,
        character_accessory: profile.character_accessory,
        character_background: profile.character_background
      })
      .eq('user_id', user.id)
    setSaving(false)
    setEditingCharacter(false)
  }

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading...</p>

  if (!user) return (
    <div style={{ padding: '40px' }}>
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

  const colors = [
    { value: '#2ecc71', label: 'Green', unlockLevel: 1 },
    { value: '#c9a84c', label: 'Gold', unlockLevel: 3 },
    { value: '#3498db', label: 'Blue', unlockLevel: 5 },
    { value: '#e74c3c', label: 'Red', unlockLevel: 7 },
    { value: '#9b59b6', label: 'Purple', unlockLevel: 10 },
    { value: '#1a1a1a', label: 'Black', unlockLevel: 15 },
    { value: '#f0f7f2', label: 'White', unlockLevel: 20 },
  ]

  const eyeOptions = [
    { value: 'default', label: 'Default', unlockLevel: 1 },
    { value: 'happy', label: 'Happy', unlockLevel: 2 },
    { value: 'cool', label: 'Cool', unlockLevel: 4 },
    { value: 'sleepy', label: 'Sleepy', unlockLevel: 6 },
    { value: 'rich', label: 'Rich', unlockLevel: 8 },
    { value: 'fire', label: 'Fire', unlockLevel: 12 },
  ]

  const accessoryOptions = [
    { value: 'none', label: 'None', unlockLevel: 1 },
    { value: 'cap', label: 'Cap', unlockLevel: 2 },
    { value: 'glasses', label: 'Glasses', unlockLevel: 3 },
    { value: 'chain', label: 'Chain', unlockLevel: 5 },
    { value: 'halo', label: 'Halo', unlockLevel: 8 },
    { value: 'tophat', label: 'Top Hat', unlockLevel: 12 },
    { value: 'crown', label: 'Crown', unlockLevel: 20 },
  ]

  const backgroundOptions = [
    { value: 'default', label: 'Default', unlockLevel: 1 },
    { value: 'blue', label: 'Blue', unlockLevel: 3 },
    { value: 'purple', label: 'Purple', unlockLevel: 5 },
    { value: 'red', label: 'Red', unlockLevel: 8 },
    { value: 'gold', label: 'Gold', unlockLevel: 10 },
    { value: 'elite', label: 'Elite', unlockLevel: 25 },
  ]

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '40px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setEditingCharacter(!editingCharacter)}>
          <BeanCharacter
            color={profile?.character_color || '#2ecc71'}
            eyes={profile?.character_eyes || 'default'}
            accessory={profile?.character_accessory || 'none'}
            background={profile?.character_background || 'default'}
            size={100}
          />
          <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#1a7a43', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✏️</div>
        </div>
        <div>
          <h1 style={{ margin: 0, color: '#f0f7f2', fontSize: '22px', fontWeight: 'bold' }}>{user.email}</h1>
          <p style={{ margin: '4px 0 0', color: '#6b8a72', fontSize: '13px' }}>Member since {new Date(user.created_at).toLocaleDateString()}</p>
          <p style={{ margin: '4px 0 0', color: '#6b8a72', fontSize: '12px' }}>Tap character to customize</p>
        </div>
      </div>

      {editingCharacter && (
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#f0f7f2', fontFamily: 'Arial', fontSize: '18px', letterSpacing: '2px', margin: 0 }}>CUSTOMIZE BEAN</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BeanCharacter
                color={profile?.character_color || '#2ecc71'}
                eyes={profile?.character_eyes || 'default'}
                accessory={profile?.character_accessory || 'none'}
                background={profile?.character_background || 'default'}
                size={80}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Color</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {colors.map(c => {
                const locked = level < c.unlockLevel
                return (
                  <div
                    key={c.value}
                    onClick={() => !locked && setProfile({ ...profile, character_color: c.value })}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: locked ? '#1e2e22' : c.value,
                      border: '2px solid ' + (profile?.character_color === c.value ? '#f0f7f2' : 'transparent'),
                      cursor: locked ? 'not-allowed' : 'pointer',
                      position: 'relative',
                      opacity: locked ? 0.4 : 1
                    }}
                    title={locked ? 'Unlock at Level ' + c.unlockLevel : c.label}
                  >
                    {locked && <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '14px' }}>🔒</span>}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Eyes</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {eyeOptions.map(e => {
                const locked = level < e.unlockLevel
                return (
                  <div
                    key={e.value}
                    onClick={() => !locked && setProfile({ ...profile, character_eyes: e.value })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      background: profile?.character_eyes === e.value ? '#1a7a43' : '#0d1410',
                      border: '1px solid ' + (profile?.character_eyes === e.value ? '#2ecc71' : '#1e2e22'),
                      color: locked ? '#6b8a72' : '#f0f7f2',
                      fontSize: '12px',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.4 : 1
                    }}
                    title={locked ? 'Unlock at Level ' + e.unlockLevel : e.label}
                  >
                    {locked ? '🔒 ' : ''}{e.label}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Accessory</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {accessoryOptions.map(a => {
                const locked = level < a.unlockLevel
                return (
                  <div
                    key={a.value}
                    onClick={() => !locked && setProfile({ ...profile, character_accessory: a.value })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      background: profile?.character_accessory === a.value ? '#1a7a43' : '#0d1410',
                      border: '1px solid ' + (profile?.character_accessory === a.value ? '#2ecc71' : '#1e2e22'),
                      color: locked ? '#6b8a72' : '#f0f7f2',
                      fontSize: '12px',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.4 : 1
                    }}
                    title={locked ? 'Unlock at Level ' + a.unlockLevel : a.label}
                  >
                    {locked ? '🔒 ' : ''}{a.label}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Background</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {backgroundOptions.map(b => {
                const locked = level < b.unlockLevel
                return (
                  <div
                    key={b.value}
                    onClick={() => !locked && setProfile({ ...profile, character_background: b.value })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      background: profile?.character_background === b.value ? '#1a7a43' : '#0d1410',
                      border: '1px solid ' + (profile?.character_background === b.value ? '#2ecc71' : '#1e2e22'),
                      color: locked ? '#6b8a72' : '#f0f7f2',
                      fontSize: '12px',
                      cursor: locked ? 'not-allowed' : 'pointer',
                      opacity: locked ? 0.4 : 1
                    }}
                    title={locked ? 'Unlock at Level ' + b.unlockLevel : b.label}
                  >
                    {locked ? '🔒 ' : ''}{b.label}
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={saveCharacter}
            disabled={saving}
            style={{ width: '100%', padding: '14px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}
          >
            {saving ? 'Saving...' : 'Save Character'}
          </button>
        </div>
      )}

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
        <a href="/exchange" style={{ display: 'block', padding: '16px', background: '#111a14', color: '#c9a84c', border: '1px solid #1e2e22', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Exchange</a>
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