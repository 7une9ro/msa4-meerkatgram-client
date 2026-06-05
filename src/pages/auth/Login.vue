<script setup>

import ButtonComponent from "../../components/button/ButtonComponent.vue";
import InputComponent from "../../components/input/InputComponent.vue";
import {reactive} from "vue";
import MyStrikeThroughBehindWord from "../../components/decoration/MyStrikeThroughBehindWord.vue";
import useAuthStore from "../../store/auth/useAuthStore.js";
import {useRouter} from "vue-router";
import loginValidator from "../../util/validator/domain/auth/loginValidator.js";
import useMyErrorStore from "../../store/error/useMyErrorStore.js";


const router = useRouter();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();
const loginForm = reactive({
  email: '',
  password: ''
});

const handleSubmit = async () => {
  // 유효성 검사
  const validatedEmail = loginValidator.email(loginForm.email);
  const validatedPassword = loginValidator.password(loginForm.password);

  // 유효성 검사 (성공 패턴)
  if (!validatedEmail && !validatedPassword) {
    try {
      await authStore.login(loginForm);
      router.replace('/posts');
    } catch (error) {
      if (error.response) {
        if (error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  } 
  // 유효성 검사 (실패 패턴)
  else {
    alert(`${validatedEmail}\n${validatedPassword}`);
  }
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