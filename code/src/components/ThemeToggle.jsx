import React from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2.5 rounded-xl transition-all duration-300 border ${
        darkMode 
          ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
      }`}
      title="Toggle Theme"
    >
      {darkMode ? <Sun className="w-5 h-5 animate-spin-slow" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}