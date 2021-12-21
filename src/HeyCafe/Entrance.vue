<template>
<!-- 这是BasicLayout的一个快捷方式，为了把修改的代码都写在HeyCafe文件夹下而存在的，请不要写任何html结构 -->
</template>

<script>

import {establishWebsocketConnection, registerCallback} from "@/HeyCafe/api/websocket";

export default {
  name: "Entrance",
  mounted() {
    establishWebsocketConnection()
    registerCallback('cook',(data)=>{
      if(localStorage.getItem('CurrentUserRole')==='cook') {
        this.$message.warning(`厨师你好，顾客又下新的订单啦`)
      }
    })
    registerCallback('waiter',(data)=>{
      if(localStorage.getItem('CurrentUserRole')==='waiter') {
        this.$message.warning(`服务生你好，后厨的菜品${data.orderproductName}做好啦，请送到${tableId}号桌`)
      }
    })
  },
}
</script>
