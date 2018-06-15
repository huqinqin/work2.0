const getProducts = (module) => {
  if (module.type === 4) {
    return module.data.products
  }
  if (module.type === 3) {
    return module.data
  }
}

export default {
  state: {
    config: [],
    moduleIndex: 0,
    productIndex: 0
  },
  mutations: {
    setModuleIndex (state, index) {
      state.moduleIndex = index
    },
    setProductIndex (state, index) {
      state.productIndex = index
    },
    addModule (state, {type}) {
      let module = { type, data: '' }
      switch (type) {
        case 1:
          break
        case 2:
          break
        case 3:
          module.data = []
          break
        case 4:
          module.data = { 'name': '未命名楼层', 'products': [] }
          break
        default:
          break
      }
      state.config.push(module)
    },
    delModule (state) {
      state.config.splice(state.moduleIndex, 1)
    },
    upModule (state) {
      const index = state.moduleIndex
      if (index > 0) {
        const temp = state.config[index]
        state.config.splice(index, 1, state.config[index - 1])
        state.config.splice(index - 1, 1, temp)
      }
    },
    downModule (state) {
      const index = state.moduleIndex
      if (index < state.config.length - 1) {
        const temp = state.config[index]
        state.config.splice(index, 1, state.config[index + 1])
        state.config.splice(index + 1, 1, temp)
      }
    },
    editModule (state, data) {
      const index = state.moduleIndex
      let module = state.config[index]
      if ([1, 2].indexOf(module.type) > -1) {
        module.data = data
      }
      if (module.type === 3) {
        module.data = module.data.concat(data)
      }
      if (module.type === 4) {
        console.log(data)
        if (Array.isArray(data) && data.length > 0) {
          module.data.products = module.data.products.concat(data)
        }
        if (typeof data === 'string') {
          module.data.name = data
        }
      }
      state.config.splice(index, 1, module)
    },
    moveProduct (state, step) {
      const moduleIndex = state.moduleIndex
      const productIndex = state.productIndex
      const targetIndex = productIndex + step
      let products = getProducts(state.config[moduleIndex])
      if (targetIndex < 0 || targetIndex >= products.length) return
      const temp = products[productIndex]
      products.splice(productIndex, 1, products[targetIndex])
      products.splice(targetIndex, 1, temp)
    },
    delProduct (state) {
      const moduleIndex = state.moduleIndex
      const productIndex = state.productIndex
      let products = getProducts(state.config[moduleIndex])
      products.splice(productIndex, 1)
    },
    editProduct (state, newProduct) {
      const moduleIndex = state.moduleIndex
      const productIndex = state.productIndex
      let products = getProducts(state.config[moduleIndex])
      products.splice(productIndex, 1, newProduct)
    }
  },
  actions: {}
}
