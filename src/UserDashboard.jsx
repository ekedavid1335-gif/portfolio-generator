import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

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

  function logout() {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    navigate('/signin')
  }

  if (!user) return null

  return (
    <div className="login-screen">
      <div className="login-card" style={{ textAlign: 'center' }}>
        <div className="login-logo">{(user.name || 'U')[0].toUpperCase()}</div>
        <h1>Welcome, {user.name || 'User'}</h1>
        <p className="sub">{user.email}</p>
        <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '0.9rem' }}>
          You are signed in. Your team can connect this to the full portfolio later.
        </p>
        <button className="btn-primary" type="button" onClick={logout}>
          Sign out
        </button>
        <p className="auth-footer">
          <Link to="/admin">Admin panel</Link>
        </p>
      </div>
    </div>
  )
}
