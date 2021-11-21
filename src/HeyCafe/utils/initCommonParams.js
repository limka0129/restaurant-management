import store from '@/store'
import notification from 'ant-design-vue/lib/notification'

export function initCommonParams() {
  // request login userInfo
  store
    .dispatch('GetInfo')
    .then(() => {
      console.log('GetInfo成功')
    })
    .catch(e => {
      console.log('GetInfo失败',e)
      notification.error({
        message: '错误',
        description: '请求用户信息失败，请重试'
      })
      // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
      store.dispatch('Logout').then(() => {
      })
    })
}