import Mock from 'mockjs'
const productAttributeList = Mock.mock({
  'data|10': [{
    'id|+1': '@id',
    name: '@name',
    category: '@name',
    'options|3-6': ['属性@integer(1, 10)']
  }]
})
export const getProductAttributeList = req => {
  return {
    code: 200,
    ...productAttributeList,
    msg: ''
  }
}
const productBrandList = Mock.mock({
  'data|10': [{
    'id|+1': '@id',
    name: '@name',
    initial: '@string("upper", 1)',
    'manufacturer': '@name',
    'show': '@boolean'
  }]
})
const productAttributeDetail = Mock.mock({
  'data': {
    'id|+1': '@id',
    name: '@name',
    initial: '@string("upper", 1)',
    'manufacturer': '@name',
    'show': '@boolean'
  }
})
const productList = Mock.mock({
  'data|10': [{
    'id|+1': '@id',
    name: '@name',
    image: '@image(200x100)',
    brand: '@brand',
    price: '@price',
    num: '@zip',
    label: ['标签@integer(1, 10)'],
    sale: '@integer(60, 100)',
    putaway: '@boolean'
  }]
})
const productBrandDetail = Mock.mock({
  'data': {
    'id|+1': '@id',
    name: '@name',
    initial: '@string("upper", 1)',
    'manufacturer': '@name',
    'show': '@boolean'
  }
})
export const getProductBrandList = req => {
  return {
    code: 200,
    ...productBrandList,
    msg: ''
  }
}
export const getProductAttributeDetail = req => {
  return {
    code: 200,
    ...productAttributeDetail,
    msg: ''
  }
}
export const getProductList = req => {
  return {
    code: 200,
    ...productList,
    msg: ''
  }
}
const productTrashList = Mock.mock({
  'data|10': [{
    'id|+1': '@id',
    name: '@name',
    image: '@image(200x100)',
    brand: '@name',
    price: '@integer(99, 1000)',
    num: '@zip',
    category: ['类目@integer(1, 10)']
  }]
})
export const getProductTrashList = req => {
  return {
    code: 200,
    ...productTrashList,
    msg: ''
  }
}
export const getProductBrandDetail = req => {
  return {
    code: 200,
    ...productBrandDetail,
    msg: ''
  }
}
