// 自定义api

import request from '@/utils/request'

export function findTable(customerNum) {
  return request.get('/api/findtable',{
    person: +customerNum
  })
}

// export function getMenu() {
//   return request.get
// }