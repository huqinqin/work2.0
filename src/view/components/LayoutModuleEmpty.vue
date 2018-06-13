<template>
  <div class="empty-column">
    <div class="operate-list">
      <ButtonGroup vertical>
        <Button type="ghost" icon="edit">编辑</Button>
        <Button type="ghost" icon="trash-a">删除</Button>
        <Button type="ghost" icon="arrow-up-a">上移</Button>
        <Button type="ghost" icon="arrow-down-a">下移</Button>
      </ButtonGroup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutEmptyModule',
  data () {
    return {
    }
  }
}
</script>
<style lang="css" scoped>
</style>
