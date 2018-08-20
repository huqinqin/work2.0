<template>
  <div>
    <quill-editor
      v-model="detail"
      ref="myQuillEditor"
      :options="editorOption"
      @change="onEditorChange($event)">
    </quill-editor>
    <div v-show="false" class="edit-upload">
      <BaseUpload @getUrl="getUrl"></BaseUpload>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}], // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
  [{'direction': 'rtl'}], // text direction
  [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}], // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video']
]
export default {
  name: 'product-detail',
  components: {
    BaseUpload: () => import('@/view/components/BaseUpload.vue'),
    quillEditor
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
      detail: this.value,
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.edit-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onEditorChange: debounce(function ({ quill, html, text }) {
      this.content = html
      this.$emit('input', html)
    }, 400),
    getUrl (url) {
      let quill = this.$refs.myQuillEditor.quill
      let img = url
      // 获取光标所在位置
      let length = quill.getSelection().index
      // 插入图片  res.info为服务器返回的图片地址
      quill.insertEmbed(length, 'image', img)
      // 调整光标到最后
      quill.setSelection(length + 1)
    }
  }
}
</script>
