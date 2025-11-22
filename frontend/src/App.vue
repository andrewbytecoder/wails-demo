<script lang="ts" setup>

import HelloWorld from './components/HelloWorld.vue'
import ButtonShow from "./components/ButtonShow.vue";


</script>

<template>
<!--  <img id="logo" alt="Wails logo" src="./assets/images/logo-universal.png"/>-->
<!--  <div class="app-container">-->
<!--    <div class="component-wrapper">-->
<!--      <HelloWorld/>-->
<!--    </div>-->
<!--    <div class="component-wrapper">-->
<!--      <ButtonShow />-->
<!--    </div>-->
<!--  </div>-->
  <HelloWorld/>
  <ButtonShow />
</template>

<style>
#logo {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto;
  padding: 10% 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-origin: content-box;
}
.app-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 组件间距 */
}

.component-wrapper {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
}
</style>
