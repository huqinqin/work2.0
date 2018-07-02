<template>
  <div class="module-content">
    <Carousel loop v-if="data.length">
      <CarouselItem v-for="img in data" :key="img.name">
        <div class="carousel">
          <img :src="img.url || defaultImg" :alt="img.name" width="1200" height="400">
        </div>
      </CarouselItem>
    </Carousel>
    <div class="empty-column" v-else @click="modal = true">
      <p>Upload one picture please.</p>
      <p><Icon type="ios-plus-outline" size="64px"></Icon></p>
    </div>
    <Modal
      v-model="modal"
      @on-ok="save"
      title="配置图片栏目">
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
      <div class="img-wrapper">
        <div class="img-item" v-for="(item, index) in data" :key="item.name">
          <div>跳转链接：<Input v-model="item.link" type="textarea" :rows="1" autosize/></div>
          <div><img :src="item.url" :alt="item.name"></div>
          <div class="img-operate-list" @click.capture="handleImgButton(index)">
            <ButtonGroup vertical>
              <Button type="primary" icon="ios-trash">删除</Button>
              <Button type="primary" icon="arrow-up-a">上移</Button>
              <Button type="primary" icon="arrow-down-a">下移</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </Modal>
    <div class="operate-list" @click.capture="handleButton">
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
  name: 'LayoutModuleCarousel',
  props: {
    data: Array,
    index: Number
  },
  data () {
    return {
      modal: false,
      defaultImg: 'https://ltsb2b.oss-us-west-1.aliyuncs.com/misc/a407b9d3cf4362ee4b2120d1315c6171.png'
    }
  },
  methods: {
    handleImgButton (index) {
      const operate = trim(event.target.innerText)
      if (operate === '删除') {
        this.data.splice(index, 1)
      } else if (operate === '上移') {
        if (index > 0) {
          const temp = this.data[index]
          this.data.splice(index, 1, this.data[index - 1])
          this.data.splice(index - 1, 1, temp)
        }
      } else if (operate === '下移') {
        if (index < this.data.length - 1) {
          const temp = this.data[index]
          this.data.splice(index, 1, this.data[index + 1])
          this.data.splice(index + 1, 1, temp)
        }
      }
      this.$emit('update', this.index, this.data)
    },
    handleButton () {
      const operate = trim(event.target.innerText)
      if (operate === '编辑') {
        this.modal = true
      } else {
        this.$emit('handle', this.index, operate)
      }
    },
    save () {
      console.log('save')
    },
    onSuccess (data) {
      this.data.push({
        name: data.data.value,
        url: data.data.url
      })
    }
  }
}
</script>
<style lang="less" scoped>
.carousel{
  height: 400px;
}
.empty-column{
  text-align: center;
  height: 400px;
  line-height: 64px;
  font-size: 24px;
  cursor: pointer;
  .ivu-icon{
    font-size: 64px;
  }
}
.module-content{
  position: relative;
}
.img-wrapper .img-item{
  width:100%;
  position: relative;
  margin-top: 12px;
  img{
    width:100%;
  }
  .img-operate-list{
    position: absolute;
    top:54px;
    right:0;
  }
}
</style>
