import React, { useState } from 'react'
import { Activity, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, Plus, Search, RefreshCw, Power } from 'lucide-react'

export default function DashboardPage({ machines, alerts, darkMode, onRegisterMachine, onAcknowledgeAlert, onResolveAlert }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [newMachineName, setNewMachineName] = useState('')
  const [newMachineType, setNewMachineType] = useState('CNC Mill')

  const onlineCount = machines.filter(m => m.status === 'online').length
  const warningCount = alerts.filter(a => a.severity === 'WARNING' && a.status === 'ACTIVE').length
  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status === 'ACTIVE').length

  const filteredMachines = machines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.type.toLowerCase().includes(search.toLowerCase())
    if (filterStatus === 'ALL') return matchesSearch
    return matchesSearch && m.status.toLowerCase() === filterStatus.toLowerCase()
  })

  const handleCreate = (e) => {
    e.preventDefault()
    if (!newMachineName) return
    onRegisterMachine({
      id: `MAC-${Date.now().toString().slice(-4)}`,
      name: newMachineName,
      type: newMachineType,
      status: 'online',
      health: 100,
      temp: 45.2,
      pressure: 3.1,
      vibration: 1.2,
      power: 12.5
    })
    setNewMachineName('')
    setShowRegisterModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Machines</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold mt-3">{machines.length}</p>
          <div className="flex items-center space-x-2 mt-2 text-xs font-medium text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{onlineCount} Online / {machines.length - onlineCount} Offline</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Warnings</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold mt-3 text-amber-500">{warningCount}</p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Requires technician review</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Critical Anomalies</span>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold mt-3 text-red-500">{criticalCount}</p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Immediate action needed</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Plant Efficiency</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold mt-3 text-cyan-500">96.4%</p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Optimal operational state</p>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className={`absolute left-3.5 top-3 w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search machines or types..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-cyan-500 ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-cyan-500 ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <option value="ALL">All Statuses</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Machine</span>
        </button>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMachines.map((machine) => (
          <div key={machine.id} className={`rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl ${
            darkMode ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/50' : 'bg-white border-slate-200 shadow-sm hover:border-cyan-500/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                  darkMode ? 'bg-slate-800 text-cyan-400' : 'bg-cyan-50 text-cyan-700'
                }`}>
                  {machine.id}
                </span>
                <h3 className="text-lg font-bold mt-1">{machine.name}</h3>
              </div>
              <span className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                machine.status === 'online' 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${machine.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                <span className="capitalize">{machine.status}</span>
              </span>
            </div>

            <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Type: {machine.type}</p>

            {/* Health Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Machine Health</span>
                <span className={machine.health > 80 ? 'text-emerald-500' : machine.health > 50 ? 'text-amber-500' : 'text-red-500'}>
                  {machine.health}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div 
                  className={`h-full transition-all duration-500 ${
                    machine.health > 80 ? 'bg-emerald-500' : machine.health > 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${machine.health}%` }}
                />
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                <span className={`text-[10px] font-medium block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Temp (°C)</span>
                <span className="text-sm font-bold font-mono">{machine.temp?.toFixed(1)}°C</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                <span className={`text-[10px] font-medium block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pressure (bar)</span>
                <span className="text-sm font-bold font-mono">{machine.pressure?.toFixed(1)} bar</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                <span className={`text-[10px] font-medium block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Vibration (mm/s)</span>
                <span className="text-sm font-bold font-mono">{machine.vibration?.toFixed(1)}</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-100'}`}>
                <span className={`text-[10px] font-medium block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Power (kW)</span>
                <span className="text-sm font-bold font-mono">{machine.power?.toFixed(1)} kW</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/30 text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Last telemetry: Just now</span>
              <span className="text-cyan-500 font-semibold cursor-pointer hover:underline">View Live Telemetry →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-xl font-bold mb-4">Register New Factory Machine</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase">Machine Name</label>
                <input
                  type="text"
                  required
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                  placeholder="e.g. Hydraulic Press Unit 4"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-cyan-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase">Machine Type</label>
                <select
                  value={newMachineType}
                  onChange={(e) => setNewMachineType(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-cyan-500 ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="CNC Mill">CNC Mill</option>
                  <option value="Hydraulic Press">Hydraulic Press</option>
                  <option value="Assembly Robot">Assembly Robot</option>
                  <option value="Conveyor Belt">Conveyor Belt</option>
                  <option value="Industrial Boiler">Industrial Boiler</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className={`flex-1 py-3 rounded-xl border font-semibold text-sm ${
                    darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25"
                >
                  Save & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}