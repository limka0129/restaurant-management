// 各个职位通用的接口

import request from './request'
import qs from 'qs'
import vm from '@/main.js'

export function login(params) {
  return request.post('/api/login', qs.stringify(params)).then((res) => {
    establishWebsocketConnection()
    return res
  })
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
export function editProfile(staffId, profile) {
  return request.post('/api/Fillinfo')
}

export function establishWebsocketConnection() {
  let connection = new WebSocket(`ws://8.140.159.135:8085/webSocket`)
  connection.onopen = () => {
    console.log('ws连接建立成功！')
  }
  connection.onmessage = (msg) => {
    console.log('收到服务器的ws消息：',msg)
  }
  connection.onclose = () => {
    console.log('ws连接已关闭')
  }
  vm.$websocket = connection
}
