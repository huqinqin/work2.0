<template>
  <card>
    <i-form v-if="form" :model="form" label-position="top" :rules="rules">
      <row :gutter="16">
        <i-col :span="24">
          <form-item label="编号" prop="id">
            <i-input v-model="form.id" type="text" placeholder="编号" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="品牌名称" prop="name">
            <i-input v-model="form.name" type="text" placeholder="品牌名称" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="品牌首字母" prop="initial">
            <i-input v-model="form.initial" type="text" placeholder="品牌首字母" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="品牌制造商" prop="manufacturer">
            <i-input v-model="form.manufacturer" type="text" placeholder="品牌制造商" ></i-input>
          </form-item>
        </i-col>
        <i-col :span="24">
          <form-item label="是否显示" prop="show">
            <i-switch v-model="form.show"></i-switch>
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
  name: 'product-brand-modal',
  data () {
    return {
      url: 'product/brand',
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
