import Mock from 'mockjs'
const productAttributeList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': '@id',
      name: '@name',
      category: '@name',
      'values|3-6': [{
        name: '属性@integer(1, 10)',
        id: '@id'
      }]
    }]
  }
})
const productBrandList = Mock.mock({
  data: {
    'list|10': [{
      'id|+1': '@id',
      name: '@name',
      initial: '@string("upper", 1)',
      'manufacturer': '@name',
      'show': '@boolean'
    }]
  }
})
const productList = Mock.mock({
  'data': {
    'list|10': [{
      'id|+1': '@id',
      title: '@name',
      'imgUrls|3': ['@image(200x100)'],
      brandName: '@first',
      price: '@integer(100, 350)',
      num: '@zip',
      'keyword|2-5': ['标签@integer(1, 10)'],
      sale: '@integer(60, 100)',
      'status|1': ['onsale', 'unabled']
    }]
  }
})
const cascader = [
  {
    value: '1-1',
    label: '类目 1-1',
    children: [
      {
        value: '1-1-1',
        label: '类目 1-1-1'
      },
      {
        value: '1-1-2',
        label: '类目 1-1-2'
      }
    ]
  },
  {
    value: '1-2',
    label: '类目 1-2',
    children: [
      {
        value: '1-2-1',
        label: '类目 1-2-1'
      },
      {
        value: '1-2-2',
        label: '类目 1-2-2'
      }
    ]
  }
]
export default {
  item: {
    list () {
      return {
        code: '000000',
        ...productList,
        msg: ''
      }
    }
  },
  brand: {
    list () {
      return {
        code: '000000',
        ...productBrandList,
        msg: ''
      }
    }
  },
  category: {
    cascader () {
      return {
        code: '000000',
        data: cascader,
        msg: ''
      }
    },
    listCategory () {
      return {
        code: '000000',
        data: cascader,
        msg: ''
      }
    },
    listProp () {
      return {
        code: '000000',
        ...productAttributeList,
        msg: ''
      }
    },
    listSkuProp () {
      return {
        code: '000000',
        ...productAttributeList,
        msg: ''
      }
    }
  }
}
