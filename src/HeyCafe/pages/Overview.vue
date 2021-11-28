<template>
  <div class="cafe-overview">
    <div v-if="$route.path.includes('/host/')" class="workbench">
      <span>{{ $t('hc.customerNumber') }}：&nbsp;</span>
      <a-input-number id="inputNumber" v-model="customerNum" :min="1" :max="8" />
      <a-button @click="showFindTableConfirm = true">{{ $t('hc.searchForTable') }}</a-button>
      <a-modal v-model="showFindTableConfirm" :title="$t('hc.searchForTable')" @ok="handleFindTable"
               :ok-text="$t('hc.confirm')" :cancel-text="$t('hc.cancel')">
        <p>{{ $t('hc.sitForMeal') }}</p>
      </a-modal>
    </div>
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
        <Table v-for="item of tables" v-if="item.page===1" :key="item.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
      <div>
        <Table v-for="item of tables" v-if="item.page===2" :key="item.id" :desk-info.sync="item"
               @remove-table="handleRemoveTable($event)"></Table>
      </div>
    </a-carousel>
  </div>
</template>

<script>
import Table from '@/HeyCafe/components/Table'
import { sitForMeal } from '@/HeyCafe/api/host'
import { getAllTableStatus } from '@/HeyCafe/api/main'

export default {
  name: 'Overview',
  data() {
    return {
      tables: [],
      customerNum: 1,
      showFindTableConfirm: false
    }
  },
  mounted() {
    this.updateTableStatus()
  },
  methods: {
    handleRemoveTable(id) {
      this.tables = this.tables.filter((item) => {
        return item.id !== id
      })
    },
    handleFindTable() {
      sitForMeal(this.customerNum).then(res=>{
        this.showFindTableConfirm = false
        this.$message.success(this.$t('hc.sitSuccess').replace(/\{\{table_number\}\}/,res?.data))
        this.updateTableStatus()
      })
    },
    updateTableStatus() {
      getAllTableStatus().then(res=>{
        console.log('allTableStatus:',res?.data)
        res?.data && (this.tables = res.data)
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
.workbench {
  margin-bottom: 10px;
}

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
