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

  const completedCount = lessons.filter(l => isCompleted(l.id)).length
  const progressPct = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0

  if (loading) return (
    <div style={{ padding: '60px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
      Loading curriculum...
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: '100vh' }}>

      {/* MAIN */}
      <div style={{ padding: '48px', borderRight: '1px solid var(--border)' }}>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Curriculum</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: '600', color: 'var(--white)', marginBottom: '4px' }}>Learn</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>Real knowledge. Real markets. Real freedom.</p>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px 24px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Your Progress</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', color: 'var(--white)' }}>{completedCount} of {lessons.length} Lessons Completed</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', color: 'var(--gold)' }}>{Math.round(progressPct)}%</div>
          </div>
        </div>

        <div style={{ height: '2px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden', marginBottom: '48px' }}>
          <div style={{ height: '100%', width: progressPct + '%', background: 'var(--green)', transition: 'width 0.5s ease' }} />
        </div>

        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '3px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '20px' }}>Foundations</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {lessons.map((lesson, index) => {
            const completed = isCompleted(lesson.id)
            return (
              <a
              key={lesson.id}
                href={"/learn/" + lesson.id}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px 24px',
                  background: completed ? 'rgba(74,124,89,0.05)' : 'var(--card)',
                  border: '1px solid ' + (completed ? 'rgba(74,124,89,0.2)' : 'var(--border)'),
                  borderRadius: '6px',
                  marginBottom: '2px',
                  transition: 'all 0.15s',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: completed ? 'var(--green)' : 'var(--surface)',
                    border: '1px solid ' + (completed ? 'var(--green)' : 'var(--border-light)'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    color: completed ? 'var(--white)' : 'var(--text-muted)'
                  }}>
                    {completed ? '✓' : String(index + 1).padStart(2, '0')}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'var(--white)', fontSize: '14px', fontWeight: '500', marginBottom: '2px' }}>{lesson.title}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                      {completed ? 'Completed' : 'Not started'}
                    </div>
                  </div>

                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                    color: 'var(--gold-dim)', letterSpacing: '1px',
                    background: 'var(--gold-subtle)', border: '1px solid var(--gold-dim)',
                    padding: '4px 10px', borderRadius: '4px'
                  }}>
                    +{lesson.xp_reward} XP
                  </div>

                  <div style={{ color: 'var(--text-dim)', fontSize: '16px' }}>→</div>
                </div>
              </a>
            )
          })}
        </div>

        {!user && (
          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>Sign in to track your progress and earn XP.</p>
            <a href="/auth" style={{ background: 'var(--green)', color: 'var(--white)', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>Sign In</a>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div style={{ padding: '48px 32px', background: 'var(--deep)' }}>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '12px' }}>Lesson 01</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: '600', color: 'var(--white)', marginBottom: '12px', lineHeight: '1.3' }}>
            Understanding the Stock Market
          </h2>
          <div style={{ borderLeft: '2px solid var(--gold-dim)', paddingLeft: '12px', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
              "The more you understand, the more freedom you create."
            </p>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>In This Lesson</div>
          {['What is the stock market?', 'Why companies issue stock', 'How buyers and sellers create prices', 'The role of exchanges', 'Why markets move over time'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--green)', fontSize: '12px' }}>◈</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '120px', background: 'linear-gradient(160deg, #1a2a1e, #0a0f0c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '40px', opacity: 0.6 }}>📖</span>
          </div>
        </div>

        <a href={lessons.length > 0 ? "/learn/" + lessons[0]?.id : "/learn"} style={{
          display: 'block', width: '100%', padding: '12px', background: 'var(--green)',
          color: 'var(--white)', borderRadius: '6px', textDecoration: 'none',
          fontWeight: '500', fontSize: '14px', textAlign: 'center'
        }}>
          Continue Lesson →
        </a>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <span style={{ color: 'var(--green)', fontSize: '12px' }}>◈</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)' }}>Complete the lesson to earn: +50 XP</span>
        </div>
      </div>

    </div>
  )
}