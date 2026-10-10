import React from 'react'
import { Activity, Bell, User, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ user, onLogout, darkMode, setDarkMode, unreadAlertsCount, onOpenNotifications }) {
  return (
    <header className={`h-16 px-6 flex items-center justify-between border-b transition-colors duration-300 z-30 sticky top-0 ${
      darkMode ? 'bg-slate-900/90 border-slate-800 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md shadow-sm'
    }`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            SmartFactory <span className="text-cyan-500 text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 ml-1">AI Live</span>
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Autonomous Plant Telemetry & Control</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications Icon Button */}
        <button 
          onClick={onOpenNotifications}
          className={`relative p-2.5 rounded-xl border transition-colors ${
            darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-5 h-5" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold animate-bounce">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className={`h-6 w-px ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
            darkMode ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-cyan-100 text-cyan-700 border border-cyan-200'
          }`}>
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="hidden md:block text-left">
            <p className={`text-sm font-semibold leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user?.name || 'Operator'}</p>
            <p className={`text-xs uppercase tracking-wider mt-1 font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
              {user?.role || 'Engineer'}
            </p>
          </div>
          <button
            onClick={onLogout}
            title="Log Out"
            className={`p-2 rounded-xl transition-colors ${
              darkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800' : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
            }`}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}