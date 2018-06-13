<template>
  <card class="config-page-wrapper">
    <p slot="title">配置</p>
    <span slot="extra">
      <a href="#" slot="extra" @click.prevent="changeLimit">
          <Icon type="ios-plus-empty"></Icon>
          新增模块
      </a>
    </span>
    <LayoutModuleBanner></LayoutModuleBanner>
    <LayoutModuleFloor></LayoutModuleFloor>
    <LayoutModuleProduct></LayoutModuleProduct>
    <LayoutModuleIntro></LayoutModuleIntro>
    <div class="empty-column">
      <div class="operate-list">
        <ButtonGroup vertical>
          <Button type="ghost" icon="edit">编辑</Button>
          <Button type="ghost" icon="trash-a">删除</Button>
          <Button type="ghost" icon="arrow-up-a">上移</Button>
          <Button type="ghost" icon="arrow-down-a">下移</Button>
        </ButtonGroup>
      </div>
    </div>
    <div class="search-result">
      <ul class="result">
        <LayoutProduct v-for="product in products" :key="product.id" :product="product"></LayoutProduct>
      </ul>
    </div>
  </card>
</template>
<script>
export default {
  name: 'ConfigPageActivity',
  components: {
    LayoutProduct: () => import('@/view/components/LayoutProduct.vue'),
    LayoutModuleBanner: () => import('@/view/components/LayoutModuleBanner'),
    LayoutModuleFloor: () => import('@/view/components/LayoutModuleFloor'),
    LayoutModuleProduct: () => import('@/view/components/LayoutModuleProduct'),
    LayoutModuleIntro: () => import('@/view/components/LayoutModuleIntro')
  },
  data () {
    return {
      products: [],
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
          key: 'image',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.image
                },
                style: {
                  width: '40px',
                  height: '40px'
                },
                on: {
                  click: () => {
                    console.log(params)
                  }
                }
              })
            ])
          }
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
        }, {
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
                    this.products.push(params.row)
                  }
                }
              }, '添加')
            ])
          }
        }
      ],
      list: [
        {}
      ]
    }
  },
  methods: {
    submit () {
      this.$api.get('/store/item/get_manage_list', {
        params: {
          order_by: 'cdate desc',
          page: 1,
          page_size: 10,
          wholesale_item_query: {keywords: '', cdateMin: '', 'cdateMax': '', 'type': 0}
        }
      })
    }
  },
  beforeMount () {
    this.$api.get('/store/item/get_manage_list', {
      params: {
        order_by: 'cdate desc',
        page: 1,
        page_size: 10,
        wholesale_item_query: {keywords: '', cdateMin: '', 'cdateMax': '', 'type': 0}
      }
    }).then(data => {
      this.list = data.map(({ full_url: image, id, item_name: name, brand, tag: label, order_num: total, cdate: createAt, status_cname: status, price_real: realPrice, price: oldPrice }) => ({
        image, id, name, brand, label, total, createAt, status, realPrice, oldPrice
      }))
      console.log(data)
    })
  }
}
</script>
<style lang="less" scoped>
.search-result {
  position: relative;
  min-width: 1500px;
  ul.result {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  ul li:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
<style lang="less">
.empty-column {
  text-align: center;
  height: 380px;
  width: 100%;
  border: 1px dotted #ccc;
  position: relative;
}
.module-content{
  position: relative;
}
.module-content:hover .operate-list {
  display: inline;
}
.operate-list{
  display: none;
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
}
</style>
