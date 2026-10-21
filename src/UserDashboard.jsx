import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <button className="btn-primary" type="button" onClick={logout}>
          Sign out
        </button>
      </div>
    </div>
  )
}
