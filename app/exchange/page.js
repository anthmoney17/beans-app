'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function CandlestickChart({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b8a72', fontSize: '13px' }}>No price history yet</p>
    </div>
  )

  const width = 500
  const height = 160
  const padding = { top: 20, right: 20, bottom: 20, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const prices = data.flatMap(d => [d.high, d.low])
  const minPrice = Math.min(...prices) * 0.999
  const maxPrice = Math.max(...prices) * 1.001
  const priceRange = maxPrice - minPrice

  const candleWidth = Math.max(4, (chartWidth / data.length) - 2)
  const gap = chartWidth / data.length
  const toY = (price) => chartHeight - ((price - minPrice) / priceRange) * chartHeight

  return (
    <svg viewBox={"0 0 " + width + " " + height} style={{ width: '100%', height: '160px' }}>
      <g transform={"translate(" + padding.left + "," + padding.top + ")"}>
        {[0, 0.5, 1].map((t, i) => {
          const price = minPrice + t * priceRange
          const y = toY(price)
          return (
            <g key={i}>
              <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="#1e2e22" strokeWidth={1} strokeDasharray="4,4" />
              <text x={-8} y={y + 4} textAnchor="end" fill="#6b8a72" fontSize={10}>{price.toFixed(0)}</text>
            </g>
          )
        })}
        {data.map((candle, i) => {
          const x = i * gap + gap / 2
          const isUp = candle.close >= candle.open
          const color = isUp ? '#2ecc71' : '#e74c3c'
          const bodyTop = toY(Math.max(candle.open, candle.close))
          const bodyBottom = toY(Math.min(candle.open, candle.close))
          const bodyHeight = Math.max(1, bodyBottom - bodyTop)
          return (
            <g key={i}>
              <line x1={x} y1={toY(candle.high)} x2={x} y2={toY(candle.low)} stroke={color} strokeWidth={1} />
              <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} fill={color} opacity={0.9} />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default function Exchange() {
  const [companies, setCompanies] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])
  const [shares, setShares] = useState(1)
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState('market')
  const [showCreate, setShowCreate] = useState(false)
  const [newCompany, setNewCompany] = useState({ name: '', symbol: '', description: '' })
  const [creating, setCreating] = useState(false)

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    const { data: companiesData } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false })
    setCompanies(companiesData || [])

    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      setProfile(profileData)

      const { data: portfolioData } = await supabase
        .from('exchange_portfolio')
        .select('*')
        .eq('user_id', user.id)
      setPortfolio(portfolioData || [])
    }

    setLoading(false)
  }

  const loadHistory = async (companyId) => {
    const { data: history } = await supabase
      .from('exchange_price_history')
      .select('*')
      .eq('company_id', companyId)
      .order('recorded_at', { ascending: true })
      .limit(30)
    setPriceHistory(history || [])
  }

  useEffect(() => { loadData() }, [])

  const createCompany = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!newCompany.name || !newCompany.symbol) {
      setMessage('Company name and symbol are required.')
      return
    }

    setCreating(true)

    if (profile.beans < 500) {
      setMessage('You need 500 Beans to found a company.')
      setCreating(false)
      return
    }

    const { error } = await supabase
      .from('companies')
      .insert({
        founder_id: user.id,
        name: newCompany.name,
        symbol: newCompany.symbol.toUpperCase(),
        description: newCompany.description,
        price: 100,
        previous_price: 100,
        shares_available: 1000,
        total_shares: 1000
      })

    if (error) {
      setMessage('Error: ' + error.message)
      setCreating(false)
      return
    }

    await supabase.rpc('update_beans', { user_id_input: user.id, new_beans: profile.beans - 500 })
    setMessage('Company founded! 500 Beans deducted as founding fee.')
    setShowCreate(false)
    setNewCompany({ name: '', symbol: '', description: '' })
    await loadData()
    setCreating(false)
  }

  const buyCompany = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedCompany) return

    const total = selectedCompany.price * shares

    if (total > profile.beans) {
      setMessage('Not enough Beans.')
      return
    }

    if (shares > selectedCompany.shares_available) {
      setMessage('Not enough shares available.')
      return
    }

    const { error } = await supabase.rpc('exchange_buy', {
      user_id_input: user.id,
      company_id_input: selectedCompany.id,
      shares_input: shares,
      price_input: selectedCompany.price,
      total_input: total
    })

    if (error) { setMessage('Trade failed: ' + error.message); return }

    setMessage('Bought ' + shares + ' share(s) of ' + selectedCompany.symbol + ' for ' + total.toFixed(2) + ' Beans!')
    await loadData()
    await loadHistory(selectedCompany.id)
  }

  const sellCompany = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedCompany) return

    const total = selectedCompany.price * shares
    const position = portfolio.find(p => p.company_id === selectedCompany.id)
    const profit = position ? (selectedCompany.price - position.avg_buy_price) * shares : 0
    const xpEarned = profit > 0 ? Math.max(10, Math.min(500, Math.floor(profit / 10))) : 0

    const { error } = await supabase.rpc('exchange_sell', {
      user_id_input: user.id,
      company_id_input: selectedCompany.id,
      shares_input: shares,
      price_input: selectedCompany.price,
      total_input: total
    })

    if (error) { setMessage('Cannot sell: ' + error.message); return }

    setMessage('Sold ' + shares + ' share(s) of ' + selectedCompany.symbol + ' for ' + total.toFixed(2) + ' Beans!' + (xpEarned > 0 ? ' +' + xpEarned + ' XP earned!' : ''))
    await loadData()
    await loadHistory(selectedCompany.id)
  }

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading The Exchange...</p>

  const portfolioValue = portfolio.reduce((sum, p) => {
    const company = companies.find(c => c.id === p.company_id)
    return sum + (company ? company.price * p.shares : 0)
  }, 0)

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px 40px' }}>

      <p style={{ fontFamily: 'Arial', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '8px' }}>Phase 3B</p>
      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '48px', letterSpacing: '4px', color: '#f0f7f2', margin: '0 0 8px' }}>THE EXCHANGE</h1>
      <p style={{ color: '#6b8a72', fontSize: '16px', marginBottom: '32px' }}>Build it. Trade it. Own it. — A player-driven stock market.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c9a84c' }}>{profile ? Math.floor(profile.beans) : 0}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Beans Available</div>
        </div>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ecc71' }}>{portfolioValue.toFixed(2)}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Portfolio Value</div>
        </div>
        <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0f7f2' }}>{companies.length}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Companies Listed</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button onClick={() => setTab('market')} style={{ padding: '10px 24px', background: tab === 'market' ? '#1a7a43' : '#111a14', color: tab === 'market' ? 'white' : '#6b8a72', border: '1px solid #1e2e22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>Market</button>
        <button onClick={() => setTab('portfolio')} style={{ padding: '10px 24px', background: tab === 'portfolio' ? '#1a7a43' : '#111a14', color: tab === 'portfolio' ? 'white' : '#6b8a72', border: '1px solid #1e2e22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>My Holdings</button>
        <button onClick={() => setTab('create')} style={{ padding: '10px 24px', background: tab === 'create' ? '#c9a84c' : '#111a14', color: tab === 'create' ? '#080c0a' : '#c9a84c', border: '1px solid #c9a84c', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>+ Found a Company</button>
      </div>

      {tab === 'create' && (
        <div style={{ background: '#111a14', border: '1px solid #c9a84c', borderRadius: '8px', padding: '32px', maxWidth: '500px' }}>
          <h2 style={{ color: '#c9a84c', fontFamily: 'Arial', fontSize: '24px', letterSpacing: '3px', marginBottom: '8px' }}>FOUND A COMPANY</h2>
          <p style={{ color: '#6b8a72', fontSize: '13px', marginBottom: '24px' }}>Cost: 500 Beans founding fee. Your company starts with 1,000 shares at 100 Beans each.</p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Company Name</label>
            <input type="text" placeholder="e.g. Dean Industries" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} style={{ width: '100%', padding: '12px', background: '#0d1410', border: '1px solid #1e2e22', borderRadius: '4px', color: '#f0f7f2', fontSize: '14px' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Ticker Symbol (max 5 chars)</label>
            <input type="text" placeholder="e.g. DEAN" maxLength={5} value={newCompany.symbol} onChange={(e) => setNewCompany({ ...newCompany, symbol: e.target.value.toUpperCase() })} style={{ width: '100%', padding: '12px', background: '#0d1410', border: '1px solid #1e2e22', borderRadius: '4px', color: '#f0f7f2', fontSize: '14px' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#6b8a72', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Description</label>
            <textarea placeholder="What does your company do?" value={newCompany.description} onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })} rows={3} style={{ width: '100%', padding: '12px', background: '#0d1410', border: '1px solid #1e2e22', borderRadius: '4px', color: '#f0f7f2', fontSize: '14px', resize: 'vertical' }} />
          </div>

          {message && <p style={{ color: message.includes('Error') || message.includes('need') ? '#e74c3c' : '#2ecc71', fontSize: '13px', marginBottom: '16px' }}>{message}</p>}

          <button onClick={createCompany} disabled={creating} style={{ width: '100%', padding: '14px', background: '#c9a84c', color: '#080c0a', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}>
            {creating ? 'Founding...' : 'Found Company — 500 Beans'}
          </button>
        </div>
      )}

      {tab === 'market' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h2 style={{ color: '#f0f7f2', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Listed Companies</h2>
            {companies.length === 0 ? (
              <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: '#6b8a72', marginBottom: '16px' }}>No companies listed yet.</p>
                <button onClick={() => setTab('create')} style={{ background: '#c9a84c', color: '#080c0a', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Be the first to found one</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {companies.map(company => {
                  const change = ((company.price - company.previous_price) / company.previous_price * 100).toFixed(2)
                  const isUp = company.price >= company.previous_price
                  const isFounder = user && company.founder_id === user.id
                  return (
                    <div
                      key={company.id}
                      onClick={async () => {
                        setSelectedCompany(company)
                        setMessage('')
                        await loadHistory(company.id)
                      }}
                      style={{
                        background: selectedCompany?.id === company.id ? 'rgba(201,168,76,0.1)' : '#111a14',
                        border: '1px solid ' + (selectedCompany?.id === company.id ? '#c9a84c' : '#1e2e22'),
                        borderRadius: '8px',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '15px' }}>{company.symbol}</span>
                          {isFounder && <span style={{ background: '#c9a84c', color: '#080c0a', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', letterSpacing: '1px' }}>FOUNDER</span>}
                        </div>
                        <div style={{ color: '#6b8a72', fontSize: '12px' }}>{company.name}</div>
                        <div style={{ color: '#6b8a72', fontSize: '11px', marginTop: '2px' }}>{company.shares_available} shares available</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#f0f7f2', fontWeight: 'bold' }}>{company.price.toFixed(2)}</div>
                        <div style={{ color: isUp ? '#2ecc71' : '#e74c3c', fontSize: '12px' }}>{isUp ? '+' : ''}{change}%</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div>
            <h2 style={{ color: '#f0f7f2', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Trade</h2>
            {selectedCompany ? (
              <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '20px' }}>{selectedCompany.symbol}</span>
                    {user && selectedCompany.founder_id === user.id && <span style={{ background: '#c9a84c', color: '#080c0a', fontSize: '9px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px' }}>YOUR COMPANY</span>}
                  </div>
                  <div style={{ color: '#6b8a72', fontSize: '13px', marginBottom: '4px' }}>{selectedCompany.name}</div>
                  {selectedCompany.description && <div style={{ color: '#6b8a72', fontSize: '12px', marginBottom: '8px', lineHeight: '1.5' }}>{selectedCompany.description}</div>}
                  <div style={{ color: '#c9a84c', fontWeight: 'bold', fontSize: '24px', marginBottom: '12px' }}>{selectedCompany.price.toFixed(2)} Beans/share</div>
                  <div style={{ background: '#0d1410', borderRadius: '8px', padding: '8px', marginBottom: '8px' }}>
                    <CandlestickChart data={priceHistory} />
                  </div>
                  <div style={{ color: '#6b8a72', fontSize: '12px' }}>{selectedCompany.shares_available} of {selectedCompany.total_shares} shares available</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#6b8a72', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Number of Shares</label>
                  <input type="number" min="1" value={shares} onChange={(e) => setShares(parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '12px', background: '#0d1410', border: '1px solid #1e2e22', borderRadius: '4px', color: '#f0f7f2', fontSize: '16px' }} />
                </div>

                <div style={{ background: '#0d1410', borderRadius: '4px', padding: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b8a72', fontSize: '13px' }}>Total Cost</span>
                  <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>{(selectedCompany.price * shares).toFixed(2)} Beans</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={buyCompany} style={{ padding: '14px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}>BUY</button>
                  <button onClick={sellCompany} style={{ padding: '14px', background: '#111a14', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}>SELL</button>
                </div>

                {message && (
                  <p style={{ marginTop: '16px', color: message.includes('Cannot') || message.includes('failed') || message.includes('Not enough') || message.includes('Error') ? '#e74c3c' : '#2ecc71', fontSize: '13px', textAlign: 'center' }}>{message}</p>
                )}
              </div>
            ) : (
              <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: '#6b8a72' }}>Select a company to trade</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'portfolio' && (
        <div>
          <h2 style={{ color: '#f0f7f2', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Your Holdings</h2>
          {portfolio.length === 0 ? (
            <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
              <p style={{ color: '#6b8a72' }}>No positions yet. Buy shares in the Market tab.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {portfolio.map(position => {
                const company = companies.find(c => c.id === position.company_id)
                if (!company) return null
                const currentValue = company.price * position.shares
                const costBasis = position.avg_buy_price * position.shares
                const pnl = currentValue - costBasis
                const pnlPct = ((pnl / costBasis) * 100).toFixed(2)
                return (
                  <div key={position.id} style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '16px' }}>{company.symbol}</div>
                      <div style={{ color: '#6b8a72', fontSize: '12px' }}>{company.name}</div>
                      <div style={{ color: '#6b8a72', fontSize: '12px' }}>{position.shares} shares @ {position.avg_buy_price.toFixed(2)} avg</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#f0f7f2', fontWeight: 'bold' }}>{currentValue.toFixed(2)} Beans</div>
                      <div style={{ color: pnl >= 0 ? '#2ecc71' : '#e74c3c', fontSize: '12px' }}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)} ({pnlPct}%)</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

    </div>
  )
}