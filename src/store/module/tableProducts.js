import api from '@/libs/axios.js'
export default {
  state: {
    show: false,
    products: [],
    selectedIds: []
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    setSelectedIds (state, selectedIds) {
      state.selectedIds = selectedIds
    },
    toggleModal (state) {
      state.show = !state.show
    }
  },
  actions: {
    fetchProducts ({commit}, filter) {
      api.get('/store/item/get_manage_list', {
        params: {
          order_by: 'cdate desc',
          page: 1,
          page_size: 10,
          wholesale_item_query: { keywords: '', cdateMin: '', 'cdateMax': '', 'type': 0 }
        }
      }).then(data => {
        const list = data.map(({ full_url: image, id, item_name: name, brand, tag: label, order_num: total, cdate: createAt, status_cname: status, price_real: realPrice, price: oldPrice }) => ({
          image, id, name, brand, label, total, createAt, status, realPrice, oldPrice
        }))
        commit('setProducts', list)
      })
    }
  },
  getters: {
    products: state => {
      return state.products.map(product => product)
    }
  }
}
