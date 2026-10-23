import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './SignIn'
import UserDashboard from './UserDashboard'
import PortfolioBuilder from './PortfolioBuilder'
import AIStudio from './AIStudio'
import Premium from './Premium'
import HomePage from './HomePage'
import Templates from './Templates'
import Profile from './Profile'
import AdminDashboard from './AdminDashboard'
import './App.css'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('admin_theme') || 'light')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('admin_theme', theme)
  }, [theme])
  return (
    <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/signin" element={<SignIn />} />
  <Route path="/dashboard" element={<UserDashboard />} />
  <Route path="/my-portfolios" element={<UserDashboard />} />
  <Route path="/create-portfolio" element={<PortfolioBuilder />} />
  <Route path="/builder" element={<PortfolioBuilder />} />
  <Route path="/templates" element={<Templates />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/ai" element={<AIStudio />} />
  <Route path="/premium" element={<Premium />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </Routes>
    </BrowserRouter>
  )
}
