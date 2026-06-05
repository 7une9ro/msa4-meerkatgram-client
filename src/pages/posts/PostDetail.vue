<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, onBeforeUnmount} from "vue";
import usePostDetailStore from "../../store/post/usePostDetailStore.js";
import useAuthStore from "../../store/auth/useAuthStore.js";

const route = useRoute();
const router = useRouter();
const postDetailStore = usePostDetailStore();
const authStore = useAuthStore();

onBeforeMount(async () => {
  try {
    await postDetailStore.getPost(route.params.id);
  } catch (error) {
    console.log(error.response);
    const msg = error?.response?.data.data ? error?.response?.data.data : "게시물 조회 실패";
    alert(msg);
    router.replace('/');
  }
});

onBeforeUnmount(postDetailStore.clearPostDetail);
</script>

<template>
  <div class="container"
       v-if="postDetailStore.post"
  >
    <div class="image" :style="{backgroundImage: `url(${postDetailStore.post.image})`}"></div>
    <div class="option-box">
      <div class="delete-icon"
           v-if="postDetailStore.post.userId === authStore.userInfo.id"
      ></div>
      <div v-else></div>
      <div class="like-box">
        <span>1919</span>
        <div class="like-icon"></div>
      </div>
    </div>
    <p class="content">{{ postDetailStore.post.content }}</p>
  </div>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.option-box {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-box {
  display: flex;
  gap: 15px;
}

.delete-icon {
  width: 20px;
  height: 20px;
  background-image: url('/icons/trash-can.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.like-icon {
  width: 20px;
  height: 20px;
  background-image: url('/icons/heart-fill.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.content {
  white-space: pre-wrap;
}
</style>