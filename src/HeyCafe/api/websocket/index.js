let connection;

const callbacks = {
  host: null,
  waiter: null,
  cook: null,
  busboy: null,
  manager: null
}

export function registerCallback(role, callback) {
  callbacks[role] = callback
}

export function removeAllCallbacks(role) {
  callbacks[role] = null
}

export function establishWebsocketConnection() {
  if (!connection) {
    connection = new WebSocket(`ws://8.140.159.135:8085/webSocket`)
    connection.onopen = () => {
      console.log('ws连接建立成功！')
    }
    connection.onmessage = (msg) => {
      try {
        const response = JSON.parse(msg.data)
        if (typeof response !== 'object' || +response.err !== 0) {
          throw new Error('wrong json schema')
        } else {
          console.log('收到服务器ws消息：', response)
          const callback = callbacks[response?.to]
          if (callback) {
            callback(response.data)
          } else {
            console.log('角色' + response.to + '还未注册回调')
          }
        }
      } catch (e) {
        console.error('解析ws响应失败！', msg, e)
      }
    }
    connection.onclose = () => {
      console.log('ws连接已关闭')
    }
  }
}
