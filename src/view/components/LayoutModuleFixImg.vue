<template>
  <div class="fix-img image-column module-content" @click.capture="handleButton()">
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
      <Input v-model="link" type="textarea"></Input>
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
  </div>
</template>

<script>
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
      defaultImg: 'http://ltsb2b.oss-us-west-1.aliyuncs.com/misc/a407b9d3cf4362ee4b2120d1315c6171.png'
    }
  },
  methods: {
    save () {
      this.$emit('update', this.index, this.data)
    },
    onSuccess (data) {
      console.log('success')
      this.data[this.target] = {
        link: this.link,
        url: data.data.url,
        name: data.data.value
      }
    },
    handleButton () {
      this.target = event.target.alt
      this.link = event.target.dataset.link
      this.modal = true
    }
  }
}
</script>

<style scoped lang="less">
.fix-img{
  .image-column-left{
    width:716px;
    img{
      width:100%;
    }
  }
  .image-column-right img{
    width: 472px;
  }
}
</style>
