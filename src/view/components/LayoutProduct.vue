<template>
  <li class="fiveDis">
    <div class="product">
      <div class="operate-list" @click.capture="handleButton">
        <ButtonGroup vertical>
          <Button type="primary" icon="edit">编辑</Button>
          <Button type="primary" icon="trash-a">删除</Button>
          <Button type="primary" icon="arrow-left-a">左移</Button>
          <Button type="primary" icon="arrow-right-a">右移</Button>
        </ButtonGroup>
      </div>
      <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + product.id" target="_blank">
        <div class="img" :style="{backgroundImage : 'url(' + product.image + '!item_middle)'}"></div>
        <p :title="product.title" class="name">{{product.name}}</p>
        <div class="item-price">
          <p class="price">
            <span class="realPrice">
              <span>{{ product.realPrice | formatPrice}}</span>
            </span>
            <span class="oldPrice">
              <span>{{ product.oldPrice | formatPrice}}</span>
            </span>
          </p>
          <button class="iconfont icon-gouwuche2 add-to-cart"></button>
        </div>
      </a>
    </div>
  </li>
</template>
<script>
import trim from 'lodash.trim'
export default {
  name: 'LayoutProduct',
  data () {
    return {
    }
  },
  props: {
    product: {
      id: '',
      image: '',
      name: '',
      realPrice: '',
      oldPrice: ''
    },
    index: Number
  },
  filters: {
    formatPrice (val) {
      return `$${(val / 100).toFixed(2)}`
    }
  },
  methods: {
    handleButton () {
      const operate = trim(event.target.innerText)
      this.$emit('handle', this.index, operate)
    }
  }
}
</script>
<style lang="less" scoped>
.product{
  position: relative;
  & .operate-list{
    display: none;
  }
  &:hover .operate-list{
    left: 0;
    display: inline;
  }
}
li {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background-color: white;
}
li:hover {
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
li {
  transition: all ease 0.2s;
  width: 290px;
  overflow: hidden;
  /*margin-top: 36px;*/
  border: 1px solid #f2f2f2;
  margin-bottom: 12px;
  margin-right: 12px;
  .img {
    width: 100%;
    height: 222px;
    background-position: center center;
    background-size: 190px auto;
    background-repeat: no-repeat;
    transition: all ease 0.4s;
  }
  p.name {
    text-align: center;
    margin: 10px;
    font-size: 14px;
    color: #a3a3a3;
    line-height: 18px;
    height: 54px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .item-price {
    border-top: solid 1px #f2f2f2;
    color: #ff3d41;
    font-size: 26px;
    font-weight: bold;
    margin-top: 24px;
    padding: 24px 8px 30px 24px;
    display: flex;
    align-items: center;
    .price {
      flex: 1;
      .oldPrice {
        font-size: 14px;
        top: 12px;
        text-decoration: line-through;
        color: #a3a3a3;
      }
    }
    .add-to-cart {
      right: 8px;
      bottom: 30px;
      font-size: 16px;
      color: #ff3b41;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #ff3b41;
      line-height: 30px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  position: relative;
  .handle {
    display: flex;
    button {
      width: 50%;
      height: 52px;
      background: red;
      border: none;
      color: #fff;
      font-size: 29px;
      i {
        font-size: 29px;
      }
    }
    button.add-to-cart {
      background: #ce2127;
    }
    button.add-to-cart:focus {
      background: #9b0e13;
      border: none;
    }
    button.favo {
      background: #999;
    }
    button.favo:focus {
      background: #666;
      border: none;
    }
  }
}
li::after {
  content: '';
  width: 260px;
  height: 1px;
  background: #ddd;
  position: absolute;
  top: 100%;
  left: 15px;
}
.fiveDis::before {
  content: '';
  width: 50px;
  height: 50px;
  position: absolute;
  top: 12px;
  left: 12px;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 50px 50px;
}
</style>
