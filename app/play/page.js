'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Play() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedStock, setSelectedStock] = useState(null)
  const [shares, setShares] = useState(1)
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState('market')

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    const { data: stocksData } = await supabase
      .from('stocks')
      .select('*')
      .order('symbol')
    setStocks(stocksData || [])

    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      setProfile(profileData)

      const { data: portfolioData } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', user.id)
      setPortfolio(portfolioData || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const interval = setInterval(async () => {
      const { data, error } = await supabase.from('stocks').select('*').order('symbol')
      if (data) {
        setStocks([...data])
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const buyStock = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedStock) return

    const total = selectedStock.price * shares

    if (total > profile.beans) {
      setMessage('Not enough Beans to complete this trade.')
      return
    }

    const { error } = await supabase.rpc('buy_stock', {
      user_id_input: user.id,
      stock_id_input: selectedStock.id,
      shares_input: shares,
      price_input: selectedStock.price,
      total_input: total
    })

    if (error) {
      setMessage('Trade failed: ' + error.message)
      return
    }

    setMessage('Bought ' + shares + ' share(s) of ' + selectedStock.symbol + ' for ' + total.toFixed(2) + ' Beans!')
    await loadData()
  }

  const sellStock = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedStock) return

    const total = selectedStock.price * shares

    const { error } = await supabase.rpc('sell_stock', {
      user_id_input: user.id,
      stock_id_input: selectedStock.id,
      shares_input: shares,
      price_input: selectedStock.price,
      total_input: total
    })

    if (error) {
      setMessage('Cannot sell: ' + error.message)
      return
    }

    const profit = (selectedStock.price - (portfolio.find(p => p.stock_id === selectedStock.id)?.avg_buy_price || 0)) * shares
const xpEarned = profit > 0 ? Math.max(10, Math.min(500, Math.floor(profit / 10))) : 0
setMessage('Sold ' + shares + ' share(s) of ' + selectedStock.symbol + ' for ' + total.toFixed(2) + ' Beans!' + (xpEarned > 0 ? ' +' + xpEarned + ' XP earned!' : ''))
  }

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading market...</p>

  const portfolioValue = portfolio.reduce((sum, p) => {
    const stock = stocks.find(s => s.id === p.stock_id)
    return sum + (stock ? stock.price * p.shares : 0)
  }, 0)

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px 40px' }}>

      <p style={{ fontFamily: 'Arial', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#2ecc71', marginBottom: '8px' }}>Phase 3</p>
      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '48px', letterSpacing: '4px', color: '#f0f7f2', margin: '0 0 8px' }}>PLAY</h1>
      <p style={{ color: '#6b8a72', fontSize: '16px', marginBottom: '32px' }}>Trade stocks with your Beans. Build your portfolio. No real money.</p>

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
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f0f7f2' }}>{portfolio.length}</div>
          <div style={{ fontSize: '11px', color: '#6b8a72', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Positions</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setTab('market')} style={{ padding: '10px 24px', background: tab === 'market' ? '#1a7a43' : '#111a14', color: tab === 'market' ? 'white' : '#6b8a72', border: '1px solid #1e2e22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>Market</button>
        <button onClick={() => setTab('portfolio')} style={{ padding: '10px 24px', background: tab === 'portfolio' ? '#1a7a43' : '#111a14', color: tab === 'portfolio' ? 'white' : '#6b8a72', border: '1px solid #1e2e22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px' }}>Portfolio</button>
      </div>

      {tab === 'market' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h2 style={{ color: '#f0f7f2', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Stocks</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stocks.map(stock => {
                const change = ((stock.price - stock.previous_price) / stock.previous_price * 100).toFixed(2)
                const isUp = stock.price >= stock.previous_price
                return (
                  <div
                    key={stock.id}
                    onClick={() => { setSelectedStock(stock); setMessage('') }}
                    style={{
                      background: selectedStock?.id === stock.id ? 'rgba(26,122,67,0.2)' : '#111a14',
                      border: '1px solid ' + (selectedStock?.id === stock.id ? '#1a7a43' : '#1e2e22'),
                      borderRadius: '8px',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '15px' }}>{stock.symbol}</div>
                      <div style={{ color: '#6b8a72', fontSize: '12px' }}>{stock.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#f0f7f2', fontWeight: 'bold' }}>{stock.price.toFixed(2)}</div>
                      <div style={{ color: isUp ? '#2ecc71' : '#e74c3c', fontSize: '12px' }}>{isUp ? '+' : ''}{change}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 style={{ color: '#f0f7f2', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Trade</h2>
            {selectedStock ? (
              <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '20px' }}>{selectedStock.symbol}</div>
                  <div style={{ color: '#6b8a72', fontSize: '13px', marginBottom: '4px' }}>{selectedStock.name}</div>
                  <div style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '24px' }}>{selectedStock.price.toFixed(2)} Beans/share</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: '#6b8a72', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Number of Shares</label>
                  <input
                    type="number"
                    min="1"
                    value={shares}
                    onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                    style={{ width: '100%', padding: '12px', background: '#0d1410', border: '1px solid #1e2e22', borderRadius: '4px', color: '#f0f7f2', fontSize: '16px' }}
                  />
                </div>

                <div style={{ background: '#0d1410', borderRadius: '4px', padding: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b8a72', fontSize: '13px' }}>Total Cost</span>
                  <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>{(selectedStock.price * shares).toFixed(2)} Beans</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={buyStock} style={{ padding: '14px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}>BUY</button>
                  <button onClick={sellStock} style={{ padding: '14px', background: '#111a14', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}>SELL</button>
                </div>

                {message && (
                  <p style={{ marginTop: '16px', color: message.includes('Cannot') || message.includes('failed') || message.includes('Not enough') ? '#e74c3c' : '#2ecc71', fontSize: '13px', textAlign: 'center' }}>{message}</p>
                )}
              </div>
            ) : (
              <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: '#6b8a72' }}>Select a stock to trade</p>
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
              <p style={{ color: '#6b8a72' }}>No positions yet. Buy your first stock in the Market tab.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {portfolio.map(position => {
                const stock = stocks.find(s => s.id === position.stock_id)
                if (!stock) return null
                const currentValue = stock.price * position.shares
                const costBasis = position.avg_buy_price * position.shares
                const pnl = currentValue - costBasis
                const pnlPct = ((pnl / costBasis) * 100).toFixed(2)
                return (
                  <div key={position.id} style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '16px' }}>{stock.symbol}</div>
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