<template>
  <div class="table-container">
    <a-popover :title="`No. ${deskInfo.id}`" trigger="click">
      <template #content>
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
        <a-button v-if="deskInfo.status === -1" @click="deskInfo.status++">{{ $t('hc.sit') }}</a-button>
        <a-button v-if="deskInfo.status === 0" @click="deskInfo.status++">{{ $t('hc.order') }}</a-button>
        <a-button v-if="deskInfo.status === 1" @click="deskInfo.status++">{{ $t('hc.serve') }}</a-button>
        <a-button v-if="deskInfo.status === 2" @click="deskInfo.status++">{{ $t('hc.pay') }}</a-button>
        <a-button v-if="deskInfo.status === 3" @click="deskInfo.status = -1">{{ $t('hc.clean') }}</a-button>
      </template>
      <a-button class="desk" size="large" :class="mapClass(deskInfo.status)">{{ deskInfo.id }}</a-button>
      <a-button v-for="n in deskInfo.seats" class="chair" :class="`No${n}`" shape="circle" :key="n"></a-button>
    </a-popover>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['deskInfo'],
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
    }
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
