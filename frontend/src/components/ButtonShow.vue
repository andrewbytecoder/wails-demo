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

</script>

<template>
  <div id="ddd">
    <button class="button-show-btn" @click="increment">
      Count ingress: {{ count }}
    </button>
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