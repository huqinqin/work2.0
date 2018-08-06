<template>
  <div class="crmContact">
    <h2>沟通纪录</h2>
    <Button type="primary" @click="back">返回</Button>
    <ul>
      <li>
        <span></span>
        <div><span>08-20 2018 10:09:09</span><span>未联系</span><span>电话沟通</span></div>
        <div><span>XX门店</span><span>XXsales</span></div>
        <div><span>备注:</span></div>
        <div><p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p></div>
      </li>
      <li>
        <span></span>
        <div><span>08-20 2018 10:09:09</span><span>未联系</span><span>电话沟通</span></div>
        <div><span>XX门店</span><span>XXsales</span></div>
        <div><span>备注:</span></div>
        <div><p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p></div>
      </li>
      <li>
        <span></span>
        <div><span>08-20 2018 10:09:09</span><span>未联系</span><span>电话沟通</span></div>
        <div><span>XX门店</span><span>XXsales</span></div>
        <div><span>备注:</span></div>
        <div><p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'crm-contact',
  methods: {
    back () {
      this.$router.push('/crm/CrmPoolCheck')
    }
  }
}
</script>

<style scoped>

</style>
