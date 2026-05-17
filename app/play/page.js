'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function CandlestickChart({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6b8a72', fontSize: '13px' }}>No price history yet</p>
    </div>
  )

  const width = 500
  const height = 200
  const padding = { top: 20, right: 20, bottom: 30, left: 60 }
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
    <svg viewBox={"0 0 " + width + " " + height} style={{ width: '100%', height: '200px' }}>
      <g transform={"translate(" + padding.left + "," + padding.top + ")"}>
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const price = minPrice + t * priceRange
          const y = toY(price)
          return (
            <g key={i}>
              <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="#1e2e22" strokeWidth={1} strokeDasharray="4,4" />
              <text x={-8} y={y + 4} textAnchor="end" fill="#6b8a72" fontSize={10}>
                {price.toFixed(0)}
              </text>
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

export default function Play() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedStock, setSelectedStock] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])
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

  const loadHistory = async (stockId) => {
    const { data: history } = await supabase
      .from('price_history')
      .select('*')
      .eq('stock_id', stockId)
      .order('recorded_at', { ascending: true })
      .limit(30)
    setPriceHistory(history || [])
  }

  useEffect(() => {
    loadData()

    const interval = setInterval(async () => {
      const { data } = await supabase.from('stocks').select('*').order('symbol')
      if (data) setStocks(data)
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

    if (error) { setMessage('Trade failed: ' + error.message); return }

    setMessage('Bought ' + shares + ' share(s) of ' + selectedStock.symbol + ' for ' + total.toFixed(2) + ' Beans!')
    await loadData()
  }

  const sellStock = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedStock) return

    const total = selectedStock.price * shares
    const position = portfolio.find(p => p.stock_id === selectedStock.id)
    const profit = position ? (selectedStock.price - position.avg_buy_price) * shares : 0
    const xpEarned = profit > 0 ? Math.max(10, Math.min(500, Math.floor(profit / 10))) : 0

    const { error } = await supabase.rpc('sell_stock', {
      user_id_input: user.id,
      stock_id_input: selectedStock.id,
      shares_input: shares,
      price_input: selectedStock.price,
      total_input: total
    })

    if (error) { setMessage('Cannot sell: ' + error.message); return }

    setMessage('Sold ' + shares + ' share(s) of ' + selectedStock.symbol + ' for ' + total.toFixed(2) + ' Beans!' + (xpEarned > 0 ? ' +' + xpEarned + ' XP earned!' : ''))
    await loadData()
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
                    onClick={async () => {
                      setSelectedStock(stock)
                      setMessage('')
                      await loadHistory(stock.id)
                    }}
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
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '20px', marginBottom: '2px' }}>{selectedStock.symbol}</div>
                  <div style={{ color: '#6b8a72', fontSize: '13px', marginBottom: '8px' }}>{selectedStock.name}</div>
                  <div style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '24px', marginBottom: '12px' }}>{selectedStock.price.toFixed(2)} Beans/share</div>
                  <div style={{ background: '#0d1410', borderRadius: '8px', padding: '8px' }}>
                    <CandlestickChart data={priceHistory} />
                  </div>
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