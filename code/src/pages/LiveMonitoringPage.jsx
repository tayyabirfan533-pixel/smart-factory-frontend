import React, { useState } from 'react'
import { Radio, Thermometer, Gauge, Activity, Zap, Play, Pause } from 'lucide-react'

export default function LiveMonitoringPage({ machines, darkMode }) {
  const [selectedMachineId, setSelectedMachineId] = useState(machines[0]?.id || '')
  const [isSimulating, setIsSimulating] = useState(true)

  const selectedMachine = machines.find(m => m.id === selectedMachineId) || machines[0]

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-6 h-6 text-cyan-500 animate-pulse" />
            <h2 className="text-xl font-bold">Real-Time Sensor Telemetry Stream</h2>
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Live WebSocket data pipeline streaming direct from FastAPI sensor engine
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-all ${
              isSimulating 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
            }`}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isSimulating ? 'Live Feed Active' : 'Feed Paused'}</span>
          </button>
        </div>
      </div>

      {/* Machine Selector Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {machines.map((machine) => (
          <button
            key={machine.id}
            onClick={() => setSelectedMachineId(machine.id)}
            className={`px-5 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all flex items-center space-x-2 ${
              selectedMachineId === machine.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : darkMode 
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${machine.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{machine.name}</span>
          </button>
        ))}
      </div>

      {selectedMachine && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Temperature Gauge Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Temperature</span>
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                <Thermometer className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black font-mono mt-2">{selectedMachine.temp?.toFixed(1)}°C</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Safe Range: &lt; 75°C</span>
              <span className="text-emerald-500 font-semibold">Normal</span>
            </div>
          </div>

          {/* Pressure Gauge Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hydraulic Pressure</span>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <Gauge className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black font-mono mt-2">{selectedMachine.pressure?.toFixed(1)} bar</p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Safe Range: 2.0 - 5.0</span>
              <span className="text-emerald-500 font-semibold">Optimal</span>
            </div>
          </div>

          {/* Vibration Gauge Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Vibration Velocity</span>
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black font-mono mt-2">{selectedMachine.vibration?.toFixed(1)} <span className="text-xs font-normal">mm/s</span></p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Safe Range: &lt; 3.5</span>
              <span className="text-emerald-500 font-semibold">Stable</span>
            </div>
          </div>

          {/* Power Consumption Card */}
          <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Power Draw</span>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black font-mono mt-2">{selectedMachine.power?.toFixed(1)} <span className="text-xs font-normal">kW</span></p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>Grid Load: Normal</span>
              <span className="text-cyan-500 font-semibold">Efficient</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Oscilloscope Simulation Graph Box */}
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Telemetry Oscilloscope Waveform</h3>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time frequency analysis across sensors</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            Hz: 50.0Hz Stable
          </span>
        </div>

        <div className={`h-64 rounded-2xl p-4 flex items-end space-x-2 border ${
          darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
        }`}>
          {[40, 65, 55, 70, 85, 60, 45, 90, 75, 65, 50, 80, 85, 60, 50, 70, 75, 80, 65, 55, 45, 60, 75, 85, 70, 55, 65, 80, 70, 60].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div 
                className="w-full rounded-t bg-gradient-to-t from-cyan-600 to-blue-500 transition-all duration-300 group-hover:bg-cyan-400"
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}