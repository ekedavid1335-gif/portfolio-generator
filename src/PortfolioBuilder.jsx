import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function PortfolioBuilder() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [headline, setHeadline] = useState('')
  const [bio, setBio] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      if (!raw && !localStorage.getItem('userName')) {
        navigate('/signin')
        return
      }
      const u = raw ? JSON.parse(raw) : { name: localStorage.getItem('userName'), email: '' }
      setUser(u)
      setName(u.name || localStorage.getItem('userName') || '')
    } catch {
      navigate('/signin')
    }
  }, [navigate])

  function savePortfolio() {
    const list = JSON.parse(localStorage.getItem('portfolios') || '[]')
    const item = {
      id: Date.now(),
      title: title || name || 'Untitled portfolio',
      name: name,
      description: description || bio || '',
      headline,
      bio,
      status: 'draft',
      isPublished: false,
      savedAt: new Date().toLocaleString(),
    }
    list.push(item)
    localStorage.setItem('portfolios', JSON.stringify(list))

    // also keep your admin format
    if (user?.email) {
      const all = JSON.parse(localStorage.getItem('pg_users') || '{}')
      if (!all[user.email]) {
        all[user.email] = { name: user.name, email: user.email, portfolios: [] }
      }
      all[user.email].portfolios = all[user.email].portfolios || []
      all[user.email].portfolios.push({
        portfolioName: item.title,
        name: item.name,
        title: item.headline,
        bio: item.bio,
        savedAt: item.savedAt,
      })
      localStorage.setItem('pg_users', JSON.stringify(all))
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user && !localStorage.getItem('userName')) return null

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand"><span className="brand-mark">P</span><span>Create portfolio</span></div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/create-portfolio" className="nav-link active">Create</Link>
          <Link to="/ai" className="nav-link">AI Studio</Link>
          <Link to="/premium" className="nav-link premium-link">Premium</Link>
        </nav>
        <button type="button" className="btn-primary-inline" onClick={savePortfolio}>
          {saved ? 'Saved ✓' : 'Save portfolio'}
        </button>
      </header>
      <main className="app-main" style={{ maxWidth: 560 }}>
        <h1 style={{ marginBottom: 20 }}>New portfolio</h1>
        <div className="form-group">
          <label>Portfolio title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My Developer Portfolio" />
        </div>
        <div className="form-group">
          <label>Your name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="form-group">
          <label>Headline</label>
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Frontend Developer" />
        </div>
        <div className="form-group">
          <label>Short description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What this portfolio is about" />
        </div>
        <div className="form-group">
          <label>About / bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="About you" />
        </div>
        <button type="button" className="btn-primary-inline" onClick={savePortfolio}>
          {saved ? 'Saved ✓' : 'Save portfolio'}
        </button>
        <p style={{ marginTop: 12 }}>
          <Link to="/dashboard">← Back to dashboard</Link>
        </p>
      </main>
    </div>
  )
}
