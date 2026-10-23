import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const THEMES = [
  { id: 'dark', label: 'Dark', bg: '#0f172a' },
  { id: 'light', label: 'Light', bg: '#f8fafc' },
  { id: 'blue', label: 'Ocean', bg: '#1e3a5f' },
]

export default function PortfolioBuilder() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [project, setProject] = useState('')
  const [theme, setTheme] = useState('dark')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      if (!raw) {
        navigate('/signin')
        return
      }
      const u = JSON.parse(raw)
      setUser(u)
      setName(u.name || '')
    } catch {
      navigate('/signin')
    }
  }, [navigate])

  function savePortfolio() {
    if (!user) return
    const email = user.email
    const all = JSON.parse(localStorage.getItem('pg_users') || '{}')
    if (!all[email]) {
      all[email] = { name: user.name, email, password: '', portfolios: [] }
    }
    const entry = {
      portfolioName: name || 'My Portfolio',
      name,
      title,
      bio,
      skills,
      project,
      theme,
      savedAt: new Date().toLocaleString(),
    }
    all[email].portfolios = all[email].portfolios || []
    all[email].portfolios.push(entry)
    all[email].profile = { name, title, bio }
    localStorage.setItem('pg_users', JSON.stringify(all))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!user) return null

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>Builder</span>
        </div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/builder" className="nav-link active">Builder</Link>
          <Link to="/ai" className="nav-link">AI Studio</Link>
          <Link to="/premium" className="nav-link premium-link">Premium</Link>
        </nav>
        <button type="button" className="btn-primary-inline" onClick={savePortfolio}>
          {saved ? 'Saved ✓' : 'Save portfolio'}
        </button>
      </header>

      <main className="builder-layout">
        <aside className="builder-form">
          <h2>Edit content</h2>
          <div className="form-group">
            <label>Display name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="form-group">
            <label>Headline / title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Developer" />
          </div>
          <div className="form-group">
            <label>About</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Short bio..." />
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, CSS, Node" />
          </div>
          <div className="form-group">
            <label>Featured project</label>
            <textarea value={project} onChange={(e) => setProject(e.target.value)} rows={3} placeholder="Project name + short description" />
          </div>
          <div className="form-group">
            <label>Theme</label>
            <div className="theme-picks">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-chip${theme === t.id ? ' on' : ''}`}
                  style={{ borderColor: theme === t.id ? 'var(--primary)' : undefined }}
                  onClick={() => setTheme(t.id)}
                >
                  <span className="theme-dot" style={{ background: t.bg }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className={`builder-preview theme-${theme}`}>
          <div className="preview-label">Live preview</div>
          <div className="preview-card">
            <div className="pv-avatar">{(name || 'U')[0].toUpperCase()}</div>
            <h1>{name || 'Your Name'}</h1>
            <p className="pv-title">{title || 'Your headline'}</p>
            <p className="pv-bio">{bio || 'Your bio will appear here.'}</p>
            {skills && (
              <div className="pv-skills">
                {skills.split(',').map((s, i) => (
                  <span key={i} className="pv-tag">{s.trim()}</span>
                ))}
              </div>
            )}
            {project && (
              <div className="pv-project">
                <h3>Featured work</h3>
                <p>{project}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
