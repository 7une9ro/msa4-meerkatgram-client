<script setup>

import {reactive, ref} from "vue";
import useFileStore from "../../store/file/useFileStore.js";
import usePostCreateStore from "../../store/post/usePostCreateStore.js";
import {useRoute, useRouter} from "vue-router";
import postCreateValidator from "../../util/validator/domain/post/postCreateValidator.js";
import ButtonComponent from "../../components/button/ButtonComponent.vue";
import usePostDetailStore from "../../store/post/usePostDetailStore.js";

const router = useRouter();
const fileStore = useFileStore();
const postCreateStore = usePostCreateStore();
const postDetailStore = usePostDetailStore();

const selectedFile = ref(null);
const preview = ref(null);
const createPostData = reactive({
  content: '',
  image: '',
});

const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
    // postCreateValidator.content(createPostData.content),
    postCreateValidator.image(createPostData.image),
  ];

  const errorList = validationList.filter(val => val);

  if (errorList.length > 0) {
    alert(errorList.join('\n'));
    return;
  }

  try {
    const id = await postCreateStore.create(createPostData);

    alert("게시물이 성공적으로 작성되었습니다.");

    router.replace(`/posts/${id}`)
  } catch (error) {
    const data = error.response.data;
    alert(data.data);
    router.replace('/error');
  }
};


const handleChangeImage = async (e) => {
  const file = e.target.files[0];

  if (file) {
    if (preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제
      URL.revokeObjectURL(preview.value);
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadFilePost(file);

    if (fileUri) {
      createPostData.image = fileUri;
      selectedFile.value = file;

      // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
      preview.value = URL.createObjectURL(file);
    }
  }
};

</script>

<template>
  <form @submit.prevent="handleSubmit"
  >
    <div class="post-box">
      <div class="image-box">
        <input type="file"
               @change="handleChangeImage">
        <div class="preview"
             v-if="preview"
             :style="{backgroundImage: `url(${preview})`}"
        ></div>
      </div>
      <textarea
        class="content"
        v-model="createPostData.content"
        placeholder="여기에 입력하세요..."
      ></textarea>
    </div>
    <ButtonComponent
      :btnType="'submit'"
      :color="'black'"
      :size="'middle'"
      :content="'create'"
    ></ButtonComponent>
  </form>
</template>

<style scoped>
form {
  padding: 20px;
  height: 600px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.post-box {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.image-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  min-width: 100px;
  max-width: 100% !important;
  resize: block;
  overflow-y: auto;

  /* CSS 범위 내에서 useTextareaAutosize가 계산을 처리 */
  min-height: 250px;
  max-height: 100% !important;
}

.preview {
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid gray;
}
</style>