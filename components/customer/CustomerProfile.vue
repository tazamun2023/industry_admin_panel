<script>

import {mapActions, mapGetters} from "vuex";
import customer from "@/mixin/customer";

export default {
  name: 'CustomerProfile',
  middleware: ['common-middleware', 'auth'],
  mixins: [customer],
  props:{
    customer_id:{
      type:String,
      required:true
    }
  },

  data() {
    return {
      hasError: false,
      fromData: {
        id:'',
        company_name: {'ar':'', 'en':''},
        business_type: '',
        billing_email: '',
        building_number: '',
        is_import: '',
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

  methods:{
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },

    async countrySelected() {
      let countryId = this.fromData.country_id;
      if(countryId){
        try {
          await  this.getCitiesById({id: countryId,api: 'getAllCityById', mutation: 'SET_ALL_Cities' })
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    },


    ...mapActions('customer', ['submitData', 'getCustomerData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),
  },

  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('customer', ['customerList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById'])

  },
  watch:{
    customerList(){
      this.fromData.company_name = this.customerList?.data?.company_name
      this.fromData.billing_email = this.customerList?.data?.billing_email
      this.fromData.business_type = this.customerList?.data?.business_type
      this.fromData.building_number = this.customerList?.data?.building_number
      this.fromData.street_name = this.customerList?.data?.street_name
      this.fromData.post_box = this.customerList?.data?.post_box
    }
  },

  async mounted() {
    if(!this.fromData.id){
      this.fromData.id = this.customer_id
    }
    try {
      await this.getCustomerData({  id: this.customer_id, params:'', api:'getCustomers'})

      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(()=>{
        this.fromData.country_id= this.customerList.data.country_id
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
    <template>
      <div class="card p-4">
        <form action="">
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Company name') }}:</label>
            <lang-input :hasError="hasError" type="text" :title="$t('customer.Company name')" :valuesOfLang="fromData.company_name"
                        @updateInput="updateInput"></lang-input>
          </div>
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Billing email address') }}:</label>
            <input type="email" :placeholder="$t('customer.Billing email address')" v-model="fromData.billing_email">
          </div>
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Business type') }}:</label>
            <input type="text" :placeholder="$t('customer.Business type')" v-model="fromData.business_type">
          </div>
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Building number or name') }}:</label>
            <input type="text" :placeholder="$t('customer.Building number or name')" v-model="fromData.building_number">
          </div>
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Street name') }}:</label>
            <input type="text" :placeholder="$t('customer.Street name')" v-model="fromData.street_name">
          </div>
          <div class="input-wrapper mb-2">
            <label for="">{{ $t('customer.Zip Code') }}:</label>
            <input type="text" :placeholder="$t('customer.Zip Code')" v-model="fromData.post_box">
          </div>
          <div class="input-wrapper mb-2">
            <div class="flex w-full gap-4">
              <div class="input-wrapper w-full">
                <label class="w-full" for="">{{ $t('customer.Country') }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id" :disabled="true">
                  <option value="">{{ $t('customer.Choose Country') }} </option>
                  <option :value="countryList.id" v-for="countryList in allCountries" :selected="countryList.id === fromData.country_id">{{ countryList.name }}</option>
                </select>
              </div>
              <div class="input-wrapper w-full">
                <label class="w-full" for="">{{ $t('vendor.city') }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                  <option value="">{{ $t('customer.Choose City') }} </option>
                  <option :value="cityList.id" v-for="cityList in allCitiesById" :selected="cityList.id === fromData.city_id">{{ cityList.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="input-wrapper text-end mb-2">
            <button class="bg-primary p-2 border border-smooth rounded leading-3 text-white hover:text-primary">
              {{ $t('customer.Save Changes') }}
            </button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
