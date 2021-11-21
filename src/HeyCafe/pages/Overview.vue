<template>
  <div class="cafe-overview">
    <a-carousel arrows>
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; zindex: 1">
          <LeftCircleOutlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div class="table-status">
        <Table></Table>
      </div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </a-carousel>
  </div>
</template>

<script>
import Table from '@/HeyCafe/components/Table'
import { LeftCircleOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Overview',
  data() {
    return {
      desks: [{
        orderId: 0,
        id: 2,
        seats: 4,
        page: 1,
        status: 0,
        dishes: null,
        dishMap: null,
        waiterId: 1,
        cusId: 0
      }]
    }
  },
  components: {
    Table,
    LeftCircleOutlined
  }
}
</script>

<style scoped lang="less">
.table-status {
  height: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  //box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
