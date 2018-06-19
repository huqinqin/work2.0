<template>
  <div class="module-content module-intro">
    <p class="navBarSave">{{data}}</p>
    <!-- <p class="navBarDate">
      <span class="navBarDate1">Good Through:</span>
      <span>05/04/18</span>
      <span>-</span>
      <span>05/31/18</span>
    </p> -->
    <Modal
        v-model="modal"
        title="Common Modal dialog box title"
        @on-ok="save">
        <Input v-model="value" placeholder="说明内容"></Input>
    </Modal>
    <div class="operate-list" @click.capture="handleButton()">
      <ButtonGroup vertical>
        <Button type="primary" icon="edit">编辑</Button>
        <Button type="primary" icon="trash-a">删除</Button>
        <Button type="primary" icon="arrow-up-a">上移</Button>
        <Button type="primary" icon="arrow-down-a">下移</Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
import trim from 'lodash.trim'
export default {
  name: 'LayoutModuleIntro',
  data () {
    return {
      modal: false,
      value: ''
    }
  },
  props: {
    data: String,
    index: Number
  },
  methods: {
    handleButton () {
      const operate = trim(event.target.innerText)
      if (operate === '编辑') {
        this.modal = true
      } else {
        this.$emit('handle', this.index, operate)
      }
    },
    save () {
      this.$emit('update', this.index, this.value)
    }
  }
}
</script>
<style lang="less" scoped>
.module-intro{
  width: 100%;
  background-color: #D82929;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  line-height: 60px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navBarSave {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .navBarDate {
    color: #fff;
    font-size: 18px;
  }
}
</style>
