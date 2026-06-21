const TodoItem = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li key={todo.id} className={`list-item ${todo.complete ? 'completed' : ''}`}>
        <span>{todo.text}</span>
        <div className='buttons'>
          <button onClick={toggleComplete} className='complete-button'>
            {todo.complete ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={deleteTodo} className='delete-button'>
            Delete
          </button>
        </div>
    </li>
  )
}

export default TodoItem