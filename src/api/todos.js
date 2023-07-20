import { client } from "../utils/httpClient";

export const getTodos = () => {
  return client.get('/todos?userId=6342')
  // .then(() => Promise.reject())
}

export const createTodos = (newTitle) => {
  return client.post('/todos', {
    title: newTitle,
    completed: false,
    userId: 6342,
  });
}

export const updateTodos = ({ id, title, completed}) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed,
  });
}

export const removeTodo = (todoId) => {
  return client.delete(`/todos/${todoId}`)
}