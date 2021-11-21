<template>
  <div class="table-container">
    <a-popover title="Title" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-button class="desk" size="large">19</a-button>
      <a-button class="chair No1" shape="circle"></a-button>
    </a-popover>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['deskInfo']
}
</script>

<style scoped lang="less">
.table-container {
  position: relative;
  padding: 20px;
  width: 90px;
  height: 90px;

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


  }
}


</style>
