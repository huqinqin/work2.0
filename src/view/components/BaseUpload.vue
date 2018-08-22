<template>
  <Upload
    ref="upload"
    :show-upload-list="false"
    :on-success="handleSuccess"
    :on-error="handleError"
    :format="['jpg','jpeg','png']"
    :max-size="2048"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    :data="Object.assign({}, policy, formData)"
    multiple
    type="drag"
    :action="policy.host || ''">
    <div class="camera-icon">
      <Icon type="camera" size="48"></Icon>
    </div>
  </Upload>
</template>
<script>
import { mapActions } from 'vuex'
import upload from '~libs/upload'
export default {
  data () {
    return {
      formData: {
        name: '',
        key: '',
        Filename: ''
      },
      policy: {}
    }
  },
  methods: {
    ...mapActions([
      'getPolicy'
    ]),
    handleError () {
      this.$emit('startUpload', false)
    },
    handleSuccess (res, file) {
      let url = this.policy.host + '/' + this.policy.dir + '/' + file.name
      this.$emit('getUrl', url)
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
    handleBeforeUpload (file) {
      this.formData.name = file.name
      this.formData.key = this.policy.dir + '/' + file.name
      this.formData.Filename = file.name
      this.$nextTick(() => {
        // this.$refs.upload.post(file)
        upload('item-pic', file).then(url => {
          this.$emit('startUpload', false)
          this.$emit('getUrl', url)
        })
        this.$emit('startUpload', true)
      })
      return false
    }
  },
  created () {
    this.getPolicy({dir: 'product'}).then(() => {
      this.policy = this.$store.state.upload.policy
    })
  }
}
</script>
