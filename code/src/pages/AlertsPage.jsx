import React, { useState } from 'react'
import { AlertTriangle, ShieldAlert, CheckCircle2, Filter } from 'lucide-react'

export default function AlertsPage({ alerts, darkMode, onAcknowledgeAlert, onResolveAlert }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity
    const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus
    return matchesSeverity && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h2 className="text-xl font-bold">Alert Management & Anomaly Detection</h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Threshold-based alerts and AI-driven unusual behavior identification
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className={`px-4 py-2.5 rounded-xl border text-sm outline-none ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <option value="ALL">All Severities</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2.5 rounded-xl border text-sm outline-none ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts Table / List */}
      <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'border-slate-800 bg-slate-950/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <th className="p-4">Severity</th>
                <th className="p-4">Machine ID</th>
                <th className="p-4">Alert Message</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20 text-sm font-medium">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">
                    No alerts match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className={`transition-colors ${
                    darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                  }`}>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        alert.severity === 'CRITICAL' 
                          ? 'bg-red-500/10 text-red-500 border border-red-500/30' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                      }`}>
                        {alert.severity === 'CRITICAL' ? <ShieldAlert className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        <span>{alert.severity}</span>
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs">{alert.machineId}</td>
                    <td className="p-4 font-semibold">{alert.message}</td>
                    <td className={`p-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{alert.timestamp}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${
                        alert.status === 'ACTIVE' 
                          ? 'bg-red-500/10 text-red-500' 
                          : alert.status === 'ACKNOWLEDGED' 
                            ? 'bg-amber-500/10 text-amber-500' 
                            : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {alert.status === 'ACTIVE' && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-semibold border border-amber-500/30 transition-all"
                        >
                          Acknowledge
                        </button>
                      )}
                      {alert.status !== 'RESOLVED' && (
                        <button
                          onClick={() => onResolveAlert(alert.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-xs font-semibold border border-emerald-500/30 transition-all"
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}