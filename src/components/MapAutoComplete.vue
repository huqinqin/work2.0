<template>
  <Form :model="googleAddress" label-position="top" ref="form" :rules="rules">
    <div class="layout-column">
      <div class="layout-cell" v-if="googleAddress.hasOwnProperty('receiver')">
        <form-item label="收货人" prop="receiver">
          <i-input v-model="googleAddress.receiver" placeholder="输入收货人"></i-input>
        </form-item>
      </div>
      <div class="layout-cell" v-if="googleAddress.hasOwnProperty('telnum')">
        <form-item label="联系电话" prop="telnum">
          <i-input v-model="googleAddress.telnum" placeholder="输入联系电话"></i-input>
        </form-item>
      </div>
    </div>
    <div class="layout-column">
      <div class="layout-cell flex-item">
        <form-item label="地址" prop="detail">
          <input id="addressel-input" class="ivu-input" v-model="googleAddress.detail" type="text" />
        </form-item>
      </div>
    </div>
    <div class="layout-column">
      <div class="layout-cell flex-item">
        <form-item label="街道" prop="street">
          <i-input v-model="googleAddress.street" placeholder="输入街道"></i-input>
        </form-item>
      </div>
    </div>
    <div class="layout-column">
      <div class="layout-cell">
        <form-item label="城市" prop="city">
          <i-input v-model="googleAddress.city" placeholder="输入城市"></i-input>
        </form-item>
      </div>
      <div class="layout-cell">
        <form-item label="州" prop="state">
          <i-input v-model="googleAddress.state" placeholder="输入州"></i-input>
        </form-item>
      </div>
      <div class="layout-cell">
        <form-item label="邮编" prop="zip">
          <i-input v-model="googleAddress.zip" placeholder="输入邮编"></i-input>
        </form-item>
      </div>
      <div class="layout-cell">
        <form-item label="国家" prop="country">
          <i-input v-model="googleAddress.country" placeholder="输入国家"></i-input>
        </form-item>
      </div>
      <div class="layout-cell" v-if="googleAddress.hasOwnProperty('company')">
        <form-item label="公司" prop="company">
          <i-input v-model="googleAddress.company" placeholder="输入公司"></i-input>
        </form-item>
      </div>
      <div class="layout-cell" v-if="googleAddress.hasOwnProperty('isDefault')">
        <form-item label="">
          <i-checkbox v-model="googleAddress.isDefault">设为默认地址</i-checkbox>
        </form-item>
      </div>
    </div>
  </Form>
</template>
<script>
import $S from 'scriptjs'
export default {
  name: 'MapAutoComplete',
  props: {
    googleAddress: {
      type: Object,
      default () {
        return {
          detail: '',
          street: '',
          street_number: null,
          street_name: null,
          city: null,
          state: null,
          zip: null,
          country: null,
          url: null,
          lat: '', // 纬度
          lng: '' // 经度
        }
      }
    }
  },
  data () {
    return {
      autocomplete: null,
      url: null,
      rules: {
        company: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        receiver: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        telnum: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        detail: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        street: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        city: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        state: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        country: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        zip: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    valid () {
      return this.$refs.form.validate()
    },
    clearValid () {
      this.$refs.form.resetFields()
    },
    getAddressComponents: function () {
      // Get the place addrs from the autocomplete object.
      var place = this.autocomplete.getPlace()
      // console.log("place", JSON.stringify(place, null, 2));
      // Get each component of the address from the place addrs
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0]

        switch (addressType) {
          case 'street_number':
            this.googleAddress.street_number =
              place.address_components[i]['short_name']
            break
          case 'route':
            this.googleAddress.street_name =
              place.address_components[i]['short_name']
            break
          case 'locality':
            this.googleAddress.city = place.address_components[i]['long_name']
            break
          case 'administrative_area_level_1':
            this.googleAddress.state = place.address_components[i]['short_name']
            break
          case 'postal_code':
            this.googleAddress.zip = place.address_components[i]['short_name']
            break
          case 'country':
            this.googleAddress.country =
              place.address_components[i]['short_name']
            break
        }
      }

      this.googleAddress.url = place.url
      this.googleAddress.street =
        this.googleAddress.street_number + ' ' + this.googleAddress.street_name
      this.googleAddress.lat = place.geometry.location.lat()
      this.googleAddress.lng = place.geometry.location.lng()
      this.googleAddress.detail = place.formatted_address
      this.$refs.form.validate()
    }
  },
  mounted () {
    $S(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDabyPaD0P3qprjRU5K41iLIG0oiMUa0fg&libraries=places',
      () => {
        // get DOM input element where users will start typing addresses
        var inputElement = document.getElementById('addressel-input')
        // create new google maps object
        this.autocomplete = new window.google.maps.places.Autocomplete(
          inputElement,
          { types: ['geocode'] }
        )
        // add event listener to trigger method getAddressComponents when user select an address
        this.autocomplete.addListener(
          'place_changed',
          this.getAddressComponents
        )
      }
    )
  }
}
</script>
<style lang="less">
</style>
