<template>
  <card class="config-page-wrapper">
    <p slot="title">配置</p>
    <span slot="extra">
      <a href="#" slot="extra" @click.prevent="showAddModule">
          <Icon type="ios-plus-empty"></Icon>
          新增模块
      </a>
    </span>
    <div>
      <component v-for="(item, index) in config" :is="modules[item.type - 1]" :key="index" :data="item.data" :index="index"></component>
    </div>
    <Modal
      v-model="modal"
      @on-ok="addModule({type: moduleType})"
      title="新增模块">
      <Select v-model="moduleType" style="width:200px">
        <Option :value="1">Banner模块</Option>
        <Option :value="2">说明模块</Option>
        <Option :value="3">商品模块</Option>
        <Option :value="4">楼层模块</Option>
      </Select>
    </Modal>
    <Modal
      :value="modalTable" @on-cancel="toggleModal"
      title="Common Modal dialog box title" width="80%" class="no-footer">
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
          <i-button type="primary">添加所选</i-button>
        </form-item>
      </i-form>
      <i-table :columns="columns" :data="products" size="small" ref="table"></i-table>
      <div style="overflow: hidden;padding-top: 10px;height: 40px;padding-right: 4px;">
        <div style="float:right;">
          <Page :total="40" size="small" show-elevator show-sizer></Page>
        </div>
      </div>
    </Modal>
  </card>
</template>
<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
export default {
  name: 'ConfigPageActivity',
  components: {
    LayoutModuleBanner: () => import('@/view/components/LayoutModuleBanner'),
    LayoutModuleFloor: () => import('@/view/components/LayoutModuleFloor'),
    LayoutModuleProduct: () => import('@/view/components/LayoutModuleProduct'),
    LayoutModuleIntro: () => import('@/view/components/LayoutModuleIntro')
  },
  data () {
    return {
      modal: false,
      modules: [ 'LayoutModuleBanner', 'LayoutModuleIntro', 'LayoutModuleProduct', 'LayoutModuleFloor' ],
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
                    this.editModule([params.row])
                  }
                }
              }, '添加')
            ])
          }
        }
      ],
      moduleType: 1,
      curIndex: 0
    }
  },
  computed: {
    ...mapState({
      config: state => state.configActivity.config,
      modalTable: state => state.tableProducts.show
    }),
    ...mapGetters(['products'])
  },
  methods: {
    ...mapMutations(['addModule', 'editModule', 'toggleModal']),
    showAddModule () {
      this.modal = true
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchProducts')
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
