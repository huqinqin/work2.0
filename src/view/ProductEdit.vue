<template>
  <card>
  <i-form :model="form" label-position="top" :rules="rules">
    <row :gutter="16">
      <i-col>
        <form-item label="商品名称" prop="title">
          <i-input v-model="form.title" type="text" placeholder="商品名称" ></i-input>
        </form-item>
      </i-col>
    </row>
    <row :gutter="16">
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品品牌" prop="brandId">
          <i-select v-model="form.brandId">
            <i-option v-for="item in brand" :value="item.id" :key="item.id">{{item.name}}</i-option>
          </i-select>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="类目" prop="cateId">
          <BaseCategory :id="form.cateId" @on-change="getProps"></BaseCategory>
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
        <form-item label="商品排序" prop="onum">
          <i-input v-model="form.onum" type="text" placeholder="商品排序" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品价格" prop="price">
          <i-input v-model="form.price" type="text" placeholder="商品价格" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="是否上架" prop="status">
            <i-switch v-model="form.status"></i-switch>
        </form-item>
      </i-col>
      <i-col :lg="12" :md="24" :sm="24" :xs="24">
        <form-item label="商品关键词" prop="keyword">
          <!--<BaseTags v-model="form.keyword"></BaseTags>-->
          <Tag v-for="(item, index) in form.keyword"  fade color="blue" :key="item" :name="item" closable @on-close="handleCloseTag(index)">{{ item  }}</Tag>
          <input type="text" class="btn-add" placeholder="添加" @keydown.enter="handleAddTag" @blur="handleAddTag" v-model="tag">
        </form-item>
      </i-col>
      <i-col :span="24" style="height: auto;">
        <form-item label="商品sku">
          <LayoutProductAttribute v-model="form.skus" :skuProps="skuProps" :spuProps="spuProps"></LayoutProductAttribute>
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品属性">
          <i-form label-position="left">
            <form-item v-for="item in spuProps" :key="item.name" :label="item.name + ': '">
              <RadioGroup v-model="item.value" @on-change="checkSpu">
                <Radio v-for="(value, index) in item.values" :label="value" :key="index"></Radio>
              </RadioGroup>
              <i-button type="error" size="small" style="marginLeft: 8px">删除</i-button>
              <Checkbox style="marginLeft: 8px;" v-model="item.canSearch">是否可搜索</Checkbox >
              <Checkbox v-model="item.canSee">是否可视</Checkbox >
            </form-item>
          </i-form>
          <div>添加属性</div>
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品图片">
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
            :default-file-list="imgUrls"
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
          <!--<BaseUploadProductImgs v-model="form.imgUrls"></BaseUploadProductImgs>-->
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品详情">
          <vue-html5-editor :content="content" :height="500" ref="content"></vue-html5-editor>
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
export default {
  components: {
    LayoutProductAttribute: () => import('@/view/components/LayoutProductAttribute.vue'),
    BaseUploadProductImgs: () => import('@/view/components/BaseUploadProductImgs.vue'),
    BaseCategory: () => import('@/view/components/BaseCategory.vue'),
    BaseTags: () => import('@/view/components/BaseTags.vue')
  },
  data () {
    return {
      imgName: '',
      visible: false,
      uploadList: [],
      tag: '',
      content: '',
      brand: [],
      kind: ['kind1', 'kind2', 'kind3'],
      skuProps: [],
      spuProps: [],
      imgUrls: [],
      form: {
        cateId: 12,
        title: '',
        detail: '12345678',
        brandId: '',
        kind: '',
        onum: '',
        status: '',
        keyword: [],
        price: '',
        imgUrls: [
          'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        ],
        props: [
          {
            name: 'Christopher Martinez',
            value: '属性2',
            canSearch: true,
            canSee: true
          }
        ],
        skus: [
          {
            props: [],
            onum: '',
            price: '',
            sin: '',
            unit: 'pc',
            spec: '1',
            size: '',
            weight: ''
          }
        ]
      },
      rules: {
        cateId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        title: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        kind: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        subhead: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        brandId: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        num: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        linePrice: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        unit: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        weight: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        detailTitle: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        detailDescription: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      },
      url: '/product/item'
    }
  },
  methods: {
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
    },
    //
    submit () {
      this.form.imgUrls = this.imgUrls.map(t => {
        return t.url
      })
      console.log(this.form)
      this.$axios.post(`${this.url}/save`, {
        ...this.form
      }).then(data => {
        this.$Modal.remove()
        this.$Notice.success({
          title: '保存成功',
          desc: ''
        })
      })
    },
    checkSpu (value, key) {
      console.log(value, key)
    },
    handleAddTag () {
      if (this.tag === '') return false
      this.form.keyword.push(this.tag)
      this.tag = ''
    },
    handleCloseTag (index) {
      this.form.keyword.splice(index, 1)
    },
    getProps (cate) {
      if (cate.length) {
        this.spuProps = []
        this.form.cateId = cate[cate.length - 1]
        this.$axios.post(`/product/category/sku/list`, {
          categoryId: this.form.cateId
        }).then(data => {
          this.skuProps = data.list.map(t => Object.assign({}, t, {checked: ''}))
        })
        this.$axios.post(`/product/category/props/list`, {
          id: this.form.cateId
        }).then(data => {
          data.list.forEach((t, index) => {
            let values = []
            t.values.forEach(v => {
              values.push(v.name)
            })
            this.spuProps.push({name: t.name, canSee: false, canSearch: false, values: values, value: ''})
            this.form.props.forEach(v => {
              this.spuProps.forEach(t => {
                if (t.name === v.name) {
                  t = Object.assign({}, t, v)
                }
              })
            })
          })
        })
      }
    },
    getBrand () {
      this.$axios.post('/product/brand/list').then(data => {
        this.brand = data.list.map(t => {
          return {id: t.id, name: t.name}
        })
      })
    },
    getDetail () {
      this.imgUrls = this.form.imgUrls.map((url, index) => {
        return {
          name: index,
          url: url,
          status: 'finished'
        }
      })
      console.log(this.imgUrls)
      console.log('get detail')
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  created () {
    this.getBrand()
    this.getDetail()
  }
}
</script>
<style lang="less" scoped>
  .btn-add{
    width: 80px;
    height: 24px;
    line-height: 24px;
    padding: 2px 7px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px dashed #dddee1;
  }
  .btn-add:focus{
    border: 1px dashed #57a3f3;
    outline: none;
  }
  // 上传图片相关
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
