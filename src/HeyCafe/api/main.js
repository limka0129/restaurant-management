// 接口

import request from './request'
import qs from 'qs'
import store from '@/store'

export function login(params) {
  return request.post('/api/login', qs.stringify(params)).then(res => {
    if (res.err === 0) {
      store.commit('SET_TOKEN', res.msg)
      localStorage.setItem('HeyCafeSessionId', res.msg)
    }
  }).catch(err=>{
    console.log(err)
  })

}

export function logout() {
  return request.post('/api/logout')
}

export function getAllTableStatus() {
  return request.get('/api/showAllTable')
}
