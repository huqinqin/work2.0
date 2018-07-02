<template>
  <div class="module-content">
    <div class="banner" v-if="isExist">
      <img :src="data.img" alt="" width="1200">
    </div>
    <div class="empty-column" v-else>
      <p>Upload one picture please.</p>
      <p><Icon type="ios-plus-outline" size="64px" @click="modal = true"></Icon></p>
    </div>
    <Modal
      v-model="modal"
      @on-ok="save"
      title="配置图片栏目">
      <p>跳转链接：</p>
      <Input v-model="data.link" type="textarea" autosize :rows="1"></Input>
      <p>上传图片：</p>
      <Upload
        multiple
        type="drag"
        :on-success="onSuccess"
        action="/cgi/upload/file/misc/image">
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
    data: Object,
    index: Number
  },
  computed: {
    isExist () {
      return this.data.img !== ''
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
    onSuccess (data) {
      this.data.img = data.data.url.replace('http:', 'http:')
    },
    save () {
      this.$emit('update', this.index, this.data)
    }
  }
}
</script>
<style lang="less" scoped>
.module-content
.banner img{
  width: 100%;
}
.empty-column p{
  line-height: 64px;
  font-size: 24px;
  .ivu-icon{
    font-size: 64px;
    cursor: pointer;
  }
}
</style>
