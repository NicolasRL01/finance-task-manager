import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './components/Login'
import { authService } from './services/authService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App