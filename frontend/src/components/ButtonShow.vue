<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
const ok = ref(true)

const items = ref([{ message: 'Foo' },
  { message: 'Bar' },
    { message: 'Baz' }
])

onMounted(() => {
  console.log('The ButtonShow  component mounted.')
})

</script>

<template>
  <div id="ddd">
    <h1 v-show="ok">Hello!</h1>
    <button class="button-show-btn" @click="increment">
      Count ingress: {{ count }}
    </button>
    <button class="button-show-btn" @click="ok = !ok">
       Show header: {{ ok }}
    </button>
<!--    添加列表-->
    <li v-for="item in items">
      <span>{{ item.message }}</span>
      {{ item.message }}
    </li>
  </div>
</template>

<style scoped>
.button-show-btn {
  /* 特定的样式 */
  background-color: #35495e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin: 10px;
}
</style>