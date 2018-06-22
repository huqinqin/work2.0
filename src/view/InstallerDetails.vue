<template>
  <div class="details">
    <card class="baseData">
      <p slot="title">基础信息</p>
      <table border="1" class="baseDataTable">
        <tr>
          <td class="speTd">公司名</td>
          <td>8447466</td>
          <td class="speTd">姓名</td>
          <td>full name</td>
        </tr>
        <tr>
          <td class="speTd">公司电话</td>
          <td>Windir</td>
          <td class="speTd">手机</td>
          <td>2543222</td>
        </tr>
        <tr>
          <td class="speTd">邮箱</td>
          <td>eeeeee@</td>
          <td class="speTd">行业类型</td>
          <td>eeee</td>
        </tr>
        <tr>
          <td class="speTd">申请时间</td>
          <td>1984年6月22日</td>
          <td class="speTd">分配时间</td>
          <td>2017-07-24 17:25:38</td>
        </tr>
        <tr>
          <td class="speTd">详细地址</td>
          <td>详细地址+城市+州+ 国家， zip code</td>
          <td class="speTd">来源</td>
          <td>app端</td>
        </tr>
        <tr>
          <td class="speTd">门店/销售</td>
          <td></td>
          <td class="speTd">Cust id</td>
          <td></td>
        </tr>
      </table>
    </card>
    <card class="countData">
      <p slot="title">统计信息</p>
      <Table border :columns="countTitle" :data="countData"></Table>
    </card>
    <card class="addressData">
      <p slot="title">地址信息</p>
      <Table border :columns="addressTitle" :data="addressData"></Table>
    </card>
    <card class="distributionData">
      <p slot="title">分销证信息</p>
      <Table border :columns="distributionTitle" :data="distributionData"></Table>
    </card>
    <card class="cardData">
      <p slot="title">信用卡信息</p>
      <Table border :columns="cardTitle" :data="cardData"></Table>
    </card>
    <card class="orderData">
      <p slot="title">订单记录</p>
      <Table border :columns="orderTitle" :data="orderData"></Table>
    </card>
  </div>
</template>
<script>
export default {
  name: 'InstallerDetails',
  data () {
    return {
      countTitle: [
        {
          title: '消费金额',
          key: 'money'
        },
        {
          title: '账期额度（可用额度）',
          key: 'account'
        },
        {
          title: '账期天数',
          key: 'accountDays'
        },
        {
          title: '信用卡张数',
          key: 'cards'
        }, {
          title: '订单数量',
          key: 'orderNum'
        },
        {
          title: '可用积分',
          key: 'integral'
        },
        {
          title: '成长值',
          key: 'growthValue'
        },
        {
          title: '优惠券（张）',
          key: 'couponNum'
        },
        {
          title: '关注',
          key: 'follow'
        },
        {
          title: '商品评价',
          key: 'evaluate'
        },
        {
          title: '退货记录',
          key: 'returnGoods'
        },
        {
          title: '登录次数',
          key: 'loginNum'
        }, {
          title: '粉丝',
          key: 'fans'
        },
        {
          title: '收藏商品',
          key: 'collection'
        },
        {
          title: '收藏专题',
          key: 'collectionTheme'
        },
        {
          title: '收藏话题',
          key: 'collectionTopic'
        }
      ],
      countData: [
        {
          money: '34534.56',
          account: 2000,
          accountDays: 30,
          cards: 5,
          orderNum: 45,
          integral: 18,
          growthValue: 78,
          couponNum: 3,
          follow: 66,
          evaluate: 18,
          returnGoods: 67,
          loginNum: 67,
          fans: 99,
          collection: 18,
          collectionTheme: 77,
          collectionTopic: 55
        }
      ],
      addressTitle: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号码',
          key: 'phone'
        },
        {
          title: '详细地址',
          key: 'detailAddress'
        },
        {
          title: '邮编',
          key: 'zipcode'
        },
        {
          title: '默认地址',
          key: 'defaultFlag'
        },
        {
          title: '默认地址',
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
                  click: () => {}
                }
              }, '默认')
            ])
          }
        }
      ],
      addressData: [
        {
          name: 'apple',
          phone: 5612554587,
          detailAddress: '荆常大道',
          zipcode: 568954,
          defaultFlag: 45
        }
      ],
      distributionTitle: [
        {
          title: '分销证图片',
          key: 'picUrl'
        },
        {
          title: '分销证号',
          key: 'num'
        },
        {
          title: '公司名',
          key: 'companyName'
        },
        {
          title: '详细地址',
          key: 'detailAddress'
        },
        {
          title: '邮编',
          key: 'zipcode'
        },
        {
          title: '有效期',
          key: 'validityTime'
        },
        {
          title: '上传时间',
          key: 'uploadTime'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      distributionData: [
        {
          picUrl: '',
          num: '0001',
          companyName: '杭州玄同科技',
          detailAddress: '荆常大道',
          zipcode: 562345,
          validityTime: '2018-05-06',
          uploadTime: '2018-05-06',
          status: '有效'
        }
      ],
      cardTitle: [
        {
          title: '信用卡',
          key: 'picUrl'
        },
        {
          title: '卡号',
          key: 'num'
        },
        {
          title: '持卡人',
          key: 'name'
        },
        {
          title: '账单地址',
          key: 'detailAddress'
        },
        {
          title: '邮编',
          key: 'zipcode'
        },
        {
          title: 'CVV',
          key: 'CVV'
        },
        {
          title: '上传时间',
          key: 'uploadTime'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      cardData: [
        {
          picUrl: '',
          num: '0001',
          name: '杭州玄同科技',
          detailAddress: '荆常大道',
          zipcode: 562345,
          CVV: '不知道是啥',
          uploadTime: '2018-05-06',
          status: '有效'
        }
      ],
      orderTitle: [
        {
          title: '订单编号',
          key: 'orderNum'
        },
        {
          title: '提交时间',
          key: 'uploadTime'
        },
        {
          title: '用户账号',
          key: 'account'
        },
        {
          title: '订单金额',
          key: 'money'
        },
        {
          title: '支付方式',
          key: 'payType'
        },
        {
          title: '订单来源',
          key: 'source'
        },
        {
          title: '订单状态',
          key: 'status'
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
                  }
                }
              }, '查看详情')
            ])
          }
        }
      ],
      orderData: [
        {
          orderNum: '12356784',
          uploadTime: '2018-08-09',
          account: 'sanifhi001',
          money: '562354.12',
          payType: '支付宝',
          zipcode: 562345,
          source: '商城',
          status: '待发货'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .details {
    .ivu-card {
      margin-bottom: 15px;
    }
    .baseDataTable {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #e9eaec;
      color: #495060;
      font-size: 12px;
      background-color: #fff;
      td {
        min-width: 0;
        width: 40%;
        height: 48px;
        padding-left: 18px;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
      .speTd {
        width: 10%;
        background-color: #f8f8f9;
      }
    }
  }
</style>
