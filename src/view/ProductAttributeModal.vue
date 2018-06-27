<template>
  <card>
    <i-form :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :span="24">
          <form-item label="编号" prop="id">
            <i-input v-model="form.id" type="text" placeholder="编号" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="属性名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="属性名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="商品类型" prop="category">
            <i-input v-model="form.category" type="text" placeholder="商品类型" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="可选值列表" prop="options">
            <date-picker type="date" placeholder="可选值列表"></date-picker>
          </form-item>
        </i-col>
      </row>
      <form-item>
        <i-button type="primary" @click="submit">Submit</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="closeModal">Cancel</i-button>
      </form-item>
    </i-form>
  </card>
</template>

<script>
import mixin from '@/mixins/modal-detail'
export default {
  mixins: [mixin],
  name: 'product-attribute-modal',
  data () {
    return {
      url: 'product/attribute',
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
  }
}
</script>

<style scoped>

</style>
