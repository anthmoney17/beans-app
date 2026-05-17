'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Learn() {
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('order')

      setLessons(lessonsData || [])

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)

        setProgress(progressData || [])
      }

      setLoading(false)
    }
    getData()
  }, [])

  const isCompleted = (lessonId) => {
    return progress.some(p => p.lesson_id === lessonId && p.completed)
  }

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading lessons...</p>

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '40px' }}>
      <p style={{ fontFamily: 'Arial', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#2ecc71', marginBottom: '8px' }}>Phase 2</p>
      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '48px', letterSpacing: '4px', color: '#f0f7f2', margin: '0 0 8px' }}>LEARN</h1>
      <p style={{ color: '#6b8a72', fontSize: '16px', marginBottom: '48px' }}>Complete lessons to earn XP and level up your trading knowledge.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {lessons.map((lesson, index) => {
          const completed = isCompleted(lesson.id)
          return (
            <a key={lesson.id} href={"/learn/" + lesson.id} style={{ textDecoration: 'none' }}>
              <div style={{
                background: completed ? 'rgba(26,122,67,0.1)' : '#111a14',
                border: '1px solid ' + (completed ? '#1a7a43' : '#1e2e22'),
                borderRadius: '8px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: completed ? '#1a7a43' : '#1e2e22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: completed ? 'white' : '#6b8a72',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    {completed ? '✓' : index + 1}
                  </div>
                  <div>
                    <div style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>{lesson.title}</div>
                    <div style={{ color: '#6b8a72', fontSize: '13px' }}>{completed ? 'Completed' : 'Not started'}</div>
                  </div>
                </div>
                <div style={{
                  background: '#1e2e22',
                  color: '#2ecc71',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '1px'
                }}>
                  +{lesson.xp_reward} XP
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {!user && (
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: '#6b8a72', marginBottom: '16px' }}>Sign in to track your progress and earn XP.</p>
          <a href="/auth" style={{ background: '#1a7a43', color: 'white', padding: '12px 32px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Sign In</a>
        </div>
      )}
    </div>
  )
}