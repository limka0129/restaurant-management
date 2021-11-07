import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
// import request from '@/utils/request'
import { axios } from '@/utils/request'
import { URLSearchParams } from 'core-js/modules/web.url-search-params'
import qs from 'qs'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      console.log('SET_NAME被调用了')
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // 转换成表单形式数据
        console.log('userinfo: ',userInfo)
        const payLoad = qs.stringify(userInfo)
        console.log('payload: ',payLoad)
        axios.post('https://test.geekshang.top/api/login', payLoad)
        .then(response => {
          console.log(response)
          if (response.err === 0) {
            commit('SET_TOKEN', '123')
            storage.set(ACCESS_TOKEN, '123', 7 * 24 * 60 * 60 * 1000)
            resolve()
          } else {
            reject(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log(response)
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => {
                  return action.action
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId
            })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          // commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      // return new Promise((resolve) => {
      //   logout(state.token).then(() => {
      //     console.log('logout调用成功了')
      //     commit('SET_TOKEN', '')
      //     commit('SET_NAME', '')
      //     commit('SET_ROLES', [])
      //     storage.remove(ACCESS_TOKEN)
      //     resolve()
      //   }).catch((err) => {
      //     console.log('logout fail:', err)
      //   }).finally(() => {
      //   })
      // })
      return new Promise(resolve => {
        console.log('logout调用成功了')
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        resolve()
      })
    }
  }
}

export default user
