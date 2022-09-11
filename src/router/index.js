import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 懒加载的chunk默认的名字是模块的路径
// webpack魔法注释：/* WebpackChunkName:"新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: 'videos',
        component: () => import(/* WebpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: 'qa',
        component: () => import(/* WebpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: 'profile',
        component: () => import('@/views/My')
      }
    ]
  },
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
