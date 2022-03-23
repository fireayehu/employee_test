import { useEffect, useState } from 'react'
import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import axios from 'axios'
import Form from '../components/form'
import Todo from '../components/todo'
import Nav from '../components/nav'
import Container from '../components/container'

function Homepage(): JSX.Element {
  const [status, setStatus] = useState('loading')
  const [todos, setTodos] = useState(null)
  const [allTodos, setAllTodos] = useState(null)
  const [activeTodos, setActiveTodos] = useState(null)
  const [completedTodos, setCompletedTodos] = useState(null)

  // Load Todo Items
  useEffect(() => {
    let cancelled = false

    // if status isn't loading then ignore
    if (status !== 'loading') return

    // get all todo items from api if loading
    axios({ url: 'api/todos', method: 'GET' }).then((res) => {
      if (cancelled) return

      if (res.status !== 200) {
        console.error('Error loading from api!')
        console.error(res)
        return
      }

      setTodos(res.data.todos)
      setStatus('loaded')
    })

    return () => {
      cancelled = true
    }
  }, [status])

  // filter todos
  useEffect(() => {
    setAllTodos(todos)
    setActiveTodos(todos?.filter((todo) => !todo.completed))
    setCompletedTodos(todos?.filter((todo) => todo.completed))
  }, [status])

  const reloadList = () => setStatus('loading')

  // TODO: update new todos order on server
  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTodos(items)

    axios({
      url: 'api/todos/order',
      method: 'PUT',
      data: {
        source: result.source.index,
        destination: result.destination.index,
      },
    }).then((res) => {
      if (res.status !== 200) {
        console.error('Error create todo from api!')
        console.error(res)
        return
      }
    })
  }

  return (
    <>
      <Head>
        <title>Todos App</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-mobile-light dark:bg-mobile-dark sm:bg-desktop-light sm:dark:bg-desktop-dark bg-cover bg-center min-h-[200px] sm:min-h-[300px]">
          <Container>
            <div className="flex justify-between">
              <h1 className="text-xl sm:text-3xl text-white font-bold tracking-[0.625rem]">
                Todo's
              </h1>
            </div>
            <Form reloadList={reloadList} />
          </Container>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Container>
            {todos ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden"
                    >
                      {todos.map((todo, index) => (
                        <Draggable
                          key={todo._id}
                          draggableId={todo._id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Todo todo={todo} reloadList={reloadList} />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div>Loading...</div>
            )}

            <Nav
              todos={{
                all: allTodos,
                active: activeTodos,
                completed: completedTodos,
              }}
              setTodos={setTodos}
              reloadList={reloadList}
            />
            <small className="text-gray-500 text-center mt-6">
              Drag and drop to reorder list
            </small>
          </Container>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
          <small>Simple Todos App</small>
        </footer>
      </div>
    </>
  )
}

export default Homepage
