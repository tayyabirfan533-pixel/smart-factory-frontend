import React, { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import DashboardPage from './pages/DashboardPage'
import LiveMonitoringPage from './pages/LiveMonitoringPage'
import AlertsPage from './pages/AlertsPage'
import MaintenancePage from './pages/MaintenancePage'
import AnalyticsPage from './pages/AnalyticsPage'

const BACKEND_URL = 'https://smart-factory-backend-tmlo.onrender.com'

export default function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)

  // Initial Mock Machines (Fallback & Live simulation)
  const [machines, setMachines] = useState([
    { id: 'MAC-1001', name: 'CNC Mill #1', type: 'CNC Mill', status: 'online', health: 94, temp: 42.5, pressure: 3.2, vibration: 1.1, power: 14.2 },
    { id: 'MAC-1002', name: 'Hydraulic Press #2', type: 'Hydraulic Press', status: 'online', health: 78, temp: 68.4, pressure: 4.8, vibration: 2.9, power: 22.1 },
    { id: 'MAC-1003', name: 'Assembly Robot #3', type: 'Assembly Robot', status: 'offline', health: 45, temp: 25.0, pressure: 1.0, vibration: 0.2, power: 0.0 },
    { id: 'MAC-1004', name: 'Industrial Boiler #4', type: 'Industrial Boiler', status: 'online', health: 89, temp: 82.1, pressure: 5.5, vibration: 1.5, power: 35.8 }
  ])

  // Initial Mock Alerts
  const [alerts, setAlerts] = useState([
    { id: 'ALT-501', machineId: 'MAC-1002', severity: 'WARNING', message: 'Temperature threshold exceeded (> 65°C)', timestamp: '10 mins ago', status: 'ACTIVE' },
    { id: 'ALT-502', machineId: 'MAC-1003', severity: 'CRITICAL', message: 'Machine offline unexpectedly / Connection lost', timestamp: '25 mins ago', status: 'ACTIVE' },
    { id: 'ALT-503', machineId: 'MAC-1004', severity: 'WARNING', message: 'Unusual vibration spike detected by AI model', timestamp: '1 hour ago', status: 'ACKNOWLEDGED' }
  ])

  // Optional: Try fetching from backend, fallback gracefully if 500 error occurs
  useEffect(() => {
    if (!user) return
    const fetchBackendData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/machines`)
        if (!response.ok) throw new Error('Backend error')
        const data = await response.json()
        if (data && data.length > 0) {
          setMachines(data)
        }
      } catch (err) {
        console.warn('Backend server returned an error (500/offline). Using high-performance local telemetry state.')
      }
    }
    fetchBackendData()
  }, [user])

  // Periodic Simulation of Live Sensor Updates
  useEffect(() => {
    if (!user) return
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'offline') return m
        return {
          ...m,
          temp: Math.max(30, Math.min(95, m.temp + (Math.random() * 4 - 2))),
          pressure: Math.max(1, Math.min(8, m.pressure + (Math.random() * 0.4 - 0.2))),
          vibration: Math.max(0.5, Math.min(5, m.vibration + (Math.random() * 0.2 - 0.1))),
          power: Math.max(5, Math.min(45, m.power + (Math.random() * 2 - 1)))
        }
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [user])

  const handleRegisterMachine = (newMachine) => {
    setMachines(prev => [newMachine, ...prev])
  }

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a))
  }

  const handleResolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
  }

  const unreadAlertsCount = alerts.filter(a => a.status === 'ACTIVE').length

  if (!user) {
    return <AuthPage onLogin={setUser} darkMode={darkMode} />
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navbar 
        user={user} 
        onLogout={() => setUser(null)} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        unreadAlertsCount={unreadAlertsCount}
        onOpenNotifications={() => setShowNotificationsModal(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />

        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <DashboardPage 
              machines={machines} 
              alerts={alerts} 
              darkMode={darkMode}
              onRegisterMachine={handleRegisterMachine}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onResolveAlert={handleResolveAlert}
            />
          )}
          {activeTab === 'live' && <LiveMonitoringPage machines={machines} darkMode={darkMode} />}
          {activeTab === 'alerts' && (
            <AlertsPage 
              alerts={alerts} 
              darkMode={darkMode} 
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onResolveAlert={handleResolveAlert}
            />
          )}
          {activeTab === 'maintenance' && <MaintenancePage darkMode={darkMode} />}
          {activeTab === 'analytics' && <AnalyticsPage darkMode={darkMode} />}
        </main>
      </div>

      {/* Notifications Drawer Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm">
          <div className={`w-full max-w-md h-full p-6 flex flex-col border-l shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/30">
              <h3 className="text-lg font-bold">System Alerts & Notifications</h3>
              <button 
                onClick={() => setShowNotificationsModal(false)}
                className={`p-2 rounded-xl ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-2xl border ${
                  darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      alert.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{alert.timestamp}</span>
                  </div>
                  <p className="text-sm font-semibold mb-3">{alert.message}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                    <span className="text-xs font-mono text-cyan-400">{alert.machineId}</span>
                    {alert.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                        className="text-xs font-semibold text-cyan-400 hover:underline"
                      >
                        Acknowledge →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}