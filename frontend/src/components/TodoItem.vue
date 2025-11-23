<script setup lang="ts">

// defineProps 说明对应的户型会从父组件中传入
// 声明从父组件接收的属性
defineProps(['title'])
// 触发事件，会触发父组件的 remove 事件
defineEmits(['remove'])
</script>

<template>
  <li>
    {{ title }}
    <button @click="$emit('remove')">Remove</button>
  </li>
</template>