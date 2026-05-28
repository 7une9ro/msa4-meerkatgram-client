<script setup>
import ButtonComponent from "../../components/button/ButtonComponent.vue";
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import usePostIndexStore from "../../store/post/usePostIndexStore.js";
// import useMyErrorStore from "../../store/error/useMyErrorStore.js";
// import {useRouter} from "vue-router";

// [TODO START]: store로 이관 (2026-05-22, JunHyeon)
// const posts = ref([])
// const isLastPage = ref(false);
// let currentPage = 1;
//
// // 함수 getPostPagination는 비동기 처리로써 store 쪽에 있어야함 추후에 pinia의 store에 두도록 변경해야함
// // 이유는 나중에 알아보도록
// const getPostPagination = async (page = 1) => {
//   // 마지막 페이지가 아닐 경우만 실행
//   if (!isLastPage.value) {
//     try {
//       const url = '/api/posts';
//       // params 변수명은 무조건 [고정] because: axios의 params 속성이 있음 여기에 전달해줘야 해서
//       const params = {
//         page
//       };
//  
//       const response = await myAxios.get(url, {params});
//       const data = response.data.data;
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);
//
//       currentPage++;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// } 
// [TODO END]: store로 이관 (2026-05-22, JunHyeon)

// [TODO START]: 추후 삭제 (2026-05-22, JunHyeon)
// const myErrorStore = useMyErrorStore();
// const router = useRouter();
// [TODO END]: 추후 삭제 (2026-05-22, JunHyeon)

// [TODO START]: 추후 삭제 (2026-05-22, JunHyeon)
// const paginationProcess = async (page = 1) => {
//   try {
//     await postIndexStore.getPostPagination(page);
//   } catch (error) {
//     myErrorStore.setErrorInfo(error);
//     // [TODO START]: 추후 삭제 (2026-05-22, JunHyeon)
//     // router.replace('/errors');
//     // [TODO END]: 추후 삭제 (2026-05-22, JunHyeon)
//   }
// }
// [TODO END]: 추후 삭제 (2026-05-22, JunHyeon)

const postIndexStore = usePostIndexStore();

const getNextPage = async () => {
  await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
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