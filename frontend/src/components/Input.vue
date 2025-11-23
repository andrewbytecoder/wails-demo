<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])

const age = ref(42)

const msg = ref('Hello World!')

</script>

<template>
  <div>Selected: {{ selected }}</div>
  <div>
    <select v-model="selected">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
  <input v-model.number="age" />
  <div>Age: {{ age }}</div>
<!--  只会剔除前面的空格-->
  <input v-model.trim="msg" />
  <div>Message: {{ msg }}</div>
</template>