import './TodoItem.css'

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={`list-item ${todo.complete ? 'completed' : ''}`}>
      {/* Custom Checkbox */}
      <button
        className={`todo-checkbox ${todo.complete ? 'checked' : ''}`}
        onClick={toggleComplete}
        aria-label={todo.complete ? 'Mark as incomplete' : 'Mark as complete'}
        title={todo.complete ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <span className="check-icon">✓</span>
      </button>

      {/* Todo Text */}
      <span className="todo-text">{todo.text}</span>

      {/* Action Buttons */}
      <div className="item-actions">
        <button
          className="action-btn delete-btn"
          onClick={deleteTodo}
          aria-label="Delete task"
          title="Delete task"
        >
          🗑
        </button>
      </div>
    </li>
  )
}

export default TodoItem