<template>
  <div class="module-content module-intro">
    <!-- <p class="navBarSave">Save up to 50% on selected items</p>
    <p class="navBarDate">
      <span class="navBarDate1">Good Through:</span>
      <span>05/04/18</span>
      <span>-</span>
      <span>05/31/18</span>
    </p> -->
    <div class="operate-list">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit" @click="showEditDialog">编辑</Button>
        <Button type="primary" icon="trash-a" @click="$emit('delete')">删除</Button>
        <Button type="primary" icon="arrow-up-a" @click="$emit('up')">上移</Button>
        <Button type="primary" icon="arrow-down-a" @click="$emit('down')">下移</Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutModuleIntro',
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.module-intro{
  width: 100%;
  background-color: #D82929;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  line-height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navBarSave {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .navBarDate {
    color: #fff;
    font-size: 18px;
  }
}
</style>
