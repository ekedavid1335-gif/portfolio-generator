import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LOGIN_API_URL = ''

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
  e.preventDefault()
  setError('')
  setLoading(true)

  const trimmed = email.trim().toLowerCase()
  if (!trimmed || !password) {
    setError('Please enter email and password.')
    setLoading(false)
    return
  }

  try {
    const users = JSON.parse(localStorage.getItem('pg_users') || '{}')
    const name = users[trimmed]?.name || trimmed.split('@')[0]

    users[trimmed] = {
      ...(users[trimmed] || {}),
      name,
      email: trimmed,
      password,
      portfolios: users[trimmed]?.portfolios || [],
    }
    localStorage.setItem('pg_users', JSON.stringify(users))
    localStorage.setItem(
      'auth_user',
      JSON.stringify({ name, email: trimmed })
    )
    if (localStorage.getItem('ai_credits') === null) {
      localStorage.setItem('ai_credits', '3')
    }

    navigate('/dashboard')
  } catch {
    setError('Something went wrong. Try again.')
  }
  setLoading(false)
}

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">P</div>
        <h1>Sign in</h1>
        <p className="sub">Welcome back to Portfolio Generator</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="pass-wrap">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
