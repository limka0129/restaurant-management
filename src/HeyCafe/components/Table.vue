<template>
  <div class="table-container">
    <a-popover v-model="popoverVisible" :title="`No. ${deskInfo.table.id}`" trigger="click">
      <template slot="content">
        <p>{{ deskInfo.table.orderId === 0 ? '当前没有订单' : `${$t('hc.orderID')}：${deskInfo.table.orderId}` }}</p>
        <p>{{ $t('hc.currentWaiter') }}：{{ deskInfo.table.waiterId }}</p>
        <!-- 餐桌状态 -->
        <p>
          <span>{{ $t('hc.tableStatus') }}：</span>
          <span v-if="deskInfo.table.status===-1" :class="mapClass(deskInfo.table.status)">{{ $t('hc.noCustomers') }}</span>
          <span v-if="deskInfo.table.status===0" :class="mapClass(deskInfo.table.status)">{{ $t('hc.needWaiter') }}</span>
          <span v-else-if="deskInfo.table.status===1" :class="mapClass(deskInfo.table.status)">{{ $t('hc.waitingForMeal') }}</span>
          <span v-else-if="deskInfo.table.status===2" :class="mapClass(deskInfo.table.status)">{{ $t('hc.eating') }}</span>
          <span v-else-if="deskInfo.table.status===3" :class="mapClass(deskInfo.table.status)">{{ $t('hc.needClean') }}</span>
        </p>
        <!-- 展示这桌顾客已点菜品 -->
        <p v-show="deskInfo.table.status===1 || deskInfo.table.status===2">
          <span>当前已点菜品：</span>
          <span v-for="item in deskInfo.list" :key="item.dishId">{{ item.name }}&nbsp;*{{ item.count }}&nbsp;&nbsp;&nbsp;</span>
        </p>
        <!-- 增加椅子按钮 -->
        <a-button @click="deskInfo.table.seats < 8 && deskInfo.table.seats++">{{ $t('hc.addChair') }}</a-button>
        <!-- 减少椅子按钮 -->
        <a-button @click="deskInfo.table.seats > 0 && deskInfo.table.seats--">{{ $t('hc.removeChair') }}</a-button>
        <!-- 删除餐桌按钮 -->
        <a-button @click="$emit('remove-table',deskInfo.table.id)">{{ $t('hc.removeTable') }}</a-button>
        <!-- 就座按钮 -->
        <a-button v-show="deskInfo.table.status === -1" @click="handleSit">{{ $t('hc.sit') }}</a-button>
        <!-- 点单按钮 -->
        <a-button v-show="deskInfo.table.status === 0" @click="popoverVisible = false;isMenuShow = true">
          {{ $t('hc.order') }}
        </a-button>
        <!-- 菜谱弹框 -->
        <a-modal
          :title="$t('hc.menu')"
          :visible="isMenuShow"
          @cancel="isMenuShow = false"
          @ok="handleCreateOrder"
          :bodyStyle="{
            height: '50vh',
            overflow: 'scroll'
          }"
        >
          <Dishes :allow-order="true" @updateCurrentOrders="currentOrders = $event"></Dishes>
        </a-modal>
        <!-- 上菜按钮 -->
        <a-button v-show="deskInfo.table.status === 1" @click="handleServeAllDishes">{{ $t('hc.serve') }}</a-button>
        <!-- 结账按钮 -->
        <a-button v-show="deskInfo.table.status === 2" @click="handlePayOrder">{{ $t('hc.pay') }}</a-button>
        <a-button v-show="deskInfo.table.status === 3" @click="handleCleanTable">{{ $t('hc.clean') }}</a-button>
      </template>
      <!-- 餐桌 -->
      <a-button class="desk" size="large" :class="mapClass(deskInfo.table.status)">{{ deskInfo.table.id }}</a-button>
      <!-- 椅子 -->
      <a-button v-for="n in deskInfo.table.seats" class="chair" :class="`No${n}`" shape="circle" :key="n"></a-button>
    </a-popover>
  </div>
</template>

<script>
import Dishes from '@/HeyCafe/components/Dishes'
import { createOrder } from '@/HeyCafe/api/order'
import { sit } from '@/HeyCafe/api/host'
import { cleanTable } from '@/HeyCafe/api/busboy'
import { getTableStatusById } from '@/HeyCafe/api/main'
import { payOrder, serveAllDishes } from '@/HeyCafe/api/waiter'

export default {
  name: 'Table',
  props: ['deskInfo'],
  data() {
    return {
      isMenuShow: false,
      popoverVisible: false,
      currentOrders: []
    }
  },
  methods: {
    mapClass(tableStatus) {
      switch (tableStatus) {
        case -1:
          return ''
        case 0:
          return 'error'
        case 1:
          return 'warning'
        case 2:
          return 'ok'
        case 3:
          return 'error'
      }
    },
    updateMyself() {
      getTableStatusById(this.deskInfo.table.id).then(res => {
        if (+res?.err === 0) {
          this.deskInfo.list = res.data.list
          this.deskInfo.table = res.data.table
          // Object.assign(this.deskInfo.table, res.data.table)
        } else {
          this.$message.error('错误：getTable接口返回err非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('更新餐桌数据失败')
      })
    },
    handleCreateOrder() {
      this.isMenuShow = false
      createOrder(this.deskInfo.table.cusId, this.deskInfo.table.id, this.currentOrders).then(res => {
        if (+res?.err === 0) {
          this.$message.success('订单创建成功！')
          this.updateMyself()
        } else {
          throw new Error('createOrder接口返回err非0')
        }
      }).catch(err => {
        this.$message.error('订单创建失败！')
        console.error('createOrder接口出错：', err)
      })
    },
    handleSit() {
      sit(this.deskInfo.table.id).then(res => {
        if (+res?.err === 0) {
          this.$message.success('就座成功！')
          this.updateMyself()
        } else {
          throw new Error('sit接口返回err非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('就座失败！')
      })
    },
    handleServeAllDishes() {
      serveAllDishes(this.deskInfo.table.orderId).then(res => {
        if (+res?.err === 0) {
          this.$message.success('上菜成功！')
          this.updateMyself()
        } else {
          throw new Error('serveDish接口返回err非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('上菜失败！')
      })
    },
    handlePayOrder() {
      payOrder(this.deskInfo.table.orderId).then(res=>{
        if(+res?.err===0) {
          this.$message.success('结账成功！')
          this.updateMyself()
        }else {
          throw new Error('payOrder接口返回err非0')
        }
      }).catch(err=>{
        console.error(err)
        this.$message.error('结账失败！')
      })
    },
    handleCleanTable() {
      cleanTable(this.deskInfo.table.id).then(res => {
        if (+res?.err === 0) {
          this.$message.success(res?.msg)
          this.deskInfo.table.status = -1
        } else {
          throw new Error('cleanTable接口返回err非0')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('清扫失败！')
      })
    }
  },
  components: {
    Dishes
  }
}
</script>

<style scoped lang="less">

.table-container {
  margin: 20px;
  position: relative;
  padding: 20px;
  width: 90px;
  height: 90px;
  display: inline-block;

  .desk {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50px;
    height: 50px;
    font-size: 25px;
  }

  .chair {
    min-width: 20px !important;
    width: 20px;
    height: 20px;
    position: absolute;

    &.No1 {
      top: 22.5px;
      left: 0;
    }

    &.No2 {
      top: 45px;
      left: 0;
    }

    &.No3 {
      top: 22.5px;
      left: 70px;
    }

    &.No4 {
      top: 45px;
      left: 70px;
    }

    &.No5 {
      top: 0;
      left: 22.5px;
    }

    &.No6 {
      top: 0;
      left: 45px;
    }

    &.No7 {
      top: 70px;
      left: 22.5px;
    }

    &.No8 {
      top: 70px;
      left: 45px;
    }
  }
}

.warning {
  color: #d9d903;
}

.ok {
  color: #029b02;
}

.error {
  color: red;
}

</style>
