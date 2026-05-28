<script setup>
import MyError from "../pages/errors/MyError.vue";
import useMyErrorStore from "../store/error/useMyErrorStore.js";

const myErrorStore = useMyErrorStore();
</script>

<template>
  <MyError v-if="myErrorStore.isError"/>
  <router-view v-else/>
</template>

<style scoped>

</style>