<template>
  <card>
  <i-form :model="form" label-position="top" :rules="rules" inline>
    <row :gutter="16">
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="测试text" prop="input">
            <i-input v-model="form.input" type="text" placeholder="测试text" ></i-input>
        </form-item>
      </i-col>
      <i-col :lg="6" :md="8" :sm="12" :xs="24">
        <form-item label="测试text" prop="input2">
            <i-input v-model="form.input2" type="text" placeholder="测试text" ></i-input>
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
  data () {
    return {
      form: {
        input: '', input2: ''
      },
      rules: {
        input: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }],
        input2: [{
          required: true,
          message: 'The input cannot be empty',
          trigger: 'blur'
        }]

      }
    }
  }
}
</script>
