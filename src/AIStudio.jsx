import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const TEMPLATES = [
  {
    id: 'bio',
    title: 'Professional bio',
    desc: 'Write a strong About section from your role and skills.',
  },
  {
    id: 'project',
    title: 'Project write-up',
    desc: 'Turn rough notes into a clear project description.',
  },
  {
    id: 'full',
    title: 'Full portfolio draft',
    desc: 'Generate name, title, bio, skills and a sample project.',
  },
]

function generateText(type, input) {
  const role = input || 'software developer'
  if (type === 'bio') {
    return `I'm a ${role} focused on building clean, reliable products people enjoy using. I care about clear design, solid code, and shipping work that solves real problems. Always learning, always improving.`
  }
  if (type === 'project') {
    return `Built a practical ${role} project end-to-end: planned the UX, implemented the core features, and polished the UI for mobile and desktop. Focused on performance, accessibility, and a simple user flow.`
  }
  return {
    name: 'Your Name',
    title: role.replace(/\b\w/g, (c) => c.toUpperCase()),
    bio: `I'm a ${role} who turns ideas into polished digital experiences. I blend design sense with technical skill to ship work that feels fast, clear, and useful.`,
    skills: 'React, JavaScript, CSS, Git, UI Design',
    project: `Portfolio Generator — a web app that helps professionals create standout portfolios in minutes, with themes, live preview, and AI-assisted writing.`,
  }
}

export default function AIStudio() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [active, setActive] = useState('bio')
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(3)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      if (!raw) {
        navigate('/signin')
        return
      }
      setUser(JSON.parse(raw))
      const c = localStorage.getItem('ai_credits')
      if (c !== null) setCredits(Number(c))
    } catch {
      navigate('/signin')
    }
  }, [navigate])

  function runAI() {
    if (credits <= 0) {
      setOutput('No AI credits left. Upgrade to Premium for unlimited AI.')
      return
    }
    setLoading(true)
    setOutput('')
    setTimeout(() => {
      const result = generateText(active, prompt.trim())
      if (typeof result === 'string') {
        setOutput(result)
      } else {
        setOutput(
          `Name: ${result.name}\nTitle: ${result.title}\n\nBio:\n${result.bio}\n\nSkills: ${result.skills}\n\nProject:\n${result.project}`
        )
        // Optionally prefill builder storage
        sessionStorage.setItem('ai_draft', JSON.stringify(result))
      }
      const next = credits - 1
      setCredits(next)
      localStorage.setItem('ai_credits', String(next))
      setLoading(false)
    }, 900)
  }

  function sendToBuilder() {
    navigate('/builder')
  }

  if (!user) return null

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>AI Studio</span>
        </div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/builder" className="nav-link">Builder</Link>
          <Link to="/ai" className="nav-link active">AI Studio</Link>
          <Link to="/premium" className="nav-link premium-link">Premium</Link>
        </nav>
        <span className="credit-badge">{credits} AI credits</span>
      </header>

      <main className="app-main ai-layout">
        <div className="ai-templates">
          <h2>What do you want to generate?</h2>
          <div className="template-list">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`template-card${active === t.id ? ' on' : ''}`}
                onClick={() => setActive(t.id)}
              >
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="ai-workspace">
          <div className="form-group">
            <label>Your input (role, skills, or project notes)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="e.g. frontend developer, React & UI design"
            />
          </div>
          <button type="button" className="btn-primary-inline" onClick={runAI} disabled={loading}>
            {loading ? 'Generating…' : 'Generate with AI'}
          </button>

          {output && (
            <div className="ai-output">
              <div className="section-head">
                <h3>Result</h3>
                <button type="button" className="btn-sm-blue" onClick={sendToBuilder}>
                  Open in Builder
                </button>
              </div>
              <pre className="ai-text">{output}</pre>
            </div>
          )}

          {credits <= 0 && (
            <div className="upgrade-hint">
              <p>Out of free AI credits.</p>
              <Link to="/premium" className="btn-primary-inline">Upgrade to Premium</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
