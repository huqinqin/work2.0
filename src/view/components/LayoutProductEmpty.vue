<template>
  <div class="empty-product">
    <Icon type="ios-plus-empty" :size="200" color="#ccc"/>
  </div>
</template>
<script>
export default {
  name: 'LayoutProductEmpty',
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.empty-product {
  text-align: center;
  width: 290px;
  height: 400px;
  padding: 10px;
  .ivu-icon {
    line-height: 380px;
    border-radius: 20px;
    width: 100%;
    border: 1px dotted #ccc;
  }
}
</style>
