<template>
  <i-table :columns="columns" :data="itemList" size="small" ref="table" :show-header="false"></i-table>
</template>

<script>
export default {
  name: 'order-list-expand',
  props: {
    itemList: Array
  },
  data () {
    return {
      columns: [
        {
          align: 'center',
          key: '',
          width: 50,
          render: (h, params) => {
            return (
              <img class="item-img" height="26" width="26" alt={params.row.title} src={params.row.imgUrls[0]} />
            )
          }
        }, {
          align: 'center',
          key: '',
          width: 320,
          render: (h, params) => {
            return (
              <p class="item-title single-ellipsis" title={params.row.title}>{params.row.title}</p>
            )
          }
        }, {
          align: 'center',
          render: (h, params) => {
            return (
              <p>{params.row.sin}</p>
            )
          }
        }, {
          align: 'center',
          render: (h, params) => {
            return (
              <p>Type:{params.row.type}</p>
            )
          }
        }, {
          align: 'center',
          render: (h, params) => {
            return (
              <p>价格:{params.row.realPrice}</p>
            )
          }
        }, {
          align: 'center',
          render: (h, params) => {
            return (
              <p>数量:{params.row.num}{params.row.unit}</p>
            )
          }
        }, {
          align: 'center',
          render: (h, params) => {
            return (
              <p>总计:{params.row.amount}</p>
            )
          }
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.item-img{
  width: 26px;
  height: 26px;
}
</style>
