import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#171717] dark:bg-black dark:text-white">
      <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm text-white dark:bg-white dark:text-black">P</span>
          Portfolio Generator
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          <Link to="/templates" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#222]">Templates</Link>
          <Link to="/signin" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-[#222]">Sign in</Link>
          <Link to="/signin" className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black">Get started</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-12 text-center sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Portfolio Generator</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Build a portfolio that gets you hired
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-500">
          Create a professional portfolio in minutes. Pick a template, add your work, and publish — with AI help when you need it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signin" className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black">Start for free</Link>
          <Link to="/templates" className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold dark:border-[#444]">Browse templates</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 pb-16 sm:grid-cols-3">
        {[
          { t: 'Templates', d: 'Clean layouts ready for developers, designers, and creators.' },
          { t: 'AI Studio', d: 'Generate bios and project write-ups in seconds.' },
          { t: 'Publish', d: 'Save drafts, publish when ready, share your link.' },
        ].map((f) => (
          <article key={f.t} className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-[#292929] dark:bg-[#101010]">
            <h3 className="font-bold">{f.t}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">{f.d}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-gray-200 bg-black px-4 py-14 text-center text-white dark:border-[#222]">
        <h2 className="text-2xl font-bold">Ready to show your work?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">Sign in and create your first portfolio today.</p>
        <Link to="/signin" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black">Get started →</Link>
      </section>

      <footer className="px-4 py-8 text-center text-xs text-gray-500">
        Portfolio Generator · Built for your team
      </footer>
    </div>
  )
}
