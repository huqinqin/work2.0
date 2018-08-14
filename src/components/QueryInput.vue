<template>
  <Poptip trigger="focus" class="select-pop" placement="bottom" popper-class="installer-popover">
    <i-input v-model="inputValue" @on-change="query"></i-input>
    <template slot="content">
      <div class="content" v-if="list.length">
        <ul>
          <li v-for="item in list" :key="item.id" @click="selItem(item)">
            <slot></slot>
          </li>
        </ul>
      </div>
      <div class="content" v-if="list.length">
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
            this.list = data
          })
        }, 800)
      }
    },
    selItem (item) {
      this.$emit('change', item)
    }
  }
}
</script>
<style lang="css" scoped>
</style>
