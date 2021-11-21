// HeyCafe自定义api

import request from '@/utils/request'
import qs from 'qs'
import store from '@/store'

export function login(params) {
  return new Promise((resolve, reject) => {
    request.post('https://test.geekshang.top/api/login',qs.stringify(params)).then(res=>{
      if (res.err === 0) {
        store.commit('SET_TOKEN', 'lzh')
        localStorage.setItem('HeyCafeLoginToken','lzh')
        resolve()
      } else {
        reject(res.msg)
      }
    }).catch(err=>{
      reject(err)
    })
  })
}

export function findTable(customerNum) {
  return request.get('/api/findtable',{
    person: +customerNum
  })
}

// export function getMenu() {
//   return request.get
// }