import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [title, setTitle] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem('auth_user')
    const userName = localStorage.getItem('userName')
    if (!auth && !userName) {
      navigate('/signin')
      return
    }
    try {
      const u = auth ? JSON.parse(auth) : { name: userName, email: '' }
      setName(u.name || userName || '')
      setEmail(u.email || '')
      setBio(localStorage.getItem('profile_bio') || '')
      setTitle(localStorage.getItem('profile_title') || '')
    } catch {
      setName(userName || '')
    }
  }, [navigate])

  function saveProfile(e) {
    e.preventDefault()
    localStorage.setItem('userName', name)
    localStorage.setItem('profile_bio', bio)
    localStorage.setItem('profile_title', title)
    try {
      const auth = localStorage.getItem('auth_user')
      if (auth) {
        const u = JSON.parse(auth)
        u.name = name
        localStorage.setItem('auth_user', JSON.stringify(u))
      }
    } catch {}
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function logout() {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('userName')
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#171717] dark:bg-black dark:text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 dark:border-[#222] sm:px-8">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm text-white dark:bg-white dark:text-black">P</span>
          Profile
        </Link>
        <nav className="flex flex-wrap gap-2">
          <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#222]">Dashboard</Link>
          <button type="button" onClick={logout} className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#222]">Sign out</button>
        </nav>
      </header>

      <main className="mx-auto max-w-lg px-4 py-10">
        <h1 className="text-2xl font-bold">Your profile</h1>
        <p className="mt-1 text-sm text-gray-500">This info can appear on your portfolios.</p>

        <form onSubmit={saveProfile} className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-[#292929] dark:bg-[#101010]">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">Display name</label>
            <input className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black dark:border-[#333]" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">Email</label>
            <input className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm opacity-70 dark:border-[#333]" value={email} readOnly />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">Title / role</label>
            <input className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black dark:border-[#333]" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Developer" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-500">Bio</label>
            <textarea className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-black dark:border-[#333]" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <button type="submit" className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">
            {saved ? 'Saved ✓' : 'Save profile'}
          </button>
        </form>
      </main>
    </div>
  )
}
