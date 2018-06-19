<template>
  <div class="module-content">
    <div class="banner" v-if="isExist">
      <img src="http://ltsres-us.oss-us-west-1.aliyuncs.com/misc/0f5e1e17b77ae628c7e5ddba129cc87e.png" alt="">
    </div>
    <div class="empty-column" v-else>
    </div>
    <Modal
      v-model="modal"
      @on-ok="save"
      title="配置图片栏目">
      <Upload
        multiple
        type="drag"
        :on-success="onSuccess"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </Modal>
    <div class="operate-list" @click.capture="handleButton()">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit">编辑</Button>
        <Button type="primary" icon="trash-a">删除</Button>
        <Button type="primary" icon="arrow-up-a">上移</Button>
        <Button type="primary" icon="arrow-down-a">下移</Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
import trim from 'lodash.trim'
export default {
  name: 'LayoutBannerModule',
  data () {
    return {
      modal: false
    }
  },
  props: {
    data: String,
    index: Number
  },
  computed: {
    isExist () {
      return this.data !== ''
    }
  },
  methods: {
    handleButton () {
      const operate = trim(event.target.innerText)
      if (operate === '编辑') {
        this.modal = true
      } else {
        this.$emit('handle', this.index, operate)
      }
    },
    onSuccess () {
      this.$emit('update', this.index, 'test')
    },
    save () {
      this.$emit('update', this.index, 'test')
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
