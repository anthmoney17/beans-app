'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
    }
    setLoading(false)
  }

  const handleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      window.location.href = '/profile'
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1a7a43', marginBottom: '8px' }}>BEANS</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>Reap What You Sow</p>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
      />
      
      <button
        onClick={handleSignUp}
        disabled={loading}
        style={{ width: '100%', padding: '14px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px' }}
      >
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
      
      <button
        onClick={handleSignIn}
        disabled={loading}
        style={{ width: '100%', padding: '14px', background: 'white', color: '#1a7a43', border: '1px solid #1a7a43', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Sign In'}
      </button>

      {message && (
        <p style={{ marginTop: '20px', color: '#666', textAlign: 'center', fontSize: '14px' }}>{message}</p>
      )}
    </div>
  )
}