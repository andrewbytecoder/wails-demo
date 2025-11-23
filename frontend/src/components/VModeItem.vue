<script setup lang="ts">

// <!--   defineModel 描述了父组件传递给子组件的属性 实现双向数据绑定 -->

const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>