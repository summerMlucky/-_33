import axios from 'axios'
import store from '@/store/index.js'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
// const request = axios.create() 克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器：请求做些事情
// config 是每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: {
        tokenObj: { token }
      }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
