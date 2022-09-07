import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 声明一个变量，发到vuex
// vuex声明的变量
// -state里声明
// -取：$store.state.属性名

// vuex修改数据
// -自产自销
// -规范：函数命名采用大驼峰
// -mutations:函数
// -mutations里的函数的参数
// -第一个参数   state：数据
// -第二个参数   payload:载荷，触发mutation的参数

// 触发mutations里面的方法
// -this.$store.commit('mutation方法名字',参数)

// getters  ---->相当于computed计算属性
// getters 的函数，第一个参数是state
export default new Vuex.Store({
  state: {
    count: 9
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  },
  actions: {},
  modules: {}
})
