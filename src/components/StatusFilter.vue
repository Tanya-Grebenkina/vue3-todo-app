<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{selected: modelValue === 'All'}"
      @click="$emit('update:modelValue', 'All')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{selected: modelValue === 'Active'}"
      @click="$emit('update:modelValue', 'Active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{selected: modelValue === 'Completed'}"
      @click="$emit('update:modelValue', 'Completed')"
    >
      Completed
    </a>
  </nav>
</template>
