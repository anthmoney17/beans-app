'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const stageMap = [
  { min: 0, max: 1, name: 'Wanderer', desc: 'Searching for direction.' },
  { min: 2, max: 4, name: 'Apprentice', desc: 'Learning the foundations.' },
  { min: 5, max: 9, name: 'Steward', desc: 'Applying wisdom.' },
  { min: 10, max: 14, name: 'Builder', desc: 'Creating assets and opportunities.' },
  { min: 15, max: 24, name: 'Owner', desc: 'Managing meaningful assets.' },
  { min: 25, max: 49, name: 'Founder', desc: 'Leading others.' },
  { min: 50, max: Infinity, name: 'Legacy Keeper', desc: 'Teaching and investing in future generations.' },
]

const thaleonMessages = {
  Wanderer: "Every great journey begins with a single step. What will yours be today?",
  Apprentice: "You are building the foundation. Stay consistent. The compound effect is already working.",
  Steward: "Wisdom applied is wisdom multiplied. Your discipline is becoming your identity.",
  Builder: "You are no longer just learning. You are creating. Keep building.",
  Owner: "What you steward grows. What you neglect fades. Choose wisely today.",
  Founder: "Your example is teaching others. Lead with patience and purpose.",
  'Legacy Keeper': "The seeds you plant today will shade generations you may never meet.",
}

const greetings = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth'; return }
      setUser(user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      setProfile(profileData)

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .order('order')
      setLessons(lessonsData || [])

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
      setProgress(progressData || [])

      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--black)' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '3px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        Entering the Lodge...
      </div>
    </div>
  )

  const level = profile?.level || 1
  const xp = profile?.xp || 0
  const beans = profile?.beans || 500
  const streak = profile?.streak || 0
  const stage = stageMap.find(s => level >= s.min && level <= s.max) || stageMap[0]
  const xpForNext = level * 200
  const xpProgress = Math.min((xp % xpForNext) / xpForNext * 100, 100)
  const completedIds = new Set(progress.filter(p => p.completed).map(p => p.lesson_id))
  const nextLesson = lessons.find(l => !completedIds.has(l.id))
  const completedCount = completedIds.size
  const username = profile?.username || user?.email?.split('@')[0] || 'Steward'
  const thaleonMessage = thaleonMessages[stage.name]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>

      {/* ATMOSPHERIC BACKGROUND */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(160deg, #0f1a0f 0%, #0a0d09 40%, #080907 100%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 75% 40%, rgba(74,124,89,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.03) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '40px 48px' }}>

        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '3px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Steward's Lodge
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '600', color: 'var(--white)', marginBottom: '4px' }}>
              {greetings()}, {username}.
            </h1>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '14px' }}>
              "Discipline today, freedom tomorrow."
            </p>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Season</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-muted)' }}>Spring, Year 1</div>
            </div>
            <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Streak</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--gold)' }}>{streak} Days</div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 360px', gap: '24px', marginBottom: '24px' }}>

          {/* THALEON COMPANION PANEL */}
          <div style={{ gridColumn: '3', gridRow: '1 / 3', background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 50%, #080f0a 100%)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', position: 'relative', minHeight: '500px' }}>

            <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase' }}>Discipline</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'rgba(201,168,76,0.3)', textTransform: 'uppercase' }}>Freedom</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'rgba(201,168,76,0.2)', textTransform: 'uppercase' }}>Wealth</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'rgba(201,168,76,0.15)', textTransform: 'uppercase' }}>Legacy</div>
            </div>

            {/* THALEON SVG */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '60px', paddingBottom: '20px' }}>
              <svg viewBox="0 0 160 200" width="160" height="200" fill="none">
                {/* Body */}
                <ellipse cx="80" cy="130" rx="36" ry="50" fill="#2d4a35" />
                <ellipse cx="80" cy="85" rx="30" ry="40" fill="#2d4a35" />
                <ellipse cx="80" cy="105" rx="34" ry="42" fill="#2d4a35" />
                {/* Coat detail */}
                <ellipse cx="80" cy="105" rx="34" ry="42" fill="url(#coatGrad)" />
                {/* Head */}
                <ellipse cx="80" cy="68" rx="26" ry="30" fill="#3d5e45" />
                <ellipse cx="80" cy="55" rx="22" ry="26" fill="#3d5e45" />
                <ellipse cx="80" cy="62" rx="25" ry="28" fill="#3d5e45" />
                {/* Head highlight */}
                <ellipse cx="68" cy="52" rx="8" ry="10" fill="rgba(255,255,255,0.06)" />
                {/* Hat */}
                <ellipse cx="80" cy="36" rx="24" ry="7" fill="#1a2a1e" />
                <rect x="60" y="20" width="40" height="18" rx="4" fill="#1f3028" />
                <rect x="60" y="20" width="40" height="5" rx="2" fill="#243520" />
                <rect x="60" y="32" width="40" height="3" fill="rgba(201,168,76,0.3)" />
                {/* Eyes */}
                <circle cx="72" cy="65" r="3" fill="#0f1a0f" />
                <circle cx="88" cy="65" r="3" fill="#0f1a0f" />
                <circle cx="73" cy="64" r="1" fill="rgba(255,255,255,0.4)" />
                <circle cx="89" cy="64" r="1" fill="rgba(255,255,255,0.4)" />
                {/* Mouth — subtle */}
                <path d="M74 74 Q80 78 86 74" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Scarf */}
                <ellipse cx="80" cy="92" rx="28" ry="8" fill="#3a5a42" />
                <path d="M72 92 Q80 98 88 92" fill="#2d4a35" />
                {/* Lantern — right hand */}
                <rect x="108" y="110" width="14" height="20" rx="3" fill="#8a6030" />
                <rect x="110" y="112" width="10" height="16" rx="2" fill="rgba(255,200,80,0.3)" />
                <ellipse cx="115" cy="110" rx="7" ry="3" fill="#6a4820" />
                <ellipse cx="115" cy="130" rx="7" ry="3" fill="#6a4820" />
                <path d="M115 108 L115 102" stroke="#6a4820" strokeWidth="2" strokeLinecap="round" />
                {/* Warm glow from lantern */}
                <ellipse cx="115" cy="120" rx="20" ry="25" fill="rgba(255,180,60,0.06)" />
                {/* Journal — left hand */}
                <rect x="34" y="115" width="20" height="26" rx="2" fill="#5a3a20" />
                <rect x="36" y="117" width="16" height="22" rx="1" fill="#6a4a28" />
                <line x1="38" y1="121" x2="50" y2="121" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="38" y1="125" x2="50" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <line x1="38" y1="129" x2="46" y2="129" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {/* Feet */}
                <ellipse cx="68" cy="178" rx="12" ry="5" fill="#1a2a1e" />
                <ellipse cx="92" cy="178" rx="12" ry="5" fill="#1a2a1e" />
                {/* Ground shadow */}
                <ellipse cx="80" cy="182" rx="30" ry="6" fill="rgba(0,0,0,0.3)" />
                <defs>
                  <radialGradient id="coatGrad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* THALEON INFO */}
            <div style={{ padding: '0 20px 20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '16px', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Thaleon</div>
                <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', marginBottom: '12px' }}>
                  "{thaleonMessage}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '13px', color: 'var(--white)', fontWeight: '600' }}>{stage.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px' }}>Level {level} · {xp} XP</div>
                  </div>
                  <a href="/dashboard/thaleon" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase' }}>
                    Visit Study →
                  </a>
                </div>
                <div style={{ marginTop: '10px', height: '2px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: xpProgress + '%', background: 'var(--gold)', transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>{xp % xpForNext} / {xpForNext} XP</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: 'var(--text-dim)' }}>Level {level + 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DAILY QUEST */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--gold-dim), transparent)' }} />
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Daily Quest</div>

            {nextLesson ? (
              <>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--white)', marginBottom: '8px', lineHeight: '1.3' }}>
                  {nextLesson.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                  Continue your curriculum. Each lesson brings you closer to the next stage of your journey.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--gold-dim)', background: 'var(--gold-subtle)', border: '1px solid var(--gold-dim)', padding: '4px 12px', borderRadius: '4px' }}>
                    +{nextLesson.xp_reward} XP
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-dim)' }}>
                    Lesson {lessons.indexOf(nextLesson) + 1} of {lessons.length}
                  </div>
                </div>
                <a href={"/learn/" + nextLesson.id} style={{ display: 'block', width: '100%', padding: '12px', background: 'var(--green)', color: 'var(--white)', borderRadius: '6px', textDecoration: 'none', fontWeight: '500', fontSize: '14px', textAlign: 'center' }}>
                  Begin Lesson →
                </a>
              </>
            ) : (
              <>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--white)', marginBottom: '8px' }}>All lessons complete.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>You have completed the current curriculum. Practice your skills in the Practice Grounds.</p>
                <a href="/play" style={{ display: 'block', width: '100%', padding: '12px', background: 'var(--green)', color: 'var(--white)', borderRadius: '6px', textDecoration: 'none', fontWeight: '500', fontSize: '14px', textAlign: 'center' }}>
                  Enter Practice Grounds →
                </a>
              </>
            )}
          </div>

          {/* JOURNEY PROGRESS */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '20px' }}>Current Journey</div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', color: 'var(--white)', fontWeight: '600', marginBottom: '4px' }}>{stage.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>Steward Level · {level}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Lessons', value: completedCount + ' / ' + lessons.length },
                { label: 'Beans', value: Math.floor(beans).toLocaleString() },
                { label: 'Streak', value: streak + ' Days' },
                { label: 'Total XP', value: xp.toLocaleString() },
              ].map(stat => (
                <div key={stat.label} style={{ padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', letterSpacing: '1px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>{stat.label}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '16px', color: 'var(--white)' }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-dim)', marginBottom: '6px', letterSpacing: '1px' }}>Journey Progress</div>
            <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
              <div style={{ height: '100%', width: xpProgress + '%', background: 'var(--gold)', transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-dim)' }}>
              Chapter {level}: {stage.name}
            </div>
          </div>

          {/* CONTINUE LEARNING */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Continue Learning</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lessons.slice(0, 4).map((lesson, i) => {
                const done = completedIds.has(lesson.id)
                return (
                  <a key={lesson.id} href={"/learn/" + lesson.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: done ? 'rgba(74,124,89,0.05)' : 'var(--surface)', border: '1px solid ' + (done ? 'rgba(74,124,89,0.2)' : 'var(--border)'), borderRadius: '6px', textDecoration: 'none', transition: 'all 0.15s' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: done ? 'var(--green)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: done ? 'var(--white)' : 'var(--text-muted)' }}>{done ? '✓' : String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--text)', fontSize: '13px', marginBottom: '1px' }}>{lesson.title}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '1px' }}>{done ? 'Completed' : '+' + lesson.xp_reward + ' XP'}</div>
                    </div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '12px' }}>→</span>
                  </a>
                )
              })}
            </div>
            <a href="/learn" style={{ display: 'block', textAlign: 'center', marginTop: '12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '1px', color: 'var(--text-muted)', textDecoration: 'none', textTransform: 'uppercase' }}>
              View Full Curriculum →
            </a>
          </div>

          {/* PRACTICE & EXCHANGE */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Practice Challenge</div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
              Apply what you've learned. Test your strategy without risk.
            </p>
            <a href="/play" style={{ display: 'block', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', textDecoration: 'none', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text)', fontSize: '13px' }}>Practice Grounds</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--green-light)' }}>Open →</span>
            </a>
            <a href="/exchange" style={{ display: 'block', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text)', fontSize: '13px' }}>Exchange Hall</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--gold-dim)' }}>Open →</span>
            </a>
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* REFLECTION */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Reflection Journal</div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
              "What is one thing the market taught you this week?"
            </p>
            <textarea
              placeholder="Write your reflection..."
              rows={4}
              style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', fontSize: '13px', fontFamily: 'Playfair Display, serif', resize: 'none', outline: 'none', lineHeight: '1.6' }}
            />
            <button style={{ marginTop: '10px', padding: '10px 20px', background: 'var(--green)', color: 'var(--white)', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
              Save Entry
            </button>
          </div>

          {/* LONG TERM VISION */}
          <div style={{ background: 'linear-gradient(160deg, #1a2a1e 0%, #0f1a12 60%, #080f0a 100%)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--gold-dim)', textTransform: 'uppercase', marginBottom: '16px' }}>Long-Term Vision</div>

            <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.15 }}>
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                <path d="M0 50 L10 35 L20 40 L30 20 L40 25 L50 10 L60 15 L70 5 L80 8" stroke="#4a7c59" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: 'var(--white)', marginBottom: '8px', lineHeight: '1.3' }}>
              Generational Wealth
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>
              Building financial freedom for yourself and your family — a legacy that outlasts you.
            </p>

            <div style={{ borderLeft: '2px solid var(--gold-dim)', paddingLeft: '12px' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6' }}>
                "The years will pass anyway. The question is what you build with them."
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}