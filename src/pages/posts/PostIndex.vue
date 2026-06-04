<script setup>
import ButtonComponent from "../../components/button/ButtonComponent.vue";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import usePostIndexStore from "../../store/post/usePostIndexStore.js";
import useMyErrorStore from "../../store/error/useMyErrorStore.js";
import {useRouter} from "vue-router";

const postIndexStore = usePostIndexStore();

const router = useRouter();

const getNextPage = async () => {
  await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
}

const redirectPostDetail = (id) => {
  router.push(`/posts/${id}`);
}

// LifeCycle
onBeforeMount(postIndexStore.getPostPagination);

onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>
  <div class="card-container">
    <div
      class="card" 
      v-for="item in postIndexStore.items"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
      @click="redirectPostDetail(item.id)"
    ></div>
  </div>
  <ButtonComponent
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more posts from June'"
    @click="getNextPage()"
  />
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5%;
  border: 1px solid var(--personal-color-gray);
}
</style>