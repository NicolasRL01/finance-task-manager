import axios from 'axios'
import type { Task, CreateTaskDto } from '../types'
import { authService } from './authService'

const API_URL = 'http://localhost:8080/api/tasks'

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${authService.getToken()}` }
})

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const response = await axios.get(API_URL, getHeaders())
    return response.data
  },

  create: async (task: CreateTaskDto): Promise<Task> => {
    const response = await axios.post(API_URL, task, getHeaders())
    return response.data
  },

  updateStatus: async (id: number, status: string): Promise<Task> => {
    const response = await axios.patch(`${API_URL}/${id}/status`, { status }, getHeaders())
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`, getHeaders())
  }
}