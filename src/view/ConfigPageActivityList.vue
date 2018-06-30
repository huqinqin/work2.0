<template>
  <card>
    <i-form ref="filter" :model="filter" inline>
      <form-item prop="name">
        <i-input v-model="filter.name" type="text" placeholder="活动名称"></i-input>
      </form-item>

      <form-item>
        <i-button type="primary" @click="query">查询</i-button>
        <i-button type="error" @click="removeSelections">删除所选</i-button>
      </form-item>
    </i-form>
    <i-table :columns="columns" :data="list" size="small" ref="table" @on-selection-change="changeSelection"></i-table>
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
      url: 'activity',
      filter: {
        name: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '活动链接',
          key: 'link',
          align: 'left',
          render: (h, params) => {
            return h('span', 'https://ltsmall.com/promo/#/' + params.row.name)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: `/config-page/activity/${params.row.name}` })
                  }
                }
              }, '编辑')
            ])
          }
        }
      ]
    }
  }
}
</script>
