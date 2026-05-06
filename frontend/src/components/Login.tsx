import { useState } from 'react'
import { authService } from '../services/authService'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña')
      return
    }
    setLoading(true)
    setError('')
    try {
      await authService.login(username, password)
      onLogin()
    } catch {
      setError('Credenciales incorrectas. Usa admin / admin123')
    }
    setLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Finance Task Manager</h1>
        <p>Inicia sesión para continuar</p>
        {error && <div className="error-msg">{error}</div>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p className="hint">Usuario: admin | Contraseña: admin123</p>
      </div>
    </div>
  )
}