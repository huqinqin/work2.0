<template>
  <card>
    <i-form :model="curProp" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :span="24">
          <form-item label="编号" prop="id">
            <i-input v-model="curProp.id" type="text" placeholder="编号" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="属性名称" prop="name">
            <i-input v-model="curProp.name" type="text" placeholder="属性名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="商品类型" prop="category">
            <i-input v-model="curProp.category" type="text" placeholder="商品类型" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="可选值列表" prop="values">
            <LayoutTags type="date" placeholder="可选值列表"></LayoutTags>
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
import { createNamespacedHelpers } from 'vuex'
import mixin from '@/mixins/modal-edit.js'
import LayoutTags from '@/view/components/LayoutTags.vue'
const { mapState } = createNamespacedHelpers('category')
export default {
  name: 'product-attribute-modal',
  components: {
    LayoutTags
  },
  mixins: [mixin],
  data () {
    return {
      form: {
        name: '',
        values: []
      },
      url: 'product/category/props',
      rules: {
        id: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        initial: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        manufacturer: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'change'
        }],
        show: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapState(['curProp'])
  }
}
</script>
