<template>
  <div>
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index" :class="{'default': index === 0}">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
          <div class="default" @click="handleDefault(index)">设为默认</div>
          <div class="delete" @click="handleRemove(item.name)">删除</div>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:256px; height: 256px;">
        <div style="width: 256px;height:256px;line-height: 256px;">
            <Icon type="camera" size="48"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      imgName: '',
      visible: false
    }
  },
  computed: {
    uploadList: {
      get: function () {
        return this.value.map(t => Object.assign({}, t, {status: 'finished'}))
      },
      set: function (newValue) {
        return newValue
      }
    }
  },
  watch: {
    uploadList: {
      handler: function (newO, oldO) {
        this.$emit('input', this.uploadList)
      },
      deep: true
    }
  },
  methods: {
    handleDefault (index) {
      let defaultItem = this.uploadList[index]
      this.uploadList.splice(index, 1)
      this.uploadList.unshift(defaultItem)
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.uploadList
      this.uploadList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
      file.status = 'finished'
      this.uploadList.push(file)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style lang="less" scoped>
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
