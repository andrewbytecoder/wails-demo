<script setup lang="ts">
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    Message to grand child: {{ message }}
  </p>
</template>