import { useCallback, useMemo, useState } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'

const FILTERS = ['All', 'Active', 'Completed']

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  const addTodo = useCallback(
    (e) => {
      e.preventDefault()
      if (input.trim()) {
        setTodos(prev => [...prev, {
          id: Date.now(),
          text: input.trim(),
          complete: false,
        }])
        setInput('')
      }
    },
    [input]
  )

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, [])

  const toggleComplete = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.complete))
  }, [])

  const stats = useMemo(() => ({
    total: todos.length,
    done: todos.filter(t => t.complete).length,
    pending: todos.filter(t => !t.complete).length,
  }), [todos])

  const progressPercent = stats.total > 0
    ? Math.round((stats.done / stats.total) * 100)
    : 0

  const filteredTodos = useMemo(() => {
    if (filter === 'Active') return todos.filter(t => !t.complete)
    if (filter === 'Completed') return todos.filter(t => t.complete)
    return todos
  }, [todos, filter])

  const emptyMessages = {
    All: { icon: '📝', title: 'No tasks yet!', desc: 'Add your first task above to get started.' },
    Active: { icon: '✅', title: 'All done!', desc: 'No pending tasks — great work!' },
    Completed: { icon: '🎯', title: 'Nothing completed yet', desc: 'Complete tasks will appear here.' },
  }

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-icon">⚡</div>
          <h1 className="app-title">TaskFlow</h1>
        </div>
        <p className="app-subtitle">Kelola tugasmu dengan cerdas & efisien</p>
      </header>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <div className="progress-container">
          <div className="progress-label">
            <span>Progress hari ini</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-badge total">
          <span>📋</span>
          <span className="stat-num">{stats.total}</span>
          <span>Total</span>
        </div>
        <div className="stat-badge done">
          <span>✅</span>
          <span className="stat-num">{stats.done}</span>
          <span>Selesai</span>
        </div>
        <div className="stat-badge pending">
          <span>⏳</span>
          <span className="stat-num">{stats.pending}</span>
          <span>Aktif</span>
        </div>
      </div>

      {/* Input Form */}
      <form className="input-form" onSubmit={addTodo} role="search">
        <input
          id="todo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah tugas baru..."
          className="input"
          autoComplete="off"
          maxLength={200}
        />
        <button type="submit" className="add-button" id="add-todo-btn">
          ＋ Tambah
        </button>
      </form>

      {/* Filter Tabs */}
      {stats.total > 0 && (
        <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
              id={`filter-${f.toLowerCase()}`}
            >
              {f === 'All' ? 'Semua' : f === 'Active' ? 'Aktif' : 'Selesai'}
            </button>
          ))}
        </div>
      )}

      {/* Todo List */}
      <ul className="list" aria-label="Daftar tugas">
        {filteredTodos.length === 0 ? (
          <li>
            <div className="empty-state">
              <span className="empty-icon">{emptyMessages[filter].icon}</span>
              <p className="empty-title">{emptyMessages[filter].title}</p>
              <p className="empty-desc">{emptyMessages[filter].desc}</p>
            </div>
          </li>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={() => toggleComplete(todo.id)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </ul>

      {/* Clear Completed Button */}
      {stats.done > 0 && (
        <button className="clear-btn" onClick={clearCompleted} id="clear-completed-btn">
          🗑 Hapus {stats.done} tugas selesai
        </button>
      )}
    </div>
  )
}

export default App
