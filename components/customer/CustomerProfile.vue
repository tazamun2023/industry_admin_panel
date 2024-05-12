<script>

import {mapActions, mapGetters} from "vuex";
import customer from "@/mixin/customer";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import LangInput from "@/components/langInput.vue";

export default {
  name: 'CustomerProfile',
  middleware: ['common-middleware', 'auth'],
  mixins: [customer],
  components: {ValidationObserver, ValidationProvider, LangInput},

  props: {
    customer_id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      hasError: false,
      fromData: {
        id: '',
        company_name: {'ar': '', 'en': ''},
        business_type: '',
        billing_email: '',
        building_number: '',
        is_import: '',
        verified: 0,
        street_name: '',
        license_number: '',
        expiry_date: '',
        street: '',
        country_id: '',
        city_id: '',
        post_box: '', //zip
        status: '',
      }
    }
  },

  methods: {
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },

    async countrySelected() {
      let countryId = this.fromData.country_id;
      if (countryId) {
        try {
          await this.getCitiesById({id: countryId, api: 'getAllCityById', mutation: 'SET_ALL_Cities'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    },


    ...mapActions('customer', ['submitData', 'getCustomerData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),
  },

  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('customer', ['customerList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById'])

  },
  watch: {
    customerList() {
      this.fromData.company_name = this.customerList?.data?.company_name
      this.fromData.billing_email = this.customerList?.data?.billing_email
      this.fromData.business_type = this.customerList?.data?.business_type
      this.fromData.building_number = this.customerList?.data?.building_number
      this.fromData.street_name = this.customerList?.data?.street_name
      this.fromData.post_box = this.customerList?.data?.post_box
      this.fromData.verified = this.customerList?.data?.verified
      this.fromData.is_import = this.customerList?.data?.is_import
      this.fromData.status = this.customerList?.data?.status
      this.fromData.license_number = this.customerList?.data?.license_number
      this.fromData.expiry_date = this.customerList?.data?.expiry_date
      this.fromData.city_id = this.customerList?.data?.city_id
    }
  },

  async mounted() {
    if (!this.fromData.id) {
      this.fromData.id = this.customer_id
    }
    try {
      await this.getCustomerData({id: this.customer_id, params: '', api: 'getCustomers'})

      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(() => {
        this.fromData.country_id = this.customerList.data.country_id
        this.countrySelected()
      })
    } catch (e) {
      return this.$nuxt.error(e)
    }
  }
}
</script>

<template>
  <div>
    <div class="grid gap-6 grid-cols-5">
                <div class="flex col-span-3 gap-4">
                    <div class="w-[200px]">
<!--                      <img class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto" :src="vendorInfo.vendor?.image" alt="">-->
                      <img class="mt-2 rounded-lg mx-auto" src="~/assets/icon/blogo.svg" alt="">
                      <!-- <lazy-image
                        class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto"
                        :data-src="image"
                        :alt="tt"
                      /> -->
                    </div>
                    <div>
                      <h3 class="font-bold py-2 flex gap-4"><span> Company Name  </span> <img class="w-6 h-6" src="~/assets/icon/SVG.svg" alt=""></h3>
                      <span class="p-1 bg-smooth text-theem rounded-lg">subDomain Name</span>
                      <p class="font-16px pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
                      <span class="flex items-center gap-2 bg-theem text-white px-3 py-1 rounded-lg w-[150px] mt-[50px]"><img class="w-4 h-4" src="~/assets/icon/paperclip-2.svg" alt=""> Show Licence</span>
                    </div>
                </div>
                <div class="col-span-2">
                  <p><span class="text-primary">CR No.</span> <span>123456789</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/smsgreen.svg" alt=""> <span> example@email.com </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/callgreen.svg" alt=""> <span> +966 55555555 </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/locationgreen.svg" alt=""> <span> jeddah,Soudi Arabia</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Foundation Date</span> <span class="text-theem">29 Fab 2024</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Production Start Date</span> <span class="text-theem">29 Fab 2024</span></p>
                <div class="flex gap-6 py-3">
                  <div>
                    <img class="" src="~/assets/icon/FaceBook-g.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/YouTube-g.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/Linkeding.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/Whatsupg.svg" alt="">
                  </div>
                </div>
                </div>
            </div>
  </div>
</template>

<style scoped>

</style>
