<template>
  <div>
    <AddAddressModel v-if="confirmAddAddress" :show-modal="confirmAddAddress"
                     @close="closeAddressModel"/>
    <google-map v-if="addressModal" :show-modal="addressModal" @close="setAddressModal(false)"
                :dataAddressUpdate="activeAddress"
                @confirm="confirmAddressAdd"/>
  </div>
</template>

<script>
import address from "@/mixin/address";
import AddAddressModel from "./AddAddressModel.vue";
import GoogleMap from "./GoogleMap.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    GoogleMap,
    AddAddressModel,
  },
  props: ['ShowAddressmodal'],
  mixins: [address],
  data() {
    return {
      AddAddress: false,
      confirmAddAddress: false,
    }
  },
  computed: {
    ...mapGetters('address', ['addressModal', 'activeAddress']),
  },
  watch: {},
  methods: {
    closeAddressModel() {
      this.addressmodal = false
      this.confirmAddAddress = false
      this.addressData = {}
    },

    async confirmAddressAdd(data) {
      console.log("confirmAddressAdd", data)
      this.addressData = JSON.parse(JSON.stringify(this.activeAddress));
      this.addressData.lat = data.lat
      this.addressData.lng = data.lng
      this.addressData.address_name = data.address_name
      this.addressData.street = data.street
      this.addressData.country_code = data.country_code
      this.addressData.city_name = data.city_name
      this.addressData.district = data.district
      this.addressData.zip = data.zip

      await this.setActiveAddress(this.addressData)
      await this.setAddressModal(false)
      this.confirmAddAddress = true
    },

    ...mapActions('address', ['setAddressModal', 'setActiveAddress']),
  },
  async mounted() {

  }


}
</script>
