import { useState, useEffect } from 'react'
import type { Task, CreateTaskDto } from '../types'
import { taskService } from '../services/taskService'
import TaskCard from '../components/TaskCard'

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [form, setForm] = useState<CreateTaskDto>({
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    category: ''
  })
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll()
      setTasks(data)
    } catch {
      console.log('Error cargando tareas')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async () => {
    if (!form.title || !form.category) return
    setLoading(true)
    try {
      await taskService.create(form)
      setForm({
        title: '',
        description: '',
        status: 'PENDING',
        priority: 'MEDIUM',
        category: ''
      })
      fetchTasks()
    } catch {
      console.log('Error creando tarea')
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    try {
      await taskService.delete(id)
      fetchTasks()
    } catch {
      console.log('Error eliminando tarea')
    }
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await taskService.updateStatus(id, status)
      fetchTasks()
    } catch {
      console.log('Error actualizando estado')
    }
  }

  const pending = tasks.filter(t => t.status === 'PENDING').length
  const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length
  const completed = tasks.filter(t => t.status === 'COMPLETED').length

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <div>
            <h1>Finance Task Manager</h1>
            <p>Gestión de tareas financieras</p>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="stats">
        <div className="stat-card">
          <h3>{pending}</h3>
          <p>Pendientes</p>
        </div>
        <div className="stat-card">
          <h3>{inProgress}</h3>
          <p>En Progreso</p>
        </div>
        <div className="stat-card">
          <h3>{completed}</h3>
          <p>Completadas</p>
        </div>
        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <p>Total</p>
        </div>
      </div>

      <div className="form-section">
        <h2>Nueva Tarea</h2>
        <div className="form-grid">
          <input
            placeholder="Título de la tarea"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Categoría (ej: Riesgo, Contabilidad)"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />
          <select
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value as CreateTaskDto['priority'] })}
          >
            <option value="LOW">Baja Prioridad</option>
            <option value="MEDIUM">Media Prioridad</option>
            <option value="HIGH">Alta Prioridad</option>
          </select>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value as CreateTaskDto['status'] })}
          >
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completado</option>
          </select>
          <textarea
            placeholder="Descripción de la tarea"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creando...' : 'Crear Tarea'}
          </button>
        </div>
      </div>

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <p className="no-tasks">No hay tareas aún. ¡Crea la primera!</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  )
}