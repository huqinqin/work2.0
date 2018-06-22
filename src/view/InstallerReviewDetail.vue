<template>
  <Form :model="myInstanceAddress" :label-width="80">
  <!-- <input id="addressInput" class="ivu-input" type="text" /> -->
    <Row>
      <Col span="24">
        <FormItem label="地址">
          <input id="addressInput" class="ivu-input" type="text" />
          <!-- <Input id="addressInput" placeholder="Enter something..."></Input> -->
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="街道">
          <Input v-model="myInstanceAddress.address" placeholder="输入街道"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="城市">
          <Input v-model="myInstanceAddress.city" placeholder="输入城市"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="洲">
          <Input v-model="myInstanceAddress.state" placeholder="输入洲"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="邮编">
          <Input v-model="myInstanceAddress.zipcode" placeholder="输入邮编"></Input>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="城市">
          <Input v-model="myInstanceAddress.country" placeholder="输入城市"></Input>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'InstallerReviewDetail',
  data () {
    return {
      googleAddress: {
        street_number: null,
        street_name: null,
        city: null,
        state: null,
        zipcode: null,
        country: null,
        url: null,
        autocomplete: null
      },
      myInstanceAddress: {
        address: null,
        city: null,
        state: null,
        zipcode: null,
        country: null
      },
      googleAutoCompleteInput: 'addressInput',
      url: null
    }
  },
  methods: {
    updateAddress: function () {
      // assign required values to my instance property
      this.myInstanceAddress.address = this.googleAddress.street_number + ' ' + this.googleAddress.street_name
      this.myInstanceAddress.city = this.googleAddress.city
      this.myInstanceAddress.state = this.googleAddress.state
      this.myInstanceAddress.zipcode = this.googleAddress.zipcode
      this.myInstanceAddress.country = this.googleAddress.country
    },
    getAddressComponents: function () {
      // Get the place details from the autocomplete object.
      var place = this.googleAddress.autocomplete.getPlace()

      console.log('getAddressComponents', place)

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
      // call instance or component method. it will be used to update its addresses properties
      this.updateAddress()
    }
  },
  mounted () {
    // get DOM input element where users will start typing addresses
    var inputElement = document.getElementById(this.googleAutoCompleteInput)
    // create new google maps object
    this.googleAddress.autocomplete = new window.google.maps.places.Autocomplete(inputElement, {types: ['geocode']})

    // add event listener to trigger method getAddressComponents when user select an address
    this.googleAddress.autocomplete.addListener('place_changed', this.getAddressComponents)
  }
}
</script>
<style lang="css" scoped>
</style>
