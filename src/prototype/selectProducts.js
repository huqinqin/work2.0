import Vue from 'vue'
import LayoutSelectProduct from '@/components/LayoutSelectProduct'
let SelectProduct = Vue.extend(LayoutSelectProduct)

let instance
let initInstance = function () {
  instance = new SelectProduct({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}
let showSelectProduct = function (options) {
  if (!instance) {
    initInstance()
  }
  if (!instance.show) {
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    // if (options.selectIds && options.selectIds.length > 0) {
    //   addSelectIds(options.selectIds)
    // }
    instance.show = true
  }
}

const delSelectIds = function (ids) {
  const selectIds = instance.selectIds.filter(id => ids.indexOf(id) < 0)
  console.log(ids, selectIds)
  instance.selectIds = selectIds
}

const addSelectIds = function (ids) {
  console.log(instance, instance.selectIds)
  const selectIds = ids.filter(id => instance.selectIds.indexOf(id) < 0)
  instance.selectIds = instance.selectIds.concat(selectIds)
}

const show = function (options) {
  showSelectProduct(options)
}

export default { show, delSelectIds, addSelectIds }
