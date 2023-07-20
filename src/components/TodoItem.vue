<script>
export default {

  props: {
    todo: Object,
  },
  emits: ['update', 'removeTodo'],

  data() {
    return {
      editing: false,
      newTitle: this.todo.title
    };
  },

  methods: {
    toggleCompleted() {
      this.$emit('update', {
        ...this.todo,
        completed: !this.todo.completed,
      });
    },

    removeTodo() {
      this.$emit('removeTodo');
    },

    edit() {
      this.newTitle = this.todo.title;
      this.editing = true;

      this.$nextTick(() => {
        this.$refs['title-field'].focus();
      })
    },

    rename() {
      if (!this.editing) {
        return;
      }

      this.editing = false;

      if(this.newTitle === this.todo.title) {
        return;
      }

      if (this.newTitle === '') {
        this.removeTodo();

        return
      }

      this.$emit('update', {
        ...this.todo,
        title: this.newTitle,
      });

      this.newTitle = '';
    },
  }
};
</script>

<template>
  <div
    class="todo"
    :class="{ completed: todo.completed }"
  >
    <label class="todo__status-label">
      <input
        type="checkbox"
        class="todo__status"
        :checked="todo.completed"
        @change="toggleCompleted"
      />
    </label>

    <form v-if="editing" @submit.prevent="rename">
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        v-model.trim="newTitle"
        ref="title-field"
        @keyup.esc="editing = false"
        @blur="rename"
      />
    </form>

    <template v-else>
      <span
        class="todo__title"
        @dblclick="edit"
      >
        {{ todo.title }}
      </span>

      <button
        class="todo__remove"
        @click="removeTodo"
      >
        x
      </button>
    </template>

    <div
      class="modal overlay"
      :class="{ 'is-active': false }">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>
