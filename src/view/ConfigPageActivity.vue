<template>
  <div class="content">
    <div class="search-result">
      <ul class="result">
        <LayoutProduct :product="product"></LayoutProduct>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigPageActivity',
  components: {LayoutProduct: () => import('@/view/components/LayoutProduct.vue')},
  data () {
    return {
      product: {
        // id: '10811',
        // image: 'http://ltsres-us.oss-us-west-1.aliyuncs.com/item/841430dc4749f644453fb5daf141aa8c.png',
        // title: 'CMHD7422B, Platinum HD-TVI Dome Camera 2.1MP',
        // realPrice: 4000,
        // oldPrice: 4500
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-result {
  position: relative;
  ul.result {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
