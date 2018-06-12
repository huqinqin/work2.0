<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="image">
        <i-input v-model="filter.image" type="text" placeholder="商品图片" ></i-input>
      </form-item>
      <form-item prop="id">
        <i-input v-model="filter.id" type="text" placeholder="商品ID" ></i-input>
      </form-item>
      <form-item prop="name">
        <i-input v-model="filter.name" type="text" placeholder="商品名称" ></i-input>
      </form-item>
      <form-item prop="brand">
        <i-input v-model="filter.brand" type="text" placeholder="商品品牌" ></i-input>
      </form-item>
      <form-item prop="label">
        <i-input v-model="filter.label" type="text" placeholder="商品标签" ></i-input>
      </form-item>
      <form-item prop="total">
        <i-input v-model="filter.total" type="text" placeholder="商品出售总数" ></i-input>
      </form-item>
      <form-item prop="createAt">
        <date-picker type="datetimerange" placeholder="商品创建时间"></date-picker>
      </form-item>
      <form-item prop="status">
        <i-input v-model="filter.status" type="text" placeholder="商品状态" ></i-input>
      </form-item>
      <form-item>
        <i-button type="primary">查询</i-button>
        <i-button type="error">删除所选</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table"></i-table>
  </card>
</template>
<script>
export default {
  data () {
    return {
      filter: {
        image: '', id: '', name: '', brand: '', label: '', total: '', createAt: '', status: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品图片',
          key: 'image'
        }, {
          title: '商品ID',
          key: 'id'
        }, {
          title: '商品名称',
          key: 'name'
        }, {
          title: '商品品牌',
          key: 'brand'
        }, {
          title: '商品标签',
          key: 'label'
        }, {
          title: '商品出售总数',
          key: 'total'
        }, {
          title: '商品创建时间',
          key: 'createAt'
        }, {
          title: '商品状态',
          key: 'status'
        }
      ],
      list: [
        {}
      ]
    }
  }
}
</script>
