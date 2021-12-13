// 接口

import request from './request'
import qs from 'qs'

export function login(params) {
  return request.post('/api/login', qs.stringify(params))
}

export function logout() {
  return request.post('/api/logout')
}

export function getAllTableStatus() {
  return request.get('/api/showAllTable')
}

export function getTableStatusById(tableId) {
  return request.post('/api/getTable', qs.stringify({ table_id: tableId }))
}
