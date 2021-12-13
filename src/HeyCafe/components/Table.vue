<template>
  <div class="table-container">
    <a-popover v-model="popoverVisible" :title="`No. ${deskInfo.id}`" trigger="click">
      <template slot="content">
        <p>{{ $t('hc.orderID') }}：{{ deskInfo.orderId }}</p>
        <p>{{ $t('hc.currentWaiter') }}：{{ deskInfo.waiterId }}</p>
        <div>
          <span>{{ $t('hc.tableStatus') }}：</span>
          <span v-if="deskInfo.status===-1" :class="mapClass(deskInfo.status)">{{ $t('hc.noCustomers') }}</span>
          <span v-if="deskInfo.status===0" :class="mapClass(deskInfo.status)">{{ $t('hc.needWaiter') }}</span>
          <span v-else-if="deskInfo.status===1" :class="mapClass(deskInfo.status)">{{ $t('hc.waitingForMeal') }}</span>
          <span v-else-if="deskInfo.status===2" :class="mapClass(deskInfo.status)">{{ $t('hc.eating') }}</span>
          <span v-else-if="deskInfo.status===3" :class="mapClass(deskInfo.status)">{{ $t('hc.needClean') }}</span>
        </div>
        <a-button @click="deskInfo.seats < 8 && deskInfo.seats++">{{ $t('hc.addChair') }}</a-button>
        <a-button @click="deskInfo.seats > 0 && deskInfo.seats--">{{ $t('hc.removeChair') }}</a-button>
        <a-button @click="$emit('remove-table',deskInfo.id)">{{ $t('hc.removeTable') }}</a-button>
        <!-- 就座按钮 -->
        <a-button v-show="deskInfo.status === -1" @click="handleSit">{{ $t('hc.sit') }}</a-button>
        <!-- 点单按钮 -->
        <a-button v-show="deskInfo.status === 0" @click="popoverVisible = false;isMenuShow = true">
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
        <a-button v-show="deskInfo.status === 1" @click="deskInfo.status++">{{ $t('hc.serve') }}</a-button>
        <!-- 结账按钮 -->
        <a-button v-show="deskInfo.status === 2" @click="handlePayOrder">{{ $t('hc.pay') }}</a-button>
        <a-button v-show="deskInfo.status === 3" @click="handleCleanTable">{{ $t('hc.clean') }}</a-button>
      </template>
      <!-- 餐桌 -->
      <a-button class="desk" size="large" :class="mapClass(deskInfo.status)">{{ deskInfo.id }}</a-button>
      <!-- 椅子 -->
      <a-button v-for="n in deskInfo.seats" class="chair" :class="`No${n}`" shape="circle" :key="n"></a-button>
    </a-popover>
  </div>
</template>

<script>
import Dishes from '@/HeyCafe/components/Dishes'
import { createOrder } from '@/HeyCafe/api/order'
import { sit } from '@/HeyCafe/api/host'
import { cleanTable } from '@/HeyCafe/api/busboy'
import { getTableStatusById } from '@/HeyCafe/api/main'
import { payOrder } from '@/HeyCafe/api/waiter'

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
      getTableStatusById(this.deskInfo.id).then(res => {
        if (+res?.err === 0) {
          Object.assign(this.deskInfo, res.data)
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
      createOrder(this.deskInfo.cusId, this.deskInfo.id, this.currentOrders).then(res => {
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
      sit(this.deskInfo.id).then(res => {
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
    handlePayOrder() {
      payOrder(this.deskInfo.orderId).then(res=>{
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
      cleanTable(this.deskInfo.id).then(res => {
        if (+res?.err === 0) {
          this.$message.success(res?.msg)
          this.deskInfo.status = -1
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
