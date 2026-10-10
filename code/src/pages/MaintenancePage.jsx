import React, { useState } from 'react'
import { Wrench, Calendar, Plus, CheckCircle2 } from 'lucide-react'

export default function MaintenancePage({ darkMode }) {
  const [records, setRecords] = useState([
    { id: 'MNT-101', machine: 'CNC Mill #1', technician: 'Alex Mercer', date: '2026-10-08', type: 'Scheduled Calibration', status: 'Completed' },
    { id: 'MNT-102', machine: 'Hydraulic Press #2', technician: 'Sara Connor', date: '2026-10-06', type: 'Bearing Replacement', status: 'Completed' },
    { id: 'MNT-103', machine: 'Assembly Robot #3', technician: 'John Smith', date: '2026-10-12', type: 'Firmware Update', status: 'Pending' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [machineName, setMachineName] = useState('')
  const [techName, setTechName] = useState('')
  const [maintType, setMaintType] = useState('Routine Inspection')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!machineName || !techName) return
    setRecords([
      {
        id: `MNT-10${records.length + 1}`,
        machine: machineName,
        technician: techName,
        date: new Date().toISOString().split('T')[0],
        type: maintType,
        status: 'Pending'
      },
      ...records
    ])
    setMachineName('')
    setTechName('')
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h2 className="text-xl font-bold">Maintenance Records & Schedules</h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Track servicing history, part replacements, and upcoming calibrations
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log Maintenance</span>
        </button>
      </div>

      <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                darkMode ? 'border-slate-800 bg-slate-950/50 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}>
                <th className="p-4">Record ID</th>
                <th className="p-4">Machine</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Service Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20 text-sm font-medium">
              {records.map((rec) => (
                <tr key={rec.id} className={darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                  <td className="p-4 font-mono text-xs text-cyan-400">{rec.id}</td>
                  <td className="p-4 font-bold">{rec.machine}</td>
                  <td className="p-4">{rec.technician}</td>
                  <td className="p-4">{rec.type}</td>
                  <td className={`p-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{rec.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      rec.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-xl font-bold mb-4">Log New Maintenance</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 uppercase">Machine Name</label>
                <input
                  type="text"
                  required
                  value={machineName}
                  onChange={(e) => setMachineName(e.target.value)}
                  placeholder="e.g. CNC Mill #1"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase">Technician Name</label>
                <input
                  type="text"
                  required
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 uppercase">Service Type</label>
                <select
                  value={maintType}
                  onChange={(e) => setMaintType(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Routine Inspection">Routine Inspection</option>
                  <option value="Bearing Replacement">Bearing Replacement</option>
                  <option value="Scheduled Calibration">Scheduled Calibration</option>
                  <option value="Firmware Update">Firmware Update</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}