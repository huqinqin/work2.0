<template>
  <card>
  <i-form :model="form" label-position="top" :rules="rules">
    <row :gutter="16">
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="类目" prop="category">
            <i-select v-model="form.category">
    <i-option :value="1">option1</i-option>
<i-option :value="2">option2</i-option>
<i-option :value="3">option3</i-option>

</i-select>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="商品名称" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="销售标题" prop="title">
            <i-input v-model="form.title" type="text" placeholder="销售标题" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="副标题" prop="subhead">
            <i-input v-model="form.subhead" type="text" placeholder="副标题" ></i-input>
        </form-item>
      </i-col>
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
        <form-item label="编码" prop="num">
            <i-input v-model="form.num" type="text" placeholder="编码" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="单价" prop="price">
            <i-input v-model="form.price" type="text" placeholder="单价" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="市场价" prop="linePrice">
            <i-input v-model="form.linePrice" type="text" placeholder="市场价" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="计量单位" prop="unit">
            <i-input v-model="form.unit" type="text" placeholder="计量单位" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="重量" prop="weight">
            <i-input v-model="form.weight" type="text" placeholder="重量" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="是否上架" prop="putaway">
            <i-switch v-model="form.putaway"></i-switch>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="服务保证" prop="putaway">
            <checkbox-group v-model="form.putaway">
  <checkbox label="一小时自提"></checkbox>
  <checkbox label="快速退款"></checkbox>
  <checkbox label="免费包邮"></checkbox>

</checkbox-group>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="详细页标题" prop="detailTitle">
            <i-input v-model="form.detailTitle" type="text" placeholder="详细页标题" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="详细页描述" prop="detailDescription">
            <i-input v-model="form.detailDescription" type="text" placeholder="详细页描述" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="商品关键词" prop="key">
            <i-input v-model="form.key" type="text" placeholder="商品关键词" ></i-input>
        </form-item>
      </i-col>
      <i-col span="24" style="height: auto;">
        <form-item label="商品关键词" prop="key">
          <LayoutProductAttribute></LayoutProductAttribute>
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
    LayoutProductAttribute: () => import('@/view/components/LayoutProductAttribute.vue')
  },
  data () {
    return {
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
