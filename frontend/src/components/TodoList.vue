<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

const newTodoText = ref('')
const todos = ref([
  {
    id: 1,
    title: 'Do the dishes'
  },
  {
    id: 2,
    title: 'Take out the trash'
  },
  {
    id: 3,
    title: 'Mow the lawn'
  },
  {
    id: 4,
    title: 'Walk the dog'
  }
])

let nextTodoId = 4

function addNewTodo() {
  todos.value.push({
    id: nextTodoId++,
    title: newTodoText.value
  })
  newTodoText.value = ''
}

function removeTodo(index: number) {
  todos.value.splice(index, 1)
}

</script>

<template>
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo </label>
    <input
        v-model="newTodoText"
        id="new-todo"
        placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
<!--   隔开一行-->
  <ul>
    <todo-item
        v-for="(todo, index) in todos"
        :key="todo.id"
        :title="todo.title"
        @remove=removeTodo(index)
    ></todo-item>
  </ul>
</template>