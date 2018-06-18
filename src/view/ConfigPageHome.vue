<template>
  <card>
    <p slot="title">配置</p>
    <div class="config-page-wrapper">
      <div class="config-page">
        <LayoutModuleCarousel></LayoutModuleCarousel>
        <div class="image-column">
          <div class="image-column-left">
            <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/17ac161a805d1ebeed66025bfe075eea.png" alt="">
          </div>
          <div class="image-column-right">
            <div class="image-column-right-top">
              <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/17ac161a805d1ebeed66025bfe075eea.png" alt="">
            </div>
            <div class="image-column-right-bottom">
              <img src="https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/17ac161a805d1ebeed66025bfe075eea.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
export default {
  name: 'ConfigPageHome',
  components: {
    LayoutModuleCarousel: () => import('@/view/components/LayoutModuleCarousel'),
    LayoutModuleBanner: () => import('@/view/components/LayoutModuleBanner')
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.image-column{
  height: 350px;
  width: 100%;
  display: flex;
  img{
    width: 100%;
    height: 100%;
  }
  .image-column-left{
    width: 715px;
    margin-right: 12px;
  }
  .image-column-right{
    flex: 1;
    div {
      height: 170px;
    }
  }
  .image-column-right-top{
    margin-bottom: 12px;
  }
}
</style>
