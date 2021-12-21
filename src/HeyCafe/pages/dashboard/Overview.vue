<template>
  <div class="cafe-overview">
    <!-- 迎宾员专属功能 -->
    <div class="workbench">
      <span>{{ $t('hc.customerNumber') }}：&nbsp;</span>
      <a-input-number id="inputNumber" v-model="customerNum" :min="1" :max="8" />
      <a-button @click="handleFindTable">{{ $t('hc.searchForTable') }}</a-button>
    </div>
    <!-- 餐厅总览 -->
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
      <!-- 第一页 -->
      <div class="table-page">
        <Table v-for="item of tables" v-if="item.table.page===1" :key="item.table.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
      <!-- 第二页 -->
      <div class="table-page">
        <Table v-for="item of tables" v-if="item.table.page===2" :key="item.table.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
    </a-carousel>
  </div>
</template>

<script>
import Table from '@/HeyCafe/components/Table'
import { getTableRecommend } from '@/HeyCafe/api/host'
import { getAllTableStatus } from '@/HeyCafe/api/main'

export default {
  name: 'Overview',
  data() {
    return {
      tables: [],
      customerNum: 1,
    }
  },
  mounted() {
    this.updateAllTableStatus()
  },
  computed: {
    showWaiterOnlyWorkbench() {
      return localStorage.getItem('CurrentUserRole') === 'waiter'
    }
  },
  methods: {
    handleRemoveTable(id) {
      this.tables = this.tables.filter((item) => {
        return item.table.id !== id
      })
    },
    handleFindTable() {
      getTableRecommend(this.customerNum).then(res=>{
        if(+res?.err === 0) {
          this.$message.success(this.$t('hc.tableRecommend').replace(/\{\{table_number\}\}/,res?.data))
        }else {
          throw new Error('findtable接口返回err非0')
        }
      }).catch(e=>{
        console.error(e)
        this.$message.error('当前没有可用的餐桌！')
      })
    },
    updateAllTableStatus() {
      getAllTableStatus().then(res=>{
        console.log('showAllTable接口返回信息：',res?.data)
        res?.data && (this.tables = res.data)
      })
    },
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
.workbench {
  margin-bottom: 10px;
}

.table-status {
  height: 500px;
  width: 100%;
  min-width: 650px;
  background: rgba(204, 204, 204, .5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 0 60px;
}

.table-page {
  height: 500px;
  width: 100%;
}
</style>
