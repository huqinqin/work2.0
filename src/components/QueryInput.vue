<template>
  <Poptip trigger="focus" class="select-pop" placement="bottom" popper-class="installer-popover">
    <i-input v-model="inputValue" @on-change="query"></i-input>
    <template slot="content">
      <div class="content" v-if="loading">
        数据加载中...
      </div>
      <div class="content" v-if="!loading && list.length">
        <ul>
          <li v-for="item in list" :key="item.id" @click="selItem(item)">
            <slot :item="item"></slot>
          </li>
        </ul>
      </div>
      <div class="content" v-if="!loading && list.length === 0">
        <p>没有结果，请稍后重试或者更换搜索条件</p>
      </div>
    </template>
  </Poptip>
</template>
<script>
export default {
  name: 'QueryInput',
  props: {
    remote: {
      type: Function,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      clock: null,
      loading: false,
      inputValue: '',
      list: []
    }
  },
  methods: {
    query () {
      if (this.inputValue) {
        this.loading = true
        clearTimeout(this.clock)
        this.clock = setTimeout(() => {
          this.remote().then(data => {
            this.loading = false
            this.list = data
          })
        }, 500)
      }
    },
    selItem (item) {
      this.$emit('change', item)
    }
  }
}
</script>
<style lang="css" scoped>
.content li{
  display: block;
  list-style-type: none;
}
</style>
