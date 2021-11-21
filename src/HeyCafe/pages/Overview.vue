<template>
  <div class="cafe-overview">
    <a-carousel :arrows="true" class="table-status">
      <div
        slot="prevArrow"
        slot-scope="props"
        class="custom-slick-arrow"
        style="left: -40px;z-index: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: -40px">
        <a-icon type="right-circle" />
      </div>
      <div class="table-page">
        <Table v-for="item of desks" v-if="item.page===1" :key="item.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
      <div>
        <Table v-for="item of desks" v-if="item.page===2" :key="item.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
    </a-carousel>
  </div>
</template>

<script>
import Table from '@/HeyCafe/components/Table'

export default {
  name: 'Overview',
  data() {
    return {
      desks: [
        {
          orderId: 0,
          id: 1,
          seats: 4,
          page: 1,
          status: 0,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 2,
          seats: 5,
          page: 1,
          status: 1,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 3,
          seats: 7,
          page: 1,
          status: 2,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 4,
          seats: 8,
          page: 1,
          status: 3,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 5,
          seats: 4,
          page: 2,
          status: 0,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 6,
          seats: 5,
          page: 2,
          status: 1,
          waiterId: 1,
          cusId: 0
        },
        {
          orderId: 0,
          id: 7,
          seats: 7,
          page: 2,
          status: 2,
          waiterId: 1,
          cusId: 0
        }
      ]
    }
  },
  methods: {
    handleRemoveTable(id) {
      this.desks = this.desks.filter((item) => {
        return item.id !== id
      })
    }
  },
  components: {
    Table
  }
}
</script>

<style scoped>
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  opacity: 0.5;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.7;
}

</style>

<style scoped lang="less">
.table-status {
  height: 500px;
  width: 100%;
  background: rgba(204, 204, 204, .5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 0 60px;
}

.table-page {
  height: 500px;
  width: 100%;
}
</style>
