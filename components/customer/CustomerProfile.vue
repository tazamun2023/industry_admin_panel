<script>

import {mapActions, mapGetters} from "vuex";
import customer from "@/mixin/customer";
import LangInput from "@/components/langInput.vue";

export default {
  name: 'CustomerProfile',
  middleware: ['common-middleware', 'auth'],
  mixins: [customer],
  components: {LangInput},
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

    ...mapActions('customer', ['submitData', 'getCustomerData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),
  },

  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('customer', ['customerList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById'])

  },
  watch: {
  },

  async mounted() {
    if (!this.fromData.id) {
      this.fromData.id = this.customer_id
    }
    try {
      await this.getCustomerData({id: this.customer_id, params: '', api: 'getCustomers'})
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
                      <img v-if="customerList?.data.logo" class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto" :src="customerList?.data.logo" alt="">
                      <img v-else class="mt-2 rounded-lg mx-auto" src="~/assets/uploads/default-image.webp" alt="">

                    </div>
                    <div>
                      <h3 class="font-bold py-2 flex gap-4"><span>{{ customerList?.data?.company_name[currentLanguage.code]}}</span> <img class="w-6 h-6" src="~/assets/icon/SVG.svg" alt=""></h3>
                      <span class="flex items-center gap-2 bg-theem text-white px-3 py-1 rounded-lg w-[150px] mt-[50px]"><img class="w-4 h-4" src="~/assets/icon/paperclip-2.svg" alt=""> Show Licence</span>
                    </div>
                </div>
                <div class="col-span-2">
                  <p><span class="text-primary">License Number.</span> <span>{{ customerList?.data?.license_number }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/smsgreen.svg" alt=""> <span>{{ customerList?.data?.billing_email }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/callgreen.svg" alt=""> <span> {{ customerList?.data?.billing_mobile }} </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/locationgreen.svg" alt=""> <span> {{customerList?.data?.city}}, {{customerList?.data?.country}}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Building Number: </span> <span class="text-theem">{{ customerList?.data.building_number }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Street</span> <span class="text-theem">{{ customerList?.data.street_name }}</span></p>
                </div>
            </div>
  </div>
</template>

<style scoped>

</style>
