<script setup>

import ButtonComponent from "../../components/button/ButtonComponent.vue";
import InputComponent from "../../components/InputComponent.vue";
import {reactive} from "vue";
import MyStrikeThroughBehindWord from "../../components/decoration/MyStrikeThroughBehindWord.vue";
import useAuthStore from "../../store/auth/useAuthStore.js";
import {useRouter} from "vue-router";


const router = useRouter();
const authStore = useAuthStore();
const loginForm = reactive({
  email: '',
  password: ''
});

const handleSubmit = async () => {
  await authStore.login(loginForm);
  router.replace('/posts');
};
</script>

<template>
  <form @submit.prevent="handleSubmit">

    <InputComponent
      :type="'email'"
      :placeholder="'Email'"
      :readonly="false"
      :required="true"
      v-model="loginForm.email"
    ></InputComponent>

    <InputComponent
      :type="'password'"
      :placeholder="'Password'"
      :readonly="false"
      :required="true"
      v-model="loginForm.password"
    ></InputComponent>
    
    <MyStrikeThroughBehindWord
      :content="'or'"
    ></MyStrikeThroughBehindWord>
    
    <ButtonComponent
      :btnType="'submit'"
      :color="'gray'"
      :size="'middle'"
      :content="'Log In'"
    ></ButtonComponent>
  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>