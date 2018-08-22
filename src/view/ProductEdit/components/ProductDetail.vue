<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
    <div v-show="false" class="edit-upload">
      <BaseUpload @getUrl="getUrl"></BaseUpload>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Editor from 'wangeditor'
export default {
  name: 'product-detail',
  components: {
    BaseUpload: () => import('@/view/components/BaseUpload.vue')
  },
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      menus: [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'foreColor',
        'backColor',
        'link',
        'list',
        'justify',
        'quote',
        'image',
        'table',
        'undo',
        'redo'
      ],
      policy: {},
      formData: {
        name: '',
        key: '',
        Filename: ''
      }
    }
  },
  computed: {
    content: {
      get: function () {
        return this.value
      },
      set: function () {
      }
    }
  },
  methods: {
    ...mapActions([
      'getPolicy'
    ]),
    getUrl (url) {
      let quill = this.$refs.myQuillEditor.quill
      let img = url
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', img)
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    creatEditor () {
      let editor = new Editor(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.content = html
        this.$emit('input', html)
      }
      editor.customConfig.menus = this.menus
      editor.customConfig.uploadImgServer = this.policy.host
      editor.customConfig.uploadImgMaxLength = 1
      editor.customConfig.customAlert = (info) => {
        if (info !== 'giveup') {
          this.$Notice.error({
            title: info
          })
        }
      }
      editor.customConfig.uploadImgParams = {
        ...this.policy,
        ...this.formData
      }
      editor.customConfig.uploadImgHooks = {
        before: (xhr, editor, file) => {
          console.dir(editor)
          this.formData.name = file[0].name
          this.formData.key = this.policy.dir + '/' + file[0].name
          this.formData.Filename = file[0].name
          return {
            prevent: true,
            msg: 'giveup'
          }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          let url = result.url
          insertImg(url)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      editor.create()
      editor.txt.html(this.content)
    }
  },
  created () {
    this.getPolicy().then(() => {
      this.policy = this.$store.state.upload.policy
      this.creatEditor()
    })
  }
}
</script>
<style lang="less" scoped>
  /deep/ .ql-editor{
    min-height: 320px;
  }
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }

  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
</style>
