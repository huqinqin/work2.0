import Mock from 'mockjs'
const home = Mock.mock({
  'content': [
    {
      type: 'carousel',
      name: 'LayoutModuleCarousel',
      'data|12-5': [{
        name: '@name',
        url: '@image(400x200)',
        link: '@url'
      }]
    }, {
      type: 'fix',
      name: 'LayoutModuleFixImg',
      data: {
        left: {link: '@url', url: '@image(200x200)', name: '@name'},
        rightTop: {link: '@url', url: '@image(200x200)', name: '@name'},
        rightBottom: {link: '@url', url: '@image(200x200)', name: '@name'}
      }
    }, {
      type: 'floor',
      name: 'LayoutModuleFloor',
      data: {
        name: '@name',
        link: '@url',
        'products|5-10': ['@id']
      }
    }, {
      type: 'floor',
      name: 'LayoutModuleFloor',
      data: {
        name: '@name',
        link: '@url',
        'products|5-10': ['@id']
      }
    }, {
      type: 'floor',
      name: 'LayoutModuleFloor',
      data: {
        name: '@name',
        link: '@url',
        'products|5-10': ['@id']
      }
    }
  ]
})
const promo = Mock.mock({
  data: {
    id: '@id',
    name: '@name',
    content: [
      {
        type: 'banner',
        data: {
          img: '@image(400x200)',
          link: '@url'
        }
      }, {
        type: 'desc',
        data: '2333333333333333333333333'
      }, {
        type: 'product',
        'data|4-9': ['@id']
      }, {
        type: 'floor',
        data: {
          name: '@name',
          'products|3-9': ['@id']
        }
      }
    ]
  }
})
const promoList = Mock.mock({
  data: {
    'list|3-9': [
      {
        name: '@name'
      }
    ]
  }
})

export default {
  home: {
    get () {
      return {
        code: '000000',
        data: {
          ...home
        },
        msg: ''
      }
    },
    save () {
      return {
        code: '000000',
        data: 'success',
        msg: ''
      }
    }
  },
  promo: {
    get () {
      return {
        code: '000000',
        ...promo,
        msg: ''
      }
    },
    save () {
      return {
        code: '000000',
        data: 'success',
        msg: ''
      }
    },
    list () {
      return {
        code: '000000',
        ...promoList,
        msg: ''
      }
    }
  }

}
