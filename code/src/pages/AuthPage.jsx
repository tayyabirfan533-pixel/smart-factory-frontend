import React, { useState } from 'react'
import { Activity, Lock, Mail, User, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function AuthPage({ onLogin, darkMode }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('operator')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (!email || !password) {
        setError('Please enter both email and password.')
        return
      }

      let userRole = role
      let userName = name || (email.includes('admin') ? 'Admin Supervisor' : 'Plant Operator')
      if (email.includes('admin')) userRole = 'admin'

      onLogin({
        email,
        name: userName,
        role: userRole,
        token: 'mock-jwt-token-smart-factory-98234'
      })
    }, 600)
  }

  const fillDemo = (type) => {
    if (type === 'admin') {
      setEmail('admin@smartfactory.io')
      setPassword('pass')
      setRole('admin')
      setName('Admin Supervisor')
    } else {
      setEmail('operator@smartfactory.io')
      setPassword('pass')
      setRole('operator')
      setName('Plant Operator')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className={`w-full rounded-3xl border shadow-2xl p-8 backdrop-blur-xl transition-all duration-500 ${
          darkMode ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/30' : 'bg-white/95 border-slate-200 shadow-xl'
        }`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 mb-4">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Smart Factory IoT</h2>
            <p className={`text-sm mt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isLogin ? 'Sign in to monitor plant health & telemetry' : 'Register a new operator or admin account'}
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1.5 ${
                darkMode ? 'bg-slate-800/80 border-slate-700 text-cyan-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-cyan-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="truncate">Admin Demo</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo('operator')}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center space-x-1.5 ${
                darkMode ? 'bg-slate-800/80 border-slate-700 text-blue-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-blue-700 hover:bg-slate-200'
              }`}
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span className="truncate">Operator Demo</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {!isLogin && (
              <div>
                <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3.5 top-3.5 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-cyan-500 ${
                      darkMode ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-3.5 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartfactory.io"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-cyan-500 ${
                    darkMode ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-3.5 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-cyan-500 ${
                    darkMode ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  System Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-cyan-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="operator">Plant Operator</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : isLogin ? 'Access Control Dashboard' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className={`text-xs font-semibold hover:underline ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}
            >
              {isLogin ? "Don't have an account? Sign up here" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}