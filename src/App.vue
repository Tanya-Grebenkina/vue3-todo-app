<script>
import StatusFilter from './components/StatusFilter.vue';
import TodoItem from './components/TodoItem.vue';
import TheMessage from './components/TheMessage.vue';
import { getTodos, createTodos, updateTodos, removeTodo } from './api/todos';

export default {
  components: {
    StatusFilter,
    TodoItem,
    TheMessage,
  },

  data() {
    return {
      todos: [],
      title: '',
      status: 'all',
      errorMessage: '',
    };
  },

  computed: {
    activeTodos() {
      return this.todos.filter((todo) => !todo.completed);
    },

    completedTodos() {
      return this.todos.filter((todo) => todo.completed);
    },

    visibleTodos() {
      switch (this.status) {
        case 'Active':
          return this.activeTodos;

        case 'Completed':
          return this.completedTodos;

        default:
          return this.todos;
      }
    },
  },

  mounted() {
    getTodos()
      .then(({ data }) => {
        this.todos = data;
      })
      .catch(() => {
        this.errorMessage = 'Unable to load todos';
      });
  },

  methods: {
    handleSubmit() {
      createTodos(this.title).then(({ data }) => {
        this.todos = [...this.todos, data];
        this.title = '';
      });
    },

    handleChangeStatusLink(currentStatus) {
      this.status = currentStatus;
    },

    updateTodoOnServer({ id, title, completed }) {
      updateTodos({ id, title, completed }).then(({ data }) => {
        this.todos = this.todos.map((todo) => (todo.id !== id ? todo : data));
      });
    },

    removeTodoFromServer(todoId) {
      removeTodo(todoId).then(() => {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
      });
    },
  },
};
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button
          class="todoapp__toggle-all"
          :class="{ active: !!activeTodos.length }"></button>

        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title" />
        </form>
      </header>

      <TransitionGroup
        name="list"
        tag="section"
        class="todoapp__main">
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodoOnServer"
          @removeTodo="removeTodoFromServer(todo.id)" />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todo-count"> {{ activeTodos.length }} items left </span>

        <StatusFilter v-model="status" />

        <button
          class="todoapp__clear-completed"
          v-if="activeTodos.length > 0">
          Clear completed
        </button>
      </footer>
    </div>

    <TheMessage
      class="is-warning"
      :active="errorMessage !== ''"
      @hide="errorMessage = ''"
    >
      <template #default>
        <p>{{ errorMessage }}</p>
      </template>

      <template #header>
        <p>Error warning</p>
      </template>
    </TheMessage>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
