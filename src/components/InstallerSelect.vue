<template>
  <Row>
    <i-col span="4">
      <Select v-model="installerType">
        <Option value="storeCode">Cust ID</Option>
        <Option value="storeName">公司名称</Option>
        <Option value="account">账号</Option>
        <Option value="mobile">电话</Option>
        <Option value="contactEmail">邮箱</Option>
      </Select>
    </i-col>
    <i-col span="20">
      <!-- <i-select
          v-model="installerValue"
          multiple
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading">
          <Option v-for="option in options" :value="option.userId" :key="option.userId">
            {{option.userId}} - {{option.storeId}}
          </Option>
      </i-select> -->
      <Select
            v-model="model14"
            multiple
            filterable
            remote
            :remote-method="remoteMethod2"
            :loading="loading2">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
        </Select>
      {{options}}
      <Poptip trigger="focus" class="select-pop" placement="bottom" popper-class="installer-popover">
        <i-input v-model="installerValue" @on-change="queryInstaller"></i-input>
        <template slot="content">
          <div class="content" v-if="options.length">
            <ul class="installer-list">
              <li v-for="options in options" :key="options.userId" @click="checkInstaller(options)">
                {{options.storeName}} - {{options.storeCode}}
              </li>
            </ul>
          </div>
          <div class="content" v-if="installerValue && loading && !options.length">
            <p>没有结果，请稍后重试或者更换搜索条件</p>
          </div>
        </template>
      </Poptip>
    </i-col>
  </Row>
</template>
<script>
export default {
  name: 'InstallerSelect',
  data () {
    return {
      installerType: 'storeCode',
      installerValue: '',
      loading: false,
      options: [],
      model14: [],
      loading2: false,
      options2: [],
      list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
    }
  },
  methods: {
    remoteMethod2 (query) {
      if (query !== '') {
        this.loading2 = true
        setTimeout(() => {
          this.loading2 = false
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            }
          })
          this.options2 = list
        }, 200)
      } else {
        this.options2 = []
      }
    },
    queryInstaller () {
      if (this.installerValue !== '') {
        this.loading = true
        return this.$http.queryQuotationInstaller({
          [this.installerType]: this.installerValue
        }).then(data => {
          this.options = data.reduce((list, item) => {
            const array = item.userResponses.map(({id, account, email, mobile, firstName, lastName}) => ({
              storeCode: item.code,
              storeName: item.address.company,
              address: item.address.detail,
              storeId: item.id,
              account: account,
              userId: id,
              userEmail: email,
              userMobile: mobile,
              name: firstName + ' ' + lastName,
              accountNotes: '',
              custNotes: ''
            }))
            return list.concat(array)
          }, [])
          console.log('options', this.options.length)
          this.loading = false
        }, msg => {
          // this.options = []
          // this.loading = false
        })
      } else {
        // this.options = []
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
