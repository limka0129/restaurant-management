<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://github.com/sirlddf" target="_blank">林德福</a>
      <a href="https://github.com/LuoWenjun-NKU" target="_blank">罗文浚</a>
      <a href="https://github.com/18630937603" target="_blank">刘志昊</a>
      <a href="https://geekshang.top" target="_blank">商家祎</a>
      <a href="https://github.com/atu018" target="_blank">涂景翔</a>
      <a href="https://github.com/lixiang0508" target="_blank">张理想</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/18630937603/restaurant-management" target="_blank">项目前端仓库地址</a>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a href="https://github.com/lixiang0508/se-restaurant1" target="_blank">项目后端仓库地址</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
