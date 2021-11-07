import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['/user/login', '/user/register', '/user/register-result'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
    // 跳转逻辑
    if (store.getters.nickname === '' && !allowList.includes(to.path)) {
      console.log('跳转到登录页')
      next({ path: loginRoutePath })
    }
    // else if (store.getters.nickname !== '' && to.path === loginRoutePath) {
    //   console.log('跳转到默认页')
    //   next({ path: defaultRoutePath })
    // }
    else {
      if (store.getters.roles.length === 0) {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            console.log('GetInfo成功')
            const roles = res.result && res.result.role
            // generate dynamic router
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // VueRouter@3.5.0+ New API
              store.getters.addRouters.forEach(r => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              // const redirect = decodeURIComponent(from.query.redirect || to.path)
              // if (to.path === redirect) {
              //   // set the replace: true so the navigation will not leave a history record
              //   next({ ...to, replace: true })
              // } else {
              //   // 跳转到目的路由
              //   next({ path: redirect })
              // }
            })
          })
          .catch(e => {
            console.log('GetInfo失败',e)
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              // next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      }
      next()
    }
  }
)

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
