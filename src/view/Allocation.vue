<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
  <form-item prop="input">
    <i-input v-model="filter.input" type="text" placeholder="测试text" ></i-input>
  </form-item>

  <form-item>
    <Button type="primary">查询</Button>
    <Button type="error">删除所选</Button>
  </form-item>
</i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
    <br>
  </card>
</template>
<script>
export default {
  data () {
    return {
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
      ],
      list: [
        {}
      ]
    }
  }
}
</script>
