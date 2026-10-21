import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LOGIN_API_URL = '' // e.g. 'https://your-backend.com/api/auth/login'

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
      if (LOGIN_API_URL) {
        const res = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, password }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(data.message || data.error || 'Login failed.')
          setLoading(false)
          return
        }
        if (data.token) localStorage.setItem('auth_token', data.token)
        if (data.user) localStorage.setItem('auth_user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        const users = JSON.parse(localStorage.getItem('pg_users') || '{}')
        const user = users[trimmed]
        if (user && (user.password === password || user.Password === password)) {
          localStorage.setItem(
            'auth_user',
            JSON.stringify({ name: user.name, email: user.email })
          )
          navigate('/dashboard')
        } else if (
          trimmed === 'princethaddeus589@gmail.com' &&
          password === 'Linda2004@'
        ) {
          navigate('/admin')
        } else {
          setError('Invalid email or password.')
        }
      }
    } catch {
      setError('Network error. Please try again.')
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
              autoComplete="username"
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
                autoComplete="current-password"
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

        <p className="auth-footer">
          <Link to="/admin">Admin login</Link>
        </p>
      </div>
    </div>
  )
}
