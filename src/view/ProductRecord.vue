<template>
  <Card>
    <Timeline>
        <TimelineItem>
          保存商品
          <a href="">HTC</a>
          <span class="pull-right">admin于2018-09-11 23:09:01操作</span>
        </TimelineItem>
        <TimelineItem>
          上架商品<a href="">HTC</a>
          <span class="pull-right">admin于2018-09-11 23:09:01操作</span>
        </TimelineItem>
        <TimelineItem>
          下架商品<a href="">HTC</a>
          <span class="pull-right">admin于2018-09-11 23:09:01操作</span>
        </TimelineItem>
    </Timeline>
  </Card>
</template>
<script>
export default {
  name: 'ProductRecord',
  data () {
    return {
    }
  }
}
</script>
<style lang="css" scoped>
.pull-right{
  float: right;
}
</style>
