<script setup lang="ts">
import { ref } from 'vue'
import VModeItem from './VModeItem.vue'

// 当父组件传入attribute的情况下这里是不会自动进行继承的
defineOptions( {
  inheritAttrs: false
})

const bookTitle = ref('v-model argument example')
</script>

<template>
  <h1>{{ bookTitle }}</h1>
<!--  v-model 是双向绑定数据-->
<!-- title 是指定的参数，如果不指定参数子组件就只能取出一个 v-mode绑定的数据 -->
  <VModeItem v-model:title="bookTitle" />
</template>