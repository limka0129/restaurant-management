// 创建 axios 实例
import axios from 'axios'
import { message } from 'ant-design-vue'

const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  timeout: 6000,// 请求超时时间
  withCredentials: true
})

request.interceptors.request.use(config=>{
  if(localStorage.getItem('HeyCafeSessionId')) {
    config.headers = {
      'Token': localStorage.getItem('HeyCafeSessionId'),
      ...config.headers
    }
    return config
  }else {
    config.headers = {
      ...config.headers
    }
    return config
  }
})

request.interceptors.response.use(response=>{
  return response.data
},error => {
  message.error(`接口请求错误：${error}`)
})

export default request
