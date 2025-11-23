<script lang="ts" setup>
import HelloWorld from './components/HelloWorld.vue'
import ButtonShow from './components/ButtonShow.vue'
import TodoList from './components/TodoList.vue'
import Input from "./components/Input.vue";
import Watch from "./components/Watch.vue";
import VModel from "./components/VModel.vue";
import Slot from "./components/Slot.vue";
import ProvideInject from "./components/ProvideInject.vue";
</script>

<template>
  <img id="logo" alt="Wails logo" src="./assets/images/logo-universal.png"/>
  <HelloWorld/>
  <ButtonShow/>
  <TodoList/>
  <Input />
  <Watch />
  <VModel />
  <Slot />
  <ProvideInject />
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
</style>
