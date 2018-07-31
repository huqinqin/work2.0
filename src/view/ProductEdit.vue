<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules" ref="form">
      <row :gutter="16">
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="商品品牌" prop="brandId">
            <i-select v-model="form.brandId">
              <i-option v-for="item in brand" :value="item.key" :key="item.key">{{item.value}}</i-option>
            </i-select>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="类目" prop="cateId" class="ivu-form-item-required">
            <BaseCategory v-model="form.cateId" @input="getProps"></BaseCategory>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="商品类型" prop="kind">
            <i-select v-model="form.kind">
              <i-option v-for="item in kind" :key="item" :value="item">{{ item }}</i-option>
            </i-select>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="商品排序" prop="onum" class="ivu-form-item-required">
            <i-input v-model="form.onum" type="text" placeholder="商品排序"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="商品名称" prop="title">
            <i-input v-model="form.title" type="text" placeholder="商品名称"></i-input>
          </form-item>
        </i-col>
        <i-col :lg="6" :md="8" :sm="12" :xs="24">
          <form-item label="是否上架" prop="status">
            <i-switch v-model="form.status" true-value="onsale" false-value="enabled" />
          </form-item>
        </i-col>
        <i-col :lg="12" :md="24" :sm="24" :xs="24">
          <form-item label="商品关键词" prop="keyword">
            <Tag v-for="(item, index) in form.keyword" fade color="blue" :key="index" :name="item" closable
                 @on-close="handleCloseTag(index)">{{ item }}
            </Tag>
            <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAddTag" @blur="handleAddTag"
                   v-model="tag">
          </form-item>
        </i-col>
        <i-col :span="24" style="height: auto;">
          <form-item label="商品sku" prop="skus" class="ivu-form-item-required">
            <i-button type="primary" @click="showSku">选择属性</i-button>
            <Modal
              v-model="isShowSku"
              @on-ok="checkProps"
              @on-cancel="cancelChecked"
              title="选择sku属性">
              <i-form label-position="top" ref="propForm">
                <form-item v-for="(item, index) in skuProps" :key="item.id" :label="item.name">
                  <CheckboxGroup v-model="item.checked" >
                    <Checkbox v-for="prop in item.values" :label="prop.id" :key="prop.id">{{prop.name}}</Checkbox>
                  </CheckboxGroup><i-button type="error" size="small" @clicl="deleteSku(index)">删除</i-button>
                </form-item>
              </i-form>
            </Modal>
            <LayoutProductAttribute v-model="form.skus"></LayoutProductAttribute>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="商品属性" prop="itemProps[0].props" class="ivu-form-item-required">
            <i-form label-position="left" class="prop-form">
              <form-item v-for="(item, index) in spuProps" :key="index" :label="item.name + ': '">
                <RadioGroup v-model="item.value" @on-change="checkSpu">
                  <Radio v-for="(value, spuIndex) in item.values" :label="value" :key="spuIndex"></Radio>
                </RadioGroup>
                <i-button type="primary" size="small" style="marginLeft: 8px" @click="addProp(index)">新增</i-button>
                <i-button type="error" size="small" style="marginLeft: 8px" @click="delProp(index)">删除</i-button>
                <Checkbox style="marginLeft: 8px;" v-model="item.canSearch" @on-change="checkSpu">是否可搜索</Checkbox>
                <Checkbox v-model="item.canSee" @on-change="checkSpu">是否可视</Checkbox>
              </form-item>
            </i-form>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="商品图片" prop="imgUrls" class="ivu-form-item-required">
            <!--<div>-->
              <!--<i-button @click="upload" type="primary">选择图片</i-button>-->
              <!--<i-button @click="upload">上传图片</i-button>-->
            <!--</div>-->
            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index"
                 :class="{'default': index === 0}">
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
              :show-upload-list="true"
              :default-file-list="imgUrls"
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
              <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
            <!--<BaseUploadProductImgs v-model="form.imgUrls"></BaseUploadProductImgs>-->
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="商品详情" prop="detail">
            <quill-editor v-model="form.detail"
                          ref="myQuillEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
            <Upload
              class="edit-upload"
              type="drag"
              :before-upload="beforeLoad"
              :on-success="loadSuccess"
              :on-error="loadError"
              :data="Object.assign(formUp, formData)"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              action="//chen0711.oss-cn-hangzhou.aliyuncs.com">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
              </div>
            </Upload>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!--<base-editor :content="content" :height="500" ref="content"></base-editor>-->
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary" @click="submit">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px">Cancel</i-button>
      </form-item>
    </i-form>
  </card>
</template>
<script>
// require styles
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
  ['link', 'image', 'video'],
  ['clean'] // remove formatting button
]

export default {
  components: {
    LayoutProductAttribute: () => import('@/view/components/LayoutProductAttribute.vue'),
    BaseUploadProductImgs: () => import('@/view/components/BaseUploadProductImgs.vue'),
    BaseCategory: () => import('@/view/components/BaseCategory.vue'),
    BaseTags: () => import('@/view/components/BaseTags.vue'),
    quillEditor
  },
  data () {
    const validateSku = (rule, value, callback) => {
      value.forEach(t => {
        if ((t.sin === '') || (t.onum === '') || (t.price === '') || (t.weight === '') || ((t.props.length === 0))) {
          callback(new Error('Something is empty'))
          return false
        }
      })
      callback()
    }
    const validateArr = (rule, value, callback) => {
      if (value.length) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    const validateVal = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    const validateOnum = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('The input cannot be empty'))
      }
    }
    return {
      isShowSku: false,
      formUp: {
        policy: '',
        OSSAccessKeyId: '',
        signature: '',
        preKey: '',
        dir: '',
        host: '',
        expire: '',
        success_action_status: 200
      },
      formData: {
        name: '',
        key: '',
        Filename: ''
      },
      spinShow: false,
      imgName: '',
      visible: false,
      uploadList: [],
      tag: '',
      spu: '',
      content: '',
      brand: [],
      kind: ['kind1', 'kind2', 'kind3'],
      skuProps: [],
      spuProps: [],
      imgUrls: [],
      form: {
        cateId: '',
        title: '',
        detail: '',
        brandId: '',
        kind: '',
        onum: '',
        status: '',
        keyword: [],
        imgUrls: ['xxx.com'],
        itemProps: [
          {
            skuProps: [],
            props: []
          }
        ],
        skus: []
      },
      rules: {
        title: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur, change'
        }],
        kind: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        imgUrls: [{ validator: validateArr, trigger: 'change' }],
        onum: [{ validator: validateOnum, trigger: 'change' }],
        skus: [{ validator: validateSku, trigger: 'blur' }],
        'itemProps[0].props': [{ validator: validateArr, trigger: 'change' }],
        cateId: [{ validator: validateVal, trigger: 'change' }],
        brandId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        detail: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        price: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }]
      },
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
      },
      filelist: []
    }
  },
  methods: {
    // 选择sku属性
    showSku () {
      if (this.form.cateId) {
        this.isShowSku = true
      } else {
        this.$Modal.info({
          title: 'Info',
          content: '<p>请先选择类目</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
          }
        })
      }
    },
    checkProps () {
      this.form.itemProps[0].skuProps = []
      this.skuProps.forEach(sku => {
        if (sku.checked.length) {
          let values = []
          sku.values.forEach(t => {
            if (sku.checked.indexOf(t.id) !== -1) values.push({valueId: t.id, value: t.name})
          })
          this.form.itemProps[0].skuProps.push({name: sku.name, nameId: sku.id, values: values})
        }
      })
      let skuArr = this.form.itemProps[0].skuProps.map(t => {
        return t.values.map(v => {
          return {id: v.valueId, name: v.value}
        })
      })
      if (skuArr.length === 0) {
        this.$Modal.info({
          title: 'Info',
          content: '<p>请先选择类目</p>',
          loading: true,
          onOk: () => {
            this.$Modal.remove()
          }
        })
      }
      this.form.skus = this.descartes(skuArr).map(t => {
        return {spec: 1, basePrice: '', unit: 'pc', size: null, weight: '', sin: '', props: t, onum: ''}
      })
    },
    descartes (skuArr) {
      if (skuArr.length === 0) {
        return []
      } else if (skuArr.length === 1) {
        return skuArr[0].map(v => {
          return [v]
        })
      } else {
        return [].reduce.call(skuArr, (col, set) => {
          let res = []
          col.forEach(c => {
            set.forEach(s => {
              let t = [].concat(Array.isArray(c) ? c : [c])
              t.push(s)
              res.push(t)
            })
          })
          return res
        })
      }
    },
    cancelChecked () {
      console.log('cancel')
    },
    deleteSku (index) {
      this.skuProps[index].checked = []
    },
    // 上传图片
    getPolicy () {
      this.$http.getPolicy().then(data => {
        this.formUp.policy = data.policy
        this.formUp.OSSAccessKeyId = data.accessid
        this.formUp.signature = data.signature
        this.formUp.dir = data.dir
        this.formUp.host = data.host
        this.formUp.preKey = data.dir
        this.formUp.expire = data.expire
      })
    },
    // 富文本编辑相关
    onEditorBlur (event) {
      console.log(event)
    },
    onEditorFocus (event) {
      console.log(event)
    },
    onEditorReady (event) {
      console.log(event)
    },
    beforeLoad (file) {
      this.formData.name = file.name
      this.formData.key = this.formUp.preKey + '/' + file.name
      this.formData.Filename = file.name
      this.filelist.push(file)
      return false
    },
    upload () {
      console.log(this.filelist)
      console.log(this.$refs.upload.post)
    },
    loadSuccess (response, file) {
      this.img = this.formData.host + '/' + this.formData.dir + '/' + file.name
      console.log(this.img)
      console.log(file)
    },
    loadError (error) {
      console.log(error)
    },
    // 图片上传相关
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
      file.url = this.formData.host + '/' + this.formData.dir + '/' + file.name
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
    addProp (index) {
      this.$Modal.confirm({
        title: this.spuProps[index].name,
        render: (h) => {
          return h('Input', {
            props: {
              value: this.spu,
              autofocus: true,
              placeholder: 'Please enter prop...'
            },
            on: {
              input: (val) => {
                this.spu = val
              }
            }
          })
        },
        onOk: () => {
          if (this.spu) {
            this.spuProps[index].values.push(this.spu)
            this.spu = ''
            this.$Notice.open({
              title: '新增属性成功',
              desc: ''
            })
          } else {
            this.$Notice.open({
              title: '请先输入属性',
              desc: ''
            })
          }
        },
        onCancel: () => {
          this.spu = ''
          this.$Notice.open({
            title: '取消新增属性',
            desc: ''
          })
        }
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.form))
          this.$http.saveProduct({
            ...this.form
          }).then(data => {
            this.$Modal.remove()
            this.$Notice.success({
              title: '保存成功',
              desc: ''
            })
          })
        }
      })
    },
    checkSpu () {
      this.form.itemProps[0].props = []
      this.spuProps.forEach(t => {
        if (t.value) {
          this.form.itemProps[0].props.push({
            name: t.name,
            value: t.value,
            canSee: t.canSee,
            canSearch: t.canSearch
          })
        }
      })
    },
    delProp (index) {
      this.spuProps[index].value = ''
      this.spuProps[index].canSee = false
      this.spuProps[index].canSearch = false
      this.checkSpu()
    },
    handleAddTag () {
      if (this.tag === '') return false
      this.form.keyword.push(this.tag)
      this.tag = ''
    },
    handleCloseTag (index) {
      this.form.keyword.splice(index, 1)
    },
    getProps () {
      if (this.form.cateId) {
        this.spuProps = []
        this.$http.fetchSkuProps({
          id: this.form.cateId
        }).then(data => {
          this.skuProps = data.list.map(t => Object.assign({}, t, {checked: []}))
        })
        this.$http.fetchSpuProps({
          id: this.form.cateId
        }).then(data => {
          data.list.forEach((t, index) => {
            let values = []
            t.values.forEach(v => {
              values.push(v.name)
            })
            this.spuProps.push({name: t.name, canSee: false, canSearch: false, values: values, value: ''})
            this.form.itemProps[0].props.forEach(v => {
              this.spuProps.forEach(t => {
                if (t.name === v.name) {
                  t.value = v.value
                  t.canSee = v.canSee
                  t.canSearch = v.canSearch
                }
              })
            })
          })
        })
      }
    },
    getBrand () {
      this.$http.fetchCodeTable({
        type: 'brand',
        source: 'lts'
      }).then(data => {
        this.$nextTick(() => {
          this.brand = data
        })
      })
    },
    getDetail () {
      this.$http.getProduct({
        id: this.$route.params.id
      }).then(data => {
        this.uploadList = data.imgUrls.map((url, index) => {
          return {
            name: index,
            url: url,
            status: 'finished'
          }
        })
        this.form = data
        this.getProps()
      })
    }
  },
  created () {
    this.getPolicy()
    this.getBrand()
    if (this.$route.params.id) this.getDetail()
  }
}
</script>
<style lang="less" scoped>
  .btn-add {
    width: 80px;
    height: 24px;
    line-height: 24px;
    padding: 2px 7px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px dashed #dddee1;
  }

  .btn-add:focus {
    border: 1px dashed #57a3f3;
    outline: none;
  }

  // 上传图片相关
  .demo-upload-list {
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
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
    color: #fff;
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    font-size: 56px;
    cursor: pointer;
    margin: 0 2px;
  }

  .demo-upload-list-cover div {
    width: 50%;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    line-height: 48px;
    cursor: pointer;
  }

  .demo-upload-list-cover .default {
    left: 0;
  }

  .demo-upload-list-cover .delete {
    right: 0;
  }

  .demo-upload-list.default .default {
    cursor: default;
  }

  /deep/ .ql-container {
    min-height: 640px;
  }
  .edit-upload{
    visibility: hidden;
    height: 0;
  }
  /deep/ .prop-form label.ivu-form-item-label::before{
    content: '';
  }
  /deep/ .ivu-checkbox-group{
    display: inline-block;
  }
</style>
