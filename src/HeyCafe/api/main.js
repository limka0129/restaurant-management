// 各个职位通用的接口

import request from './request'
import qs from 'qs'

export function login(params) {
  return request.post('/api/login', qs.stringify(params))
}

export function getAllTableStatus() {
  return request.get('/api/showAllTable')
}

export function getTableStatusById(tableId) {
  return request.post('/api/getTable', qs.stringify({ table_id: tableId }))
}

// 根据token获取自己的个人信息
export function getProfile() {
  return request.post('/api/find_by_token')
}

// 修改个人信息，支持修改name,gender(phoneNumber,userName,password)
export function editProfile(staffPlainObj) {
  return request.post('/api/FillInfo',qs.stringify(staffPlainObj))
}
