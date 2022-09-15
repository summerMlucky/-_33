import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 封装本地存储，vuex-persistedstate

// vuex-persistedstate---->持久化

// 1.下载
// -yarn add  vuex-persistedstate
// 2.引入
// -import createPersistedState from 'vuex-persistedstate'
// 3.调用
// - plugins: [createPersistedState({})]

// 配置项
// key:默认值是vuex
// storage:存储的方式，默认值是本地存储
// reducers:指定持久化哪些数据。函数，return一个对象，对象就作为存储的value
// -参数state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,//设置token存储到sessionStorage
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     *
     * @param {*} state
     * @param {*} channels 删除或者添加后的最新的channels
     */
    SET_MY_CHANNEL(state, channels) {
      state.myChannels = channels
    },
    /**
     *
     * @param {*} histories 删除或者添加以后的新的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
