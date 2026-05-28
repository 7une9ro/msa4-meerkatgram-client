import PostIndex from "../pages/posts/PostIndex.vue";
import {createRouter, createWebHistory} from "vue-router";
import Login from "../pages/auth/Login.vue";

const routes = [
  {
    path: '/',
    redirect: '/posts' // component: PostIndex
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex
  },
  {
    path: '/login',
    component: Login
  }
  // 에러 관련
  // [TODO START]:  (2026-05-22, JunHyeon)
  // {
  //   path: '/errors',
  //   component: MyError
  // }
  // [TODO END]:  (2026-05-22, JunHyeon)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;