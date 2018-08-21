<template>
  <div>
    <div class="demo-upload-list" v-for="(url, index) in uploadList" :key="index" :class="{'default': index === 0}">
      <img :src="url">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click="handleView(index)"></Icon>
        <div class="default" @click="handleDefault(index)" v-if="index !== 0">设为默认</div>
        <div class="delete" @click="handleRemove(index)">删除</div>
      </div>
    </div>
    <BaseUpload @getUrl="getUrl"></BaseUpload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['value'],
  components: {
    BaseUpload: () => import('./BaseUpload')
  },
  data () {
    return {
      imgUrl: '',
      visible: false,
      formData: {
        name: '',
        key: '',
        Filename: ''
      }
    }
  },
  computed: {
    policy () {
      return this.$store.state.upload.policy
    },
    uploadList () {
      return this.value
    }
  },
  watch: {
    uploadList: {
      handler: function (newO, oldO) {
        this.$emit('input', newO)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'getPolicy'
    ]),
    getUrl (url) {
      this.uploadList.push(url)
    },
    handleDefault (index) {
      let defaultItem = this.uploadList[index]
      this.uploadList.splice(index, 1)
      this.uploadList.unshift(defaultItem)
    },
    handleView (index) {
      this.imgUrl = this.uploadList[index]
      this.visible = true
    },
    handleRemove (index) {
      this.uploadList.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ivu-upload{
    width:256px;
    height: 256px;
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    justify-content: center;
  }
    .demo-upload-list{
        display: inline-block;
        width: 256px;
        height: 256px;
        text-align: center;
        line-height: 256px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        color: #fff;
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        font-size: 56px;
        cursor: pointer;
        margin: 0 2px;
    }
    .demo-upload-list-cover div{
      width: 50%;
      font-size: 16px;
      position: absolute;
      bottom: 0;
      line-height: 48px;
      cursor: pointer;
    }
    .demo-upload-list-cover .default{
      left:0;
    }
    .demo-upload-list-cover .delete{
      right:0;
    }
    .demo-upload-list.default .default{
      cursor: default;
    }
</style>
