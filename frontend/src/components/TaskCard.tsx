import type { Task } from '../types'
import { Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface TaskCardProps {
  task: Task
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: string) => void
}

const priorityColors = {
  LOW: '#22c55e',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444'
}

const statusIcons = {
  PENDING: <Clock size={16} />,
  IN_PROGRESS: <AlertCircle size={16} />,
  COMPLETED: <CheckCircle size={16} />
}

export default function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-category">{task.category}</span>
        <span className="task-priority" style={{ color: priorityColors[task.priority] }}>
          {task.priority}
        </span>
      </div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-footer">
        <div className="task-status">
          {statusIcons[task.status]}
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completado</option>
          </select>
        </div>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}