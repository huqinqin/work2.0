<template>
  <card>
  <i-form :model="form" label-position="top" :rules="rules">
    <row :gutter="16">
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品品牌" prop="brand">
          <i-select v-model="form.brand">
            <i-option :value="1">option1</i-option>
            <i-option :value="2">option2</i-option>
            <i-option :value="3">option3</i-option>
          </i-select>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="类目" prop="category">
          <BaseCategory v-model="form.category"></BaseCategory>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="商品名称" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品类型" prop="brand">
          <i-select v-model="form.brand">
            <i-option :value="1">option1</i-option>
            <i-option :value="2">option2</i-option>
            <i-option :value="3">option3</i-option>
          </i-select>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品排序" prop="onum">
          <i-input v-model="form.onum" type="text" placeholder="商品排序" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="是否上架" prop="putaway">
            <i-switch v-model="form.putaway"></i-switch>
        </form-item>
      </i-col>
      <i-col :lg="12" :md="24" :sm="24" :xs="24">
        <form-item label="商品关键词" prop="key">
          <BaseTags></BaseTags>
        </form-item>
      </i-col>
      <i-col :span="24" style="height: auto;">
        <form-item label="商品sku" prop="key">
          <LayoutProductAttribute></LayoutProductAttribute>
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品属性">
          <div>
            属性1：
            <BaseTags></BaseTags>
            <i-button type="error" size="small" style="marginLeft: 8px">删除</i-button>
            <Checkbox style="marginLeft: 8px;">是否可搜索</Checkbox >
            <Checkbox >是否可视</Checkbox >
          </div>
          <div>新增</div>
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品图片">
          <BaseUploadProductImgs></BaseUploadProductImgs>
        </form-item>
      </i-col>
      <i-col :span="24">
        <form-item label="商品详情">
          <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
        </form-item>
      </i-col>
    </row>
    <form-item>
        <i-button type="primary">Submit</i-button>
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
      content: '',
      form: {
        category: '', name: '', title: '', subhead: '', brand: '', num: '', price: '', linePrice: '', unit: '', weight: '', putaway: '', detailTitle: '', detailDescription: '', key: ''
      },
      rules: {
        category: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        name: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        subhead: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        brand: [{
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
        putaway: [{
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
        }],
        key: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>
