<template>

<!--    <div>
      <div class="card p-4" v-show="errors.length">
        <ul
          class="error-list mb-15"
        >
          <li
            class="mb-10"
          >
            {{ $t('forgotPassword.errorOccurred') }}
          </li>
          <li
            v-for="(value, index) in errors"
            :key="index"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </div>-->

  <div>
    <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="fromSubmit">
      <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="card p-4">
          <div class="title">
            <h4>General Information</h4>
          </div>

          <div class="form-group">
            <ValidationProvider name="Name Arabic" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('global.name') }}</label>
                <input type="text" v-model="fromData.name.ar" >
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.name')}) }}
              </span>
            </div>
              </ValidationProvider>

            <ValidationProvider name="Name English" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('global.name') }}</label>
                <input type="text" v-model="fromData.name.en" >
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.name')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="Details English" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t("vendor.details") }}</label>
              <input type="text" placeholder="Details English" v-model="fromData.details.en">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.details')}) }}
              </span>
            </div>
            </ValidationProvider>


            <ValidationProvider name="Details Arabic" rules="max:30|required" v-slot="{ errors }">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t("vendor.details") }}</label>
                <input type="text" placeholder="Details Arabic" v-model="fromData.details.ar">
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.details')}) }}
              </span>
              </div>
            </ValidationProvider>


            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.subdomain') }}</label>
              <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
            </div>

            <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.email') }}</label>
                <input type="text" :placeholder="$t('vendor.email')" v-model="fromData.contact_json.email" >
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.email')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="email" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.mobile') }}</label>
              <input type="text" :placeholder="$t('vendor.mobile')" v-model="fromData.contact_json.mobile">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.mobile')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="email" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.cr_number') }}</label>
              <input type="text" placeholder="CR Number" v-model="fromData.crNumber">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.cr_number')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="email" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.status') }}</label>
              <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                <option value="1">Enable</option>
                <option value="2">Disable</option>
              </select>
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.status')}) }}
              </span>
            </div>
            </ValidationProvider>
          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Primary Information</h4>
          </div>
          <div class="form-group">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.foundation_date') }}</label>
              <input type="date"  v-model="fromData.founded_date" readonly>

            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.production_start') }}</label>
              <input type="date"  v-model="fromData.production_start_date"  readonly>
            </div>

            <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.primary_email") }}</label>
              <input type="text" placeholder="Email" v-model="fromData.primary_email">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.primary_email')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="Mobile" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.primary_mobile") }}</label>
              <input type="text" placeholder="Mobile" v-model="fromData.primary_mobile">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.primary_mobile')}) }}
              </span>
            </div>
            </ValidationProvider>


            <ValidationProvider name="Facility" rules="required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.facility") }}</label>
              <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type_id" >
                <option value="1">Individual</option>
                <option value="2">Establishment</option>
              </select>
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.facility')}) }}
              </span>
            </div>
            </ValidationProvider>

          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Location Information</h4>
          </div>
          <div class="form-group">
            <div class="grid grid-cols-2 gap-4">
              <ValidationProvider name="Country" rules="required" v-slot="{ errors }">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.country") }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id" @change="countrySelected">
                  <option value="">Choose Country </option>
                  <option :value="countryList.id" v-for="countryList in allCountries" :selected="countryList.id === fromData.country_id">{{ countryList.name }}</option>
                </select>
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.country')}) }}
              </span>
              </div>
              </ValidationProvider>


              <ValidationProvider name="City" rules="required" v-slot="{ errors }">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.city") }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                  <option value="">Choose City </option>
                  <option :value="cityList.id" v-for="cityList in allCitiesById" :selected="cityList.id === fromData.city_id">{{ cityList.name }}</option>
                </select>
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.city')}) }}
              </span>
              </div>
              </ValidationProvider>
            </div>

            <ValidationProvider name="Area" rules="required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{  $t("vendor.area") }}</label>
              <input type="text" placeholder="Area name" v-model="fromData.contact_json.area">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.area')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="Street" rules="required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.street') }}</label>
              <input type="text"  placeholder="Street name" v-model="fromData.contact_json.street">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.street')}) }}
              </span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="Building" rules="required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.building') }}</label>
              <input type="text" placeholder="Building name" v-model="fromData.contact_json.building">
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.building')}) }}
              </span>
            </div>
            </ValidationProvider>


          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Social Information</h4>
          </div>
          <div class="form-group">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.whatsapp') }}</label>
              <input type="url" placeholder="Whatsapp number" v-model="fromData.links_json.whatsapp">
            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.facebook') }}</label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.facebook">
            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.linkedin') }} </label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.linkedin">
            </div>
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.youtube') }}</label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.youtube">
            </div>
            <div class="input-wrapper text-end mb-2">
              <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20" :disabled="invalid">Save Change</button>
            </div>
          </div>
        </div>

      </div>
    </form>
    </ValidationObserver>

  </div>

</template>
<script>
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import { extend } from 'vee-validate';

  extend('min', {
    validate(value, { length }) {
      return value.length >= length;
    },
    params: ['length'],
    message: 'The {_field_} field must have at least {length} characters'
  });



export default {


  mixins:[vendor],
  name:"company-profile",
  components:{
    ValidationProvider,
    ValidationObserver
  },
  data(){
    return {
       fromData:{
             id:'',
             name: {'ar':'', 'en':''},
             details:{'ar':'', 'en':''},
             subdomain:'',
           crNumber:'',
             status:'',
           founded_date:'',
         production_start_date:'',
             primary_email:'',
             primary_mobile:'',
            facility_type_id:'',
             country_id:'',
             city_id:'',
         contact_json:{
           area:'',
           street:'',
           building:'',
           email:[],
           mobile:[],
         },

           links_json:{
             whatsapp:'',
             facebook:'',
             linkedin:'',
             youtube:'',
           }
       },
      errors:[],
      hasError:false
    }
  },
  watch:{
    vendorList(){
      this.fromData.name.ar = this.vendorList?.data.name.ar
      this.fromData.name.en = this.vendorList?.data.name.en
      this.fromData.details.ar = this.vendorList?.data.details.ar
      this.fromData.details.en = this.vendorList?.data.details.en
      this.fromData.subdomain = this.vendorList?.data.subdomain
      this.fromData.crNumber = this.vendorList?.data.crNumber
      this.fromData.status = this.vendorList?.data.status
      this.fromData.founded_date = this.vendorList?.data.founded_date
      this.fromData.production_start_date = this.vendorList.data.production_start_date
      this.fromData.primary_email = this.vendorList.data.primary_email
      this.fromData.primary_mobile = this.vendorList.data.primary_mobile
      this.fromData.facility_type_id = this.vendorList.data.facility_type_id
      this.fromData.country_id = this.vendorList.data.country_id
      this.fromData.city_id = this.vendorList.data.city_id
      this.fromData.contact_json.area = this.vendorList.data.contact_json.area
      this.fromData.contact_json.street = this.vendorList.data.contact_json.street
      this.fromData.contact_json.building = this.vendorList.data.contact_json.building
      this.fromData.contact_json.email = this.vendorList.data.contact_json.email
      this.fromData.contact_json.mobile = this.vendorList.data.contact_json.mobile
      this.fromData.links_json.whatsapp = this.vendorList.data.links_json.whatsapp
      this.fromData.links_json.facebook = this.vendorList.data.links_json.facebook
      this.fromData.links_json.linkedin = this.vendorList.data.links_json.linkedin
      this.fromData.links_json.youtube = this.vendorList.data.links_json.youtube


    }

  },
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['vendorList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById'])

  },
  methods:{
    ...mapActions('vendor', ['submitData', 'getVendorData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),

   async countrySelected() {
      let countryId = this.fromData.country_id;
      try {
      await  this.getCitiesById({id: countryId,api: 'getAllCityById', mutation: 'SET_ALL_Cities' })
      } catch (e) {
        return this.$nuxt.error(e)
      }

    },




  },

 async mounted() {
    if(!this.fromData.id){
      this.fromData.id = this.profile?.id
    }
   try {
     await this.getVendorData({  id: this.fromData.id, params:'', api:'getVendor'})

     await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(()=>{
       this.fromData.country_id= this.vendorList.data.country_id
       this.countrySelected()
     })
   } catch (e) {
     return this.$nuxt.error(e)
   }




  }

}
</script>

<style>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
</style>
