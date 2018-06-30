<template>
  <Form :model="googleAddress" :label-width="80">
  <!-- <input id="addressInput" class="ivu-input" type="text" /> -->
    <Row>
      <Col span="24">
        <FormItem label="地址">
          <input id="addressInput" class="ivu-input" v-model="googleAddress.detail" type="text" />
          <!-- <Input id="addressInput" placeholder="Enter something..."></Input> -->
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="街道">
          <Input v-model="googleAddress.address" placeholder="输入街道"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="城市">
          <Input v-model="googleAddress.city" placeholder="输入城市"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="洲">
          <Input v-model="googleAddress.state" placeholder="输入洲"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="邮编">
          <Input v-model="googleAddress.zipcode" placeholder="输入邮编"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="城市">
          <Input v-model="googleAddress.country" placeholder="输入城市"></Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import $S from 'scriptjs'
export default {
  name: 'InstallerReviewDetail',
  data () {
    return {
      googleAddress: {
        detail: '',
        address: '',
        street_number: null,
        street_name: null,
        city: null,
        state: null,
        zipcode: null,
        country: null,
        url: null,
        autocomplete: null
      },
      url: null
    }
  },
  methods: {
    getAddressComponents: function () {
      // Get the place details from the autocomplete object.
      var place = this.googleAddress.autocomplete.getPlace()
      // Get each component of the address from the place details
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0]

        switch (addressType) {
          case 'street_number':
            this.googleAddress.street_number = place.address_components[i]['short_name']
            break
          case 'route':
            this.googleAddress.street_name = place.address_components[i]['short_name']
            break
          case 'locality':
            this.googleAddress.city = place.address_components[i]['long_name']
            break
          case 'administrative_area_level_1':
            this.googleAddress.state = place.address_components[i]['short_name']
            break
          case 'postal_code':
            this.googleAddress.zipcode = place.address_components[i]['short_name']
            break
          case 'country':
            this.googleAddress.country = place.address_components[i]['short_name']
            break
        }
      }

      this.googleAddress.url = place.url
      this.googleAddress.address = this.googleAddress.street_number + ' ' + this.googleAddress.street_name
      this.googleAddress.location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
      this.googleAddress.detail = place.formatted_address
    }
  },
  mounted () {
    $S('https://maps.googleapis.com/maps/api/js?key=AIzaSyDabyPaD0P3qprjRU5K41iLIG0oiMUa0fg&libraries=places', () => {
      // get DOM input element where users will start typing addresses
      var inputElement = document.getElementById('addressInput')
      // create new google maps object
      this.googleAddress.autocomplete = new window.google.maps.places.Autocomplete(inputElement, {types: ['geocode']})
      // add event listener to trigger method getAddressComponents when user select an address
      this.googleAddress.autocomplete.addListener('place_changed', this.getAddressComponents)
    })
  }
}
</script>
<style lang="css" scoped>
</style>
