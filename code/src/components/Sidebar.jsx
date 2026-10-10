import React from 'react'
import { LayoutDashboard, Radio, AlertTriangle, Wrench, BarChart3 } from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab, darkMode }) {
  const menuItems = [
    { id: 'dashboard', label: 'Machine Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Radio },
    { id: 'alerts', label: 'Alerts & Anomalies', icon: AlertTriangle },
    { id: 'maintenance', label: 'Maintenance Records', icon: Wrench },
    { id: 'analytics', label: 'Analytics & Charts', icon: BarChart3 },
  ]

  return (
    <aside className={`w-64 border-r flex flex-col transition-colors duration-300 shrink-0 ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
    }`}>
      <div className="p-6">
        <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Navigation
        </p>
      </div>

      <nav className="px-4 space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 font-semibold'
                  : darkMode
                    ? 'hover:bg-slate-800/80 text-slate-400 hover:text-white'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">Backbone Node</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-xs font-mono text-cyan-400 truncate">fastapi-render-active</p>
        <p className="text-[10px] text-slate-500 mt-1">WebSocket: Connected (WSS)</p>
      </div>
    </aside>
  )
}