'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function CandlestickChart({ data }) {
  if (!data || data.length === 0) return (
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>No price history yet</p>
    </div>
  )

  const width = 500
  const height = 200
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
    <svg viewBox={"0 0 " + width + " " + height} style={{ width: '100%', height: '200px' }}>
      <g transform={"translate(" + padding.left + "," + padding.top + ")"}>
        {[0, 0.5, 1].map((t, i) => {
          const price = minPrice + t * priceRange
          const y = toY(price)
          return (
            <g key={i}>
              <line x1={0} y1={y} x2={chartWidth} y2={y} stroke="var(--border)" strokeWidth={1} strokeDasharray="4,4" />
              <text x={-8} y={y + 4} textAnchor="end" fill="var(--text-dim)" fontSize={9} fontFamily="JetBrains Mono">{price.toFixed(0)}</text>
            </g>
          )
        })}
        {data.map((candle, i) => {
          const x = i * gap + gap / 2
          const isUp = candle.close >= candle.open
          const color = isUp ? 'var(--green-light)' : 'var(--red-light)'
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

export default function Practice() {
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
  const [orderType, setOrderType] = useState('Market')

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    const { data: stocksData } = await supabase.from('stocks').select('*').order('symbol')
    setStocks(stocksData || [])

    if (user) {
      const { data: profileData } = await supabase.from('profiles').select('*').eq('user_id', user.id).single()
      setProfile(profileData)
      const { data: portfolioData } = await supabase.from('portfolio').select('*').eq('user_id', user.id)
      setPortfolio(portfolioData || [])
    }

    setLoading(false)
  }

  const loadHistory = async (stockId) => {
    const { data } = await supabase.from('price_history').select('*').eq('stock_id', stockId).order('recorded_at', { ascending: true }).limit(30)
    setPriceHistory(data || [])
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
    if (total > profile.beans) { setMessage('Insufficient capital.'); return }
    const { error } = await supabase.rpc('buy_stock', { user_id_input: user.id, stock_id_input: selectedStock.id, shares_input: shares, price_input: selectedStock.price, total_input: total })
    if (error) { setMessage('Order failed: ' + error.message); return }
    setMessage('Bought ' + shares + ' share(s) of ' + selectedStock.symbol + ' · ' + total.toFixed(2) + ' Beans')
    await loadData()
  }

  const sellStock = async () => {
    if (!user) { window.location.href = '/auth'; return }
    if (!selectedStock) return
    const total = selectedStock.price * shares
    const position = portfolio.find(p => p.stock_id === selectedStock.id)
    const profit = position ? (selectedStock.price - position.avg_buy_price) * shares : 0
    const xpEarned = profit > 0 ? Math.max(10, Math.min(500, Math.floor(profit / 10))) : 0
    const { error } = await supabase.rpc('sell_stock', { user_id_input: user.id, stock_id_input: selectedStock.id, shares_input: shares, price_input: selectedStock.price, total_input: total })
    if (error) { setMessage('Order failed: ' + error.message); return }
    setMessage('Sold ' + shares + ' share(s) of ' + selectedStock.symbol + ' · ' + total.toFixed(2) + ' Beans' + (xpEarned > 0 ? ' · +' + xpEarned + ' XP' : ''))
    await loadData()
  }

  if (loading) return <div style={{ padding: '60px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>Loading markets...</div>

  const portfolioValue = portfolio.reduce((sum, p) => {
    const stock = stocks.find(s => s.id === p.stock_id)
    return sum + (stock ? stock.price * p.shares : 0)
  }, 0)

  const totalInvested = portfolio.reduce((sum, p) => sum + (p.avg_buy_price * p.shares), 0)
  const totalPnL = portfolioValue - totalInvested

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: '100vh' }}>

      {/* MAIN */}
      <div style={{ borderRight: '1px solid var(--border)' }}>

        {/* HEADER */}
        <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Practice Account</div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: '600', color: 'var(--white)', marginBottom: '2px' }}>Practice</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>Build confidence. Test strategies. No real money.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '4px' }}>BUYING POWER</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: 'var(--white)' }}>{Math.floor(profile?.beans || 0).toLocaleString()}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: totalPnL >= 0 ? 'var(--green-light)' : 'var(--red-light)' }}>
                {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)} P&L
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {['market', 'positions'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '14px 24px',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '2px solid var(--gold)' : '2px solid transparent',
                color: tab === t ? 'var(--white)' : 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginBottom: '-1px'
              }}
            >
              {t === 'market' ? 'Paper Trading' : 'Positions (' + portfolio.length + ')'}
            </button>
          ))}
        </div>

        {tab === 'market' && (
          <div>
            {selectedStock && (
              <div style={{ padding: '24px 40px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', color: 'var(--white)', fontWeight: '600' }}>{selectedStock.symbol}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{selectedStock.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', color: 'var(--white)' }}>{selectedStock.price.toFixed(2)}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: selectedStock.price >= selectedStock.previous_price ? 'var(--green-light)' : 'var(--red-light)' }}>
                        {selectedStock.price >= selectedStock.previous_price ? '+' : ''}{((selectedStock.price - selectedStock.previous_price) / selectedStock.previous_price * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['1D', '1W', '1M', 'ALL'].map(period => (
                      <button key={period} style={{ padding: '4px 10px', background: period === '1D' ? 'var(--card)' : 'none', border: '1px solid ' + (period === '1D' ? 'var(--border-light)' : 'transparent'), borderRadius: '4px', color: period === '1D' ? 'var(--white)' : 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'var(--surface)', borderRadius: '6px', padding: '8px' }}>
                  <CandlestickChart data={priceHistory} />
                </div>
              </div>
            )}

            <div style={{ padding: '24px 40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Asset', 'Price', '24H Change', 'Action'].map(h => (
                      <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(stock => {
                    const change = ((stock.price - stock.previous_price) / stock.previous_price * 100).toFixed(2)
                    const isUp = stock.price >= stock.previous_price
                    const isSelected = selectedStock?.id === stock.id
                    return (
                      <tr
                        key={stock.id}
                        onClick={async () => { setSelectedStock(stock); setMessage(''); await loadHistory(stock.id) }}
                        style={{ cursor: 'pointer', background: isSelected ? 'var(--card)' : 'transparent' }}
                      >
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)' }}>
                          <div style={{ fontWeight: '500', color: 'var(--white)', fontSize: '14px' }}>{stock.symbol}</div>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>{stock.name}</div>
                        </td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>{stock.price.toFixed(2)}</td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: isUp ? 'var(--green-light)' : 'var(--red-light)' }}>{isUp ? '+' : ''}{change}%</td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)' }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--gold-dim)' }}>Select →</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'positions' && (
          <div style={{ padding: '24px 40px' }}>
            {portfolio.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', marginBottom: '8px' }}>No positions yet.</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>Select a stock in the Paper Trading tab to begin.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Asset', 'Shares', 'Avg Cost', 'Market Value', 'P&L'].map(h => (
                      <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map(position => {
                    const stock = stocks.find(s => s.id === position.stock_id)
                    if (!stock) return null
                    const value = stock.price * position.shares
                    const cost = position.avg_buy_price * position.shares
                    const pnl = value - cost
                    const pnlPct = ((pnl / cost) * 100).toFixed(2)
                    return (
                      <tr key={position.id}>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)' }}>
                          <div style={{ fontWeight: '500', color: 'var(--white)' }}>{stock.symbol}</div>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>{stock.name}</div>
                        </td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>{position.shares}</td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>{position.avg_buy_price.toFixed(2)}</td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>{value.toFixed(2)}</td>
                        <td style={{ padding: '14px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: pnl >= 0 ? 'var(--green-light)' : 'var(--red-light)' }}>
                          {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}<br />
                          <span style={{ fontSize: '10px' }}>({pnlPct}%)</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL — TRADE */}
      <div style={{ padding: '32px 24px', background: 'var(--deep)', borderLeft: '1px solid var(--border)' }}>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Trade</div>

        {selectedStock ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--white)', marginBottom: '2px' }}>{selectedStock.symbol}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '12px' }}>{selectedStock.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', color: 'var(--white)' }}>{selectedStock.price.toFixed(2)}</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Order Type</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['Market', 'Limit', 'Stop'].map(type => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    style={{
                      flex: 1, padding: '8px 4px',
                      background: orderType === type ? 'var(--card)' : 'none',
                      border: '1px solid ' + (orderType === type ? 'var(--border-light)' : 'var(--border)'),
                      borderRadius: '4px',
                      color: orderType === type ? 'var(--white)' : 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '10px', cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Shares</div>
              <input
                type="number"
                min="1"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--white)', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}
              />
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: '6px', padding: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>Est. Cost</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--gold)' }}>{(selectedStock.price * shares).toFixed(2)} Beans</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>Available</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text)' }}>{Math.floor(profile?.beans || 0).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <button onClick={buyStock} style={{ padding: '12px', background: 'var(--green)', color: 'var(--white)', border: 'none', borderRadius: '6px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}>
                Buy {selectedStock.symbol}
              </button>
              <button onClick={sellStock} style={{ padding: '12px', background: 'none', color: 'var(--red-light)', border: '1px solid var(--red)', borderRadius: '6px', fontWeight: '500', fontSize: '13px', cursor: 'pointer' }}>
                Sell {selectedStock.symbol}
              </button>
            </div>

            {message && (
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: message.includes('failed') || message.includes('Insufficient') ? 'var(--red-light)' : 'var(--green-light)', lineHeight: '1.5' }}>
                {message}
              </div>
            )}

            <div style={{ marginTop: '24px', height: '1px', background: 'var(--border)' }} />

            <div style={{ marginTop: '20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>Daily Check-In</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>How do you feel about today's markets?</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Confident', 'Neutral', 'Cautious', 'Unsure'].map(mood => (
                  <button key={mood} style={{ padding: '6px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', cursor: 'pointer' }}>
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Select an asset to trade.</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '12px' }}>Choose from the market table on the left.</p>
          </div>
        )}

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Market Weather</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '2px' }}>Moderate Volatility</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>Markets are active. Stay disciplined.</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', color: 'var(--text)' }}>VIX 12.3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}