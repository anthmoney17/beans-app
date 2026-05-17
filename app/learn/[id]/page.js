'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

import { use } from 'react'

export default function Lesson({ params }) {
  const { id } = use(params)
  const [lesson, setLesson] = useState(null)
  const [user, setUser] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single()

      setLesson(lessonData)

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', id)
          .single()

        if (progressData && progressData.completed) {
          setCompleted(true)
        }
      }

      setLoading(false)
    }
    getData()
  }, [])

  const completeLesson = async () => {
    if (!user) {
      window.location.href = '/auth'
      return
    }

    setClaiming(true)

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lesson.id,
        completed: true,
        completed_at: new Date().toISOString()
      })

      if (!error) {
        await supabase.rpc('increment_xp', { user_id_input: user.id, xp_amount: lesson.xp_reward, beans_amount: lesson.xp_reward })
await supabase.rpc('update_streak', { user_id_input: user.id })
        setCompleted(true)
        setMessage('Lesson complete! +' + lesson.xp_reward + ' XP earned!')
      }

    setClaiming(false)
  }

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading lesson...</p>
  if (!lesson) return <p style={{ padding: '40px', color: '#6b8a72' }}>Lesson not found.</p>

  return (
    <div style={{ maxWidth: '720px', margin: '60px auto', padding: '40px' }}>

      <a href="/learn" style={{ color: '#6b8a72', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '40px' }}>
        ← Back to Lessons
      </a>

      <div style={{ background: '#1e2e22', color: '#2ecc71', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '16px' }}>
        +{lesson.xp_reward} XP
      </div>

      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '36px', color: '#f0f7f2', margin: '0 0 40px', lineHeight: '1.2' }}>
        {lesson.title}
      </h1>

      <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '32px', marginBottom: '40px' }}>
        <p style={{ color: '#e8f0ea', fontSize: '16px', lineHeight: '1.9', margin: 0 }}>
          {lesson.content}
        </p>
      </div>

      {message && (
        <div style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid #1a7a43', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#2ecc71', fontWeight: 'bold', textAlign: 'center' }}>
          {message}
        </div>
      )}

      {completed ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#2ecc71', fontSize: '48px', marginBottom: '8px' }}>✓</div>
          <p style={{ color: '#6b8a72', marginBottom: '24px' }}>You completed this lesson.</p>
          <a href="/learn" style={{ background: '#1a7a43', color: 'white', padding: '14px 40px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
            Next Lesson →
          </a>
        </div>
      ) : (
        <button
          onClick={completeLesson}
          disabled={claiming}
          style={{ width: '100%', padding: '16px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
        >
          {claiming ? 'Saving...' : 'Complete Lesson & Claim XP'}
        </button>
      )}

    </div>
  )
}