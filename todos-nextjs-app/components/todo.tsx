import axios from 'axios'
import Checkbox from './checkbox'

export default function Todo({ todo, reloadList }) {
  //TODO: implement toggle checkbox
  const toggleCompleted = (event) => {
    axios({
      url: `api/todos/${todo._id}`,
      method: 'PUT',
      data: {
        text: todo.text,
        completed: event.target.checked,
      },
    }).then((res) => {
      if (res.status !== 200) {
        console.error('Error create todo from api!')
        console.error(res)
        return
      }
      reloadList()
    })
  }

  const deleteTodo = () => {
    axios.delete('/api/todos/' + todo._id).then(reloadList)
  }

  return (
    <div className="flex justify-between space-x-3 bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700">
      <Checkbox completed={todo.completed} toggleCompleted={toggleCompleted} />
      <p
        className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
          todo.completed && 'line-through text-gray-400 dark:text-gray-500'
        }`}
      >
        {todo.text}
      </p>
      <button
        aria-label="Delete Todo"
        className="focus:outline-none"
        type="button"
        onClick={deleteTodo}
      >
        <CrossIcon />
      </button>
    </div>
  )
}

function CrossIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
      <path
        className="fill-current text-gray-800 dark:text-gray-100"
        fill="#494C6B"
        fillRule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  )
}
