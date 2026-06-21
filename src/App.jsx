import { useCallback, useState } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  
  const addTodo = useCallback(
    (e) => {
      e.preventDefault();
      if(input.trim()) {
        setTodos(prev => [...prev, {
          id: Date.now(),
          text: input,
          complete: false
        }])
        setInput('')
      }
    },
    [input]
  )

  const deleteTodo = useCallback((id) => {
    setTodos ((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete} : todo
      )
    )
  },[])

  return (
    <div className="container">
      <h1 className="header">Todo List</h1>
      <form className='input-form' onSubmit={addTodo}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add new task...' className='input' />
        <button type='submit' className='add-button'>Add</button>
      </form>
      <ul className='list'>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleComplete={() => toggleComplete(todo.id)} deleteTodo={() => deleteTodo(todo.id)} />
        ))}
      </ul>
    </div>
      
  )
}

export default App
