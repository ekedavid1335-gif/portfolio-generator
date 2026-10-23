import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Premium() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('auth_user') && !localStorage.getItem('userName')) {
      navigate('/signin')
    }
  }, [navigate])

  function upgrade() {
    localStorage.setItem('ai_credits', '999')
    localStorage.setItem('user_plan', 'pro')
    setMessage('Pro selected (demo). AI credits unlocked.')
  }

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand"><span className="brand-mark">P</span><span>Premium</span></div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/create-portfolio" className="nav-link">Create</Link>
          <Link to="/ai" className="nav-link">AI Studio</Link>
          <Link to="/premium" className="nav-link active premium-link">Premium</Link>
        </nav>
      </header>
      <main className="app-main" style={{ maxWidth: 480, textAlign: 'center' }}>
        <h1>Go Premium</h1>
        <p style={{ color: 'var(--muted)', margin: '12px 0 24px' }}>Unlimited AI, more portfolios, custom domain.</p>
        {message && <div className="plan-message">{message}</div>}
        <div className="plan-card popular" style={{ textAlign: 'left' }}>
          <h2>Pro — $9/month</h2>
          <ul className="plan-features">
            <li>✓ Unlimited portfolios</li>
            <li>✓ Unlimited AI</li>
            <li>✓ Custom domain</li>
            <li>✓ Analytics</li>
          </ul>
          <button type="button" className="btn-primary-inline full" onClick={upgrade}>Upgrade to Pro</button>
        </div>
        <p style={{ marginTop: 16 }}><Link to="/dashboard">← Back</Link></p>
      </main>
    </div>
  )
}
