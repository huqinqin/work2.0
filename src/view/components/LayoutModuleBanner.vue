<template>
  <div class="module-content">
    <div class="banner" v-if="isExist">
      <img src="http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/0f5e1e17b77ae628c7e5ddba129cc87e.png" alt="">
    </div>
    <div class="empty-column" v-else>
    </div>
    <Modal
      v-model="modal"
      title="配置图片栏目">
      <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </Modal>
    <div class="operate-list">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit" @click="showEditDialog">编辑</Button>
        <Button type="primary" icon="trash-a">删除</Button>
        <Button type="primary" icon="arrow-up-a">上移</Button>
        <Button type="primary" icon="arrow-down-a">下移</Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutBannerModule',
  data () {
    return {
      image: '',
      modal: false
    }
  },
  computed: {
    isExist () {
      return this.image !== ''
    }
  },
  methods: {
    showEditDialog () {
      this.modal = true
    }
  }
}
</script>
<style lang="css" scoped>
.module-content
.banner img{
  width: 100%;
}
</style>
