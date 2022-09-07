import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // component: Login
    // 路由懒加载
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})
export default router
