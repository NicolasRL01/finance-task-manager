import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth'

export const authService = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { username, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  },

  getToken: () => localStorage.getItem('token'),

  isAuthenticated: () => !!localStorage.getItem('token')
}