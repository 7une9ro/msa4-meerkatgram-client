<script setup>
import useAuthStore from "../store/auth/useAuthStore.js";
import {useRouter} from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const redirectPostCreate = () => {
  router.push('/posts/create');
};
</script>

<template>
  <div class="container"
       v-if="authStore.isLoggedIn && authStore.userInfo"
  >
    <div class="profile-box">
      <div class="profile bg-image-circle"
           :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
      ></div>
    </div>
    <div class="info-box">
      <div class="nick">{{ authStore.userInfo.nick }}</div>
      <div class="write-count">{{ authStore.userInfo.countPosts }}</div>
      <div class="redirect-box">
        <div class="redirect-icon-posts-index bg-image-square"
             style="background-image: url('/icons/gallery.png');"
        ></div>
        <div class="redirect-icon-posts-create bg-image-square"
             style="background-image: url('/icons/plus-sign.png');"
             @click="redirectPostCreate"
        ></div>
        <div class="redirect-icon-posts-info bg-image-square"
             style="background-image: url('/icons/person.png');"
        ></div>
      </div>
    </div>
  </div>
  <div>
    <hr>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
}

.redirect-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}


</style>