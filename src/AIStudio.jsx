import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AIStudio() {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(3)

  useEffect(() => {
    if (!localStorage.getItem('auth_user') && !localStorage.getItem('userName')) {
      navigate('/signin')
      return
    }
    const c = localStorage.getItem('ai_credits')
    if (c !== null) setCredits(Number(c))
  }, [navigate])

  function runAI() {
    if (credits <= 0) {
      setOutput('No AI credits left. Go to Premium.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const role = prompt.trim() || 'software developer'
      setOutput(`I'm a ${role} focused on building clean, reliable products. I care about clear design, solid code, and shipping work that solves real problems.`)
      const next = credits - 1
      setCredits(next)
      localStorage.setItem('ai_credits', String(next))
      setLoading(false)
    }, 700)
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand"><span className="brand-mark">P</span><span>AI Studio</span></div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/create-portfolio" className="nav-link">Create</Link>
          <Link to="/ai" className="nav-link active">AI Studio</Link>
          <Link to="/premium" className="nav-link premium-link">Premium</Link>
        </nav>
        <span className="credit-badge">{credits} credits</span>
      </header>
      <main className="app-main" style={{ maxWidth: 560 }}>
        <h1 style={{ marginBottom: 12 }}>AI Studio</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Generate a bio from your role or skills.</p>
        <div className="form-group">
          <label>Your role / skills</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} placeholder="e.g. frontend developer, React" />
        </div>
        <button type="button" className="btn-primary-inline" onClick={runAI} disabled={loading}>
          {loading ? 'Generating…' : 'Generate'}
        </button>
        {output && (
          <div className="ai-output" style={{ marginTop: 20 }}>
            <pre className="ai-text">{output}</pre>
            <Link to="/create-portfolio" className="btn-sm-blue">Use in portfolio</Link>
          </div>
        )}
      </main>
    </div>
  )
}
