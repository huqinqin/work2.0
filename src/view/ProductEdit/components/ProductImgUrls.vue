<template>
  <div class="content">
    <div class="demo-upload-list" v-for="(item, index) in form.imgUrls" :key="index"
          :class="{'default': index === 0}">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click="handleView(item.url)"></Icon>
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
      :default-file-list="form.imgUrls"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="beforeLoad"
      :data="Object.assign(formUp, formData)"
      multiple
      type="drag"
      action="//chen0711.oss-cn-hangzhou.aliyuncs.com"
      style="display: inline-block;width:256px; height: 256px;">
      <div style="width: 256px;height:256px;line-height: 256px;">
        <Icon type="camera" size="48"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'ProductImgUrls',
  data () {
    return {
    }
  }
}
</script>
<style lang="css" scoped>
</style>
