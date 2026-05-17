'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Leaderboard() {
  const [tab, setTab] = useState('xp')
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      await loadTab('xp')
      setLoading(false)
    }
    getData()
  }, [])

  const loadTab = async (selectedTab) => {
    setLoading(true)
    setTab(selectedTab)

    let orderColumn = 'xp'
    if (selectedTab === 'beans') orderColumn = 'beans'
    if (selectedTab === 'streak') orderColumn = 'streak'
    if (selectedTab === 'level') orderColumn = 'level'

    const { data } = await supabase
      .from('leaderboard_data')
      .select('*')
      .order(orderColumn, { ascending: false })
      .limit(20)

    setPlayers(data || [])
    setLoading(false)
  }

  const tabs = [
    { id: 'xp', label: 'Top XP' },
    { id: 'level', label: 'Top Level' },
    { id: 'beans', label: 'Top Beans' },
    { id: 'streak', label: 'Top Streak' },
  ]

  const getValue = (player) => {
    if (tab === 'xp') return player.xp + ' XP'
    if (tab === 'level') return 'Level ' + player.level
    if (tab === 'beans') return Math.floor(player.beans) + ' Beans'
    if (tab === 'streak') return player.streak + ' 🔥'
  }

  const getMedal = (index) => {
    if (index === 0) return '🥇'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return '#' + (index + 1)
  }

  const getUsername = (player) => {
    return player.email ? player.email.split('@')[0] : 'Anonymous'
  }

  const isCurrentUser = (player) => {
    return user && player.user_id === user.id
  }

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '40px' }}>

      <p style={{ fontFamily: 'Arial', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#2ecc71', marginBottom: '8px' }}>Phase 3C</p>
      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '48px', letterSpacing: '4px', color: '#f0f7f2', margin: '0 0 8px' }}>LEADERBOARD</h1>
      <p style={{ color: '#6b8a72', fontSize: '16px', marginBottom: '40px' }}>Who's building the most wealth on Beans?</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => loadTab(t.id)}
            style={{
              padding: '10px 24px',
              background: tab === t.id ? '#1a7a43' : '#111a14',
              color: tab === t.id ? 'white' : '#6b8a72',
              border: '1px solid #1e2e22',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '1px'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#6b8a72' }}>Loading...</p>
      ) : players.length === 0 ? (
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#6b8a72' }}>No players yet. Be the first on the board.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {players.map((player, index) => (
            <div
              key={player.user_id}
              style={{
                background: isCurrentUser(player) ? 'rgba(46,204,113,0.08)' : '#111a14',
                border: '1px solid ' + (isCurrentUser(player) ? '#1a7a43' : index < 3 ? '#2a3a2a' : '#1e2e22'),
                borderRadius: '8px',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: index === 0 ? '#c9a84c' : index === 1 ? '#888' : index === 2 ? '#a0522d' : '#1e2e22',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: index < 3 ? '18px' : '13px',
                  fontWeight: 'bold',
                  color: index < 3 ? 'white' : '#6b8a72',
                  flexShrink: 0
                }}>
                  {getMedal(index)}
                </div>
                <div>
                  <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '15px' }}>
                    {getUsername(player)}
                    {isCurrentUser(player) && <span style={{ color: '#2ecc71', fontSize: '11px', marginLeft: '8px', letterSpacing: '1px' }}>YOU</span>}
                  </div>
                  <div style={{ color: '#6b8a72', fontSize: '12px' }}>Level {player.level}</div>
                </div>
              </div>
              <div style={{
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fontSize: '18px',
                color: index === 0 ? '#c9a84c' : index === 1 ? '#aaa' : index === 2 ? '#c87941' : '#2ecc71'
              }}>
                {getValue(player)}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}