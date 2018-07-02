<template>
  <div class="fix-img image-column module-content" @click.capture="showUpload">
    <div class="image-column-left">
      <img :src="data.left.url || defaultImg" alt="left" width="716" height="350" :data-link="data.left.link">
    </div>
    <div class="image-column-right">
      <div class="image-column-right-top">
        <img :src="data.rightTop.url || defaultImg" alt="rightTop" width="472" height="169" :data-link="data.rightTop.link">
      </div>
      <div class="image-column-right-bottom">
        <img :src="data.rightBottom.url || defaultImg" alt="rightBottom" width="472" height="169" :data-link="data.rightBottom.link">
      </div>
    </div>
    <Modal
      v-model="modal"
      @on-ok="save"
      title="配置图片栏目">
      <p>跳转链接：</p>
      <Input v-model="link" type="textarea" :rows="1" autosize></Input>
      <p>上传图片：</p>
      <Upload
        multiple
        type="drag"
        ref="upload"
        :show-upload-list="false"
        :on-success="onSuccess"
        action="/cgi/upload/file/misc/image">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
      </Upload>
    </Modal>
    <div class="operate-list" @click.capture="handleButton">
      <ButtonGroup vertical>
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
  name: 'LayoutModuleFixImg',
  props: {
    data: Object,
    index: Number
  },
  data () {
    return {
      modal: false,
      target: '',
      link: '',
      defaultImg: 'https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/d1d68fac5de3a336843a63b30e9c80f6.png'
    }
  },
  methods: {
    save () {
      this.data[this.target].link = this.link
      this.$emit('update', this.index, this.data)
    },
    onSuccess (data) {
      this.data[this.target] = {link: this.link, url: data.data.url, name: data.data.value}
    },
    showUpload () {
      this.target = event.target.alt
      this.link = event.target.dataset.link
      this.modal = true
    },
    handleButton () {
      const operate = trim(event.target.innerText)
      this.$emit('handle', this.index, operate)
    }
  }
}
</script>

<style scoped lang="less">
.fix-img{
  position: relative;
  .image-column-left img{
    width:716px;
  }
  .image-column-right img{
    width: 472px;
  }
  img{
    width:100%;
    cursor: pointer;
  }
}
</style>
