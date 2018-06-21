<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
  <form-item prop="input">
    <i-input v-model="filter.input" type="text" placeholder="测试text" ></i-input>
  </form-item>

  <form-item>
    <i-button type="primary">查询</i-button>
    <i-button type="error">删除所选</i-button>
  </form-item>
</i-form>
<i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
<div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
  <div style="float:right;">
    <Page @on-change="changePage" :total="total" size="small" show-elevator show-sizer></Page>
  </div>
</div>
  </card>
</template>
<script>
import mixin from '@/mixins/list'
export default {
  mixins: [mixin],
  data () {
    return {
      url: '测试text',
      filter: {
        input: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '测试text',
          key: 'input'
        }
      ]
    }
  }
}
</script>
