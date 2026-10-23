import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 portfolio', '3 AI credits / month', 'Basic themes', 'Export HTML'],
    cta: 'Current plan',
    current: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9',
    period: '/ month',
    features: [
      'Unlimited portfolios',
      'Unlimited AI writing',
      'Custom domain',
      'Remove branding',
      'Analytics',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$29',
    period: '/ month',
    features: [
      'Everything in Pro',
      '5 team seats',
      'Shared templates',
      'Admin controls',
      'API access',
    ],
    cta: 'Contact sales',
  },
]

export default function Premium() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      if (!raw) {
        navigate('/signin')
        return
      }
      setUser(JSON.parse(raw))
    } catch {
      navigate('/signin')
    }
  }, [navigate])

  function choosePlan(plan) {
    if (plan.id === 'free') {
      setMessage('You are already on the Free plan.')
      return
    }
    // Demo: simulate upgrade
    localStorage.setItem('ai_credits', '999')
    localStorage.setItem('user_plan', plan.id)
    setMessage(`${plan.name} selected (demo). AI credits refreshed. Connect payments later.`)
  }

  if (!user) return null

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span>Premium</span>
        </div>
        <nav className="top-nav">
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/builder" className="nav-link">Builder</Link>
          <Link to="/ai" className="nav-link">AI Studio</Link>
          <Link to="/premium" className="nav-link active premium-link">Premium</Link>
        </nav>
      </header>

      <main className="app-main">
        <section className="hero-block center">
          <h1>Unlock the full generator</h1>
          <p>More portfolios, unlimited AI, custom domains, and insights.</p>
        </section>

        {message && <div className="plan-message">{message}</div>}

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card${plan.popular ? ' popular' : ''}${plan.current ? ' current' : ''}`}
            >
              {plan.popular && <div className="plan-badge">Most popular</div>}
              <h2>{plan.name}</h2>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.popular ? 'btn-primary-inline full' : 'btn-outline-inline full'}
                onClick={() => choosePlan(plan)}
                disabled={plan.current}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
