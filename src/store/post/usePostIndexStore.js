import {defineStore} from "pinia";
import {computed, ref} from "vue";
import myAxios from "../../api/myAxios.js";
import useMyErrorStore from "../error/useMyErrorStore.js";

const usePostIndexStore = defineStore(
  'postIndex', () => {
    // 1. State (ref) - origin
    const items = ref([]);
    const isLastPage = ref(false);
    const currentPage = ref(0);

    // 2. Getters (computed) - origin 값을 가져와서 쓰는 용도 (이로 인해 원본 값 변경하지 않음) 
    const getNextPageNumber = computed(() => currentPage.value + 1);

    // 3. Actions (function)
    const clearPostIndex = () => {
      items.value = [];
      isLastPage.value = false;
      currentPage.value = 0;
    }
    
    const getPostPagination = async (page = 1) => {

      // 마지막 페이지가 아닐 경우만 실행
      if (!isLastPage.value) {
        try {
          const url = '/api/posts';
          // params 변수명은 무조건 [고정] because: axios의 params 속성이 있음 여기에 전달해줘야 해서
          const params = {
            page
          };

          const response = await myAxios.get(url, {params});
          const data = response.data.data;
          isLastPage.value = data.lastPage;
          items.value.push(...data.posts);

          currentPage.value++;
        } catch (error) {
          // [TODO START]: 추후 배포 시 삭제 (2026-05-22, JunHyeon)
          console.error(error);
          // [TODO END]: 추후 배포 시 삭제 (2026-05-22, JunHyeon)
          useMyErrorStore().setErrorInfo(error); // 단발성 메서드 호출
        }
      }
    }
    return {
      // state
      items,
      isLastPage,
      
      // getters
      getNextPageNumber,
      
      // actions
      getPostPagination,
      clearPostIndex
    }
  }
);

export default usePostIndexStore;
