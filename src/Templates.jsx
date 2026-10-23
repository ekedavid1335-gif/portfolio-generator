import { Link, useNavigate } from 'react-router-dom'

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', desc: 'Clean typography, lots of space. Great for developers.', color: '#171717' },
  { id: 'bold', name: 'Bold', desc: 'Strong headlines and dark hero. Good for creatives.', color: '#2563eb' },
  { id: 'card', name: 'Card Grid', desc: 'Project cards in a grid. Ideal for showcasing work.', color: '#0f766e' },
  { id: 'resume', name: 'Resume Style', desc: 'Structured sections like a modern CV online.', color: '#7c3aed' },
]

export default function Templates() {
  const navigate = useNavigate()
  const loggedIn = !!(localStorage.getItem('auth_user') || localStorage.getItem('userName'))

  function useTemplate(id) {
    localStorage.setItem('selected_template', id)
    navigate(loggedIn ? '/create-portfolio' : '/signin')
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#171717] dark:bg-black dark:text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 dark:border-[#222] sm:px-8">
        <Link to={loggedIn ? '/dashboard' : '/'} className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm text-white dark:bg-white dark:text-black">P</span>
          Templates
        </Link>
        <nav className="flex gap-2">
          {loggedIn ? (
            <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#222]">Dashboard</Link>
          ) : (
            <Link to="/signin" className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">Sign in</Link>
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Choose a template</h1>
        <p className="mt-2 text-sm text-gray-500">Start from a layout, then customize in the builder.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <article key={t.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#292929] dark:bg-[#101010]">
              <div className="h-28" style={{ background: t.color }} />
              <div className="p-5">
                <h2 className="text-lg font-bold">{t.name}</h2>
                <p className="mt-1 text-sm text-gray-500">{t.desc}</p>
                <button type="button" onClick={() => useTemplate(t.id)} className="mt-4 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black">
                  Use this template
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
