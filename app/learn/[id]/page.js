'use client'

import { useState, useEffect, use } from 'react'
import { supabase } from '../../../lib/supabase'

export default function Lesson({ params }) {
  const { id } = use(params)
  const [lesson, setLesson] = useState(null)
  const [questions, setQuestions] = useState([])
  const [user, setUser] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [phase, setPhase] = useState('read')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [claiming, setClaiming] = useState(false)
  const [message, setMessage] = useState('')
  const [nextLesson, setNextLesson] = useState(null)

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

      if (lessonData) {
        const { data: allLessons } = await supabase
          .from('lessons')
          .select('id, order')
          .order('order')
        if (allLessons) {
          const currentIndex = allLessons.findIndex(l => l.id === id)
          if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
            setNextLesson(allLessons[currentIndex + 1].id)
          }
        }
      }

      const { data: questionsData } = await supabase
        .from('lesson_questions')
        .select('*')
        .eq('lesson_id', id)
      setQuestions(questionsData || [])

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', id)
          .single()
        if (progressData && progressData.completed) setCompleted(true)
      }

      setLoading(false)
    }
    getData()
  }, [])

  const submitQuiz = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct_answer) correct++
    })
    setScore(correct)
    setSubmitted(true)
  }

  const completeLesson = async () => {
    if (!user) { window.location.href = '/auth'; return }
    setClaiming(true)

    await supabase.from('user_progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      completed: true,
      completed_at: new Date().toISOString()
    })

    await supabase.rpc('increment_xp', {
      user_id_input: user.id,
      xp_amount: lesson.xp_reward,
      beans_amount: lesson.xp_reward
    })

    await supabase.rpc('update_streak', { user_id_input: user.id })

    setCompleted(true)
    setMessage('Lesson complete! +' + lesson.xp_reward + ' XP and +' + lesson.xp_reward + ' Beans earned!')
    setClaiming(false)
  }

  const passed = score >= 2

  if (loading) return <p style={{ padding: '40px', color: '#6b8a72' }}>Loading lesson...</p>
  if (!lesson) return <p style={{ padding: '40px', color: '#6b8a72' }}>Lesson not found.</p>

  return (
    <div style={{ maxWidth: '720px', margin: '60px auto', padding: '40px' }}>

      <a href="/learn" style={{ color: '#6b8a72', textDecoration: 'none', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '40px' }}>
        ← Back to Lessons
      </a>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['read', 'quiz'].map((p, i) => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: phase === p ? '#1a7a43' : '#1e2e22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '12px', fontWeight: 'bold'
            }}>
              {i + 1}
            </div>
            <span style={{ color: phase === p ? '#f0f7f2' : '#6b8a72', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {p === 'read' ? 'Read' : 'Quiz'}
            </span>
            {i === 0 && <span style={{ color: '#1e2e22', margin: '0 4px' }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ background: '#1e2e22', color: '#2ecc71', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', display: 'inline-block', marginBottom: '16px' }}>
        +{lesson.xp_reward} XP
      </div>

      <h1 style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '32px', color: '#f0f7f2', margin: '0 0 32px', lineHeight: '1.2' }}>
        {lesson.title}
      </h1>

      {phase === 'read' && (
        <>
          <div style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '32px', marginBottom: '32px' }}>
            <p style={{ color: '#e8f0ea', fontSize: '16px', lineHeight: '1.9', margin: 0 }}>
              {lesson.content}
            </p>
          </div>

          {completed ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#2ecc71', fontSize: '48px', marginBottom: '8px' }}>✓</div>
              <p style={{ color: '#6b8a72', marginBottom: '24px' }}>You already completed this lesson.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => { setPhase('quiz'); setSubmitted(false); setAnswers({}) }}
                  style={{ padding: '14px 32px', background: '#111a14', color: '#2ecc71', border: '1px solid #1a7a43', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px', cursor: 'pointer' }}
                >
                  Retake Quiz
                </button>
                <a href={nextLesson ? "/learn/" + nextLesson : "/learn"} style={{ padding: '14px 40px', background: '#1a7a43', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                  {nextLesson ? 'Next Lesson →' : 'Back to Lessons →'}
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setPhase('quiz')}
              style={{ width: '100%', padding: '16px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
            >
              Take the Quiz →
            </button>
          )}
        </>
      )}

      {phase === 'quiz' && (
        <>
          {!submitted ? (
            <>
              <p style={{ color: '#6b8a72', fontSize: '14px', marginBottom: '32px' }}>Answer at least 2 out of 3 correctly to earn your XP.</p>

              {questions.map((q, index) => (
                <div key={q.id} style={{ background: '#111a14', border: '1px solid #1e2e22', borderRadius: '8px', padding: '24px', marginBottom: '16px' }}>
                  <p style={{ color: '#f0f7f2', fontWeight: 'bold', fontSize: '15px', marginBottom: '16px' }}>
                    {index + 1}. {q.question}
                  </p>
                  {['A', 'B', 'C', 'D'].map(letter => (
                    <div
                      key={letter}
                      onClick={() => setAnswers({ ...answers, [q.id]: letter })}
                      style={{
                        padding: '12px 16px',
                        marginBottom: '8px',
                        borderRadius: '6px',
                        border: '1px solid ' + (answers[q.id] === letter ? '#1a7a43' : '#1e2e22'),
                        background: answers[q.id] === letter ? 'rgba(26,122,67,0.2)' : '#0d1410',
                        color: answers[q.id] === letter ? '#2ecc71' : '#6b8a72',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <span style={{ fontWeight: 'bold', minWidth: '20px' }}>{letter}.</span>
                      <span>{q['option_' + letter.toLowerCase()]}</span>
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={submitQuiz}
                disabled={Object.keys(answers).length < questions.length}
                style={{
                  width: '100%', padding: '16px',
                  background: Object.keys(answers).length < questions.length ? '#1e2e22' : '#1a7a43',
                  color: Object.keys(answers).length < questions.length ? '#6b8a72' : 'white',
                  border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold',
                  cursor: Object.keys(answers).length < questions.length ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px'
                }}
              >
                Submit Quiz
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>{passed ? '🎉' : '😅'}</div>
              <h2 style={{ color: passed ? '#2ecc71' : '#e74c3c', fontFamily: 'Arial', fontSize: '32px', letterSpacing: '3px', marginBottom: '8px' }}>
                {score}/{questions.length} {passed ? 'PASSED!' : 'TRY AGAIN'}
              </h2>
              <p style={{ color: '#6b8a72', marginBottom: '32px' }}>
                {passed ? 'Great work. You earned your XP.' : 'You need at least 2 correct. Go back and review the lesson.'}
              </p>

              {questions.map((q, index) => (
                <div key={q.id} style={{ background: '#111a14', border: '1px solid ' + (answers[q.id] === q.correct_answer ? '#1a7a43' : '#e74c3c'), borderRadius: '8px', padding: '16px 20px', marginBottom: '12px', textAlign: 'left' }}>
                  <p style={{ color: '#f0f7f2', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{index + 1}. {q.question}</p>
                  <p style={{ color: answers[q.id] === q.correct_answer ? '#2ecc71' : '#e74c3c', fontSize: '13px', marginBottom: '4px' }}>
                    Your answer: {answers[q.id]}. {q['option_' + answers[q.id]?.toLowerCase()]}
                  </p>
                  {answers[q.id] !== q.correct_answer && (
                    <p style={{ color: '#2ecc71', fontSize: '13px' }}>
                      Correct: {q.correct_answer}. {q['option_' + q.correct_answer.toLowerCase()]}
                    </p>
                  )}
                </div>
              ))}

              {message && (
                <div style={{ background: 'rgba(46,204,113,0.1)', border: '1px solid #1a7a43', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#2ecc71', fontWeight: 'bold' }}>
                  {message}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {!passed && (
                  <button
                    onClick={() => { setPhase('read'); setSubmitted(false); setAnswers({}) }}
                    style={{ padding: '14px 32px', background: '#111a14', color: '#6b8a72', border: '1px solid #1e2e22', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                  >
                    ← Review Lesson
                  </button>
                )}

                {passed && !completed && (
                  <button
                    onClick={completeLesson}
                    disabled={claiming}
                    style={{ padding: '14px 40px', background: '#1a7a43', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', letterSpacing: '1px' }}
                  >
                    {claiming ? 'Claiming...' : 'Claim XP & Beans →'}
                  </button>
                )}

{(passed || completed) && (
                  <a href={!completed && nextLesson ? "/learn/" + nextLesson : "/learn"} style={{ padding: '14px 40px', background: '#1a7a43', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                    {!completed && nextLesson ? 'Next Lesson →' : 'Back to Lessons'}
                  </a>
                )}
              </div>
            </div>
          )}
        </>
      )}

    </div>
  )
}