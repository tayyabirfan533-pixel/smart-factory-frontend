import React from 'react'
import { BarChart3, TrendingUp, Zap, Clock } from 'lucide-react'

export default function AnalyticsPage({ darkMode }) {
  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <h2 className="text-xl font-bold">Plant Analytics & Telemetry Insights</h2>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Aggregated performance metrics, uptime ratios, and power consumption trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Power Consumption Chart Mock */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-base">Daily Power Consumption (kWh)</h3>
            <span className="text-xs font-semibold text-cyan-500">Avg: 340 kWh/day</span>
          </div>

          <div className={`h-64 rounded-2xl p-4 flex items-end space-x-4 border ${
            darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}>
            {[60, 80, 45, 90, 75, 85, 95].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div 
                  className="w-full rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[10px] mt-2 text-slate-500">Day {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Uptime Chart Mock */}
        <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-base">Machine Uptime Percentage</h3>
            <span className="text-xs font-semibold text-emerald-500">Plant Avg: 98.2%</span>
          </div>

          <div className={`h-64 rounded-2xl p-4 flex items-end space-x-4 border ${
            darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
          }`}>
            {[98, 99, 95, 99, 100, 97, 98].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div 
                  className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-teal-400 transition-all duration-300"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[10px] mt-2 text-slate-500">Day {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}