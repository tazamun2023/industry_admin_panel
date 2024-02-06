<template>
  <form @submit.prevent="fromSubmit">
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

    {{ vendorList }}

   <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="card p-4">
            <div class="title">
                <h4>General Information</h4>
            </div>
            <div class="form-group">
                <div class="input-wrapper mb-2">
                    <label for="">{{ $t('global.name') }}</label>
                    <input type="text" placeholder="Name Arabic" v-model="fromData.name.ar">
                    <input type="text" placeholder="Name English" v-model="fromData.name.en">
                  <span
                    class="error"
                    v-if="!fromData.name.ar || hasError"
                  >
                  {{ $t('global.req', { type: $t('global.name')}) }}
                </span>
                  <span
                    class="error"
                    v-else-if="!fromData.name.en || hasError"
                  >
                  {{ $t('global.req', { type: $t('global.name')}) }}
                </span>
                </div>

              <div class="input-wrapper mb-2">
                <label for="">{{ $t("vendor.details") }}</label>
                <input type="text" placeholder="Details Arabic" v-model="fromData.details.ar">
                <input type="text" placeholder="Details English" v-model="fromData.details.en">
                <span
                  class="error"
                  v-if="!fromData.details.ar || hasError"
                >
                  {{ $t('global.req', { type: $t('vendor.details')}) }}
                </span>
                <span
                  class="error"
                  v-else-if="!fromData.details.en || hasError"
                >
                  {{ $t('global.req', { type: $t('vendor.details')}) }}
                </span>
              </div>

              <div class="input-wrapper mb-2">
                <label for="">{{ $t('vendor.subdomain') }}</label>
                <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
              </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t('vendor.email') }}</label>
                    <input type="email" placeholder="Email" v-model="fromData.email">
                  <span
                    class="error"
                    v-if="!fromData.email || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.email')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t('vendor.mobile') }}</label>
                    <input type="text" placeholder="Mobile" v-model="fromData.mobile">
                  <span
                    class="error"
                    v-if="!fromData.mobile || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.mobile')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t('vendor.cr_number') }}</label>
                    <input type="text" placeholder="CR Number" v-model="fromData.cr_number">
                  <span
                    class="error"
                    v-if="!fromData.cr_number || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.cr_number')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Status</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                        <option value="1">Enable</option>
                        <option value="2">Disable</option>
                    </select>
                </div>
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
                    <input type="date"  v-model="fromData.foundation_date" readonly>

                </div>
                <div class="input-wrapper mb-2">
                    <label for="">{{ $t('vendor.production_start') }}</label>
                    <input type="date"  v-model="fromData.production_date"  readonly>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.primary_email") }}</label>
                    <input type="email" placeholder="Email" v-model="fromData.primary_email">
                  <span
                    class="error"
                    v-if="!fromData.primary_email || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.primary_email')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.primary_mobile") }}</label>
                    <input type="number" placeholder="Mobile" v-model="fromData.primary_mobile">
                  <span
                    class="error"
                    v-if="!fromData.primary_mobile || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.primary_email')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">Facility Type</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                </div>
            </div>
        </div>
                <!-- --------------- -->
        <div class="card p-4">
            <div class="title">
                <h4>Location Information</h4>
            </div>
            <div class="form-group">
                <div class="grid grid-cols-2 gap-4">
                    <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.country") }}</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                      <span
                        class="error"
                        v-if="!fromData.country_id || hasError"
                      >
                  {{ $t('global.req', { type: $t('vendor.country')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t("vendor.city") }}</label>
                    <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                        <option value="">Type 1 </option>
                        <option value="">Type 2</option>
                    </select>
                  <span
                    class="error"
                    v-if="!fromData.city_id || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.city')}) }}
                </span>
                </div>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">{{  $t("vendor.area") }}</label>
                    <input type="text" placeholder="Area name" v-model="fromData.area">
                  <span
                    class="error"
                    v-if="!fromData.area || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.area')}) }}
                </span>
                </div>
                <div class="input-wrapper mb-2">
                    <label for="">{{ $t('vendor.street') }}</label>
                    <input type="text"  placeholder="Street name" v-model="fromData.street">
                  <span
                    class="error"
                    v-if="!fromData.street || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.street')}) }}
                </span>
                </div>
                <div class="input-wrapper  mb-2">
                    <label for="">{{ $t('vendor.building') }}</label>
                    <input type="text" placeholder="Building name" v-model="fromData.building">
                  <span
                    class="error"
                    v-if="!fromData.building || hasError"
                  >
                  {{ $t('global.req', { type: $t('vendor.building')}) }}
                </span>
                </div>


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
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
                </div>
            </div>
        </div>

   </div>
  </form>
</template>
<script>
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";

export default {
  mixins:[vendor],
  name:"company-profile",
  data(){
    return {
       fromData:{
             id:'',
             name: {'ar':'', 'en':''},
             details:{'ar':'', 'en':''},
             subdomain:'',
             cr_number:'',
             status:'',
             foundation_date:'',
             production_date:'',
             primary_email:'',
             primary_mobile:'',
             facility_type:'',
             country_id:'',
             city_id:'',
             area:'',
             street:'',
             building:'',
             email:[],
            mobile:[],

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
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['vendorList'])

  },
  watch:{
    profile(){
      this.id = this.profile?.id
    }
  },
  methods:{
    ...mapActions('vendor', ['submitData', 'getVendorData'])



  },

 async mounted() {
    if(!this.fromData.id){
      this.fromData.id = this.profile?.id
    }
      await this.getVendorData({  id: this.fromData.id, params:'', api:'getVendor'}).then(()=>{
        console.log(this.vendorList.data)
        this.fromData = this.vendorList.data
      })

  /*  if(this.vendorList){
      this.fromData = this.vendorList
    }*/




  }

}
</script>

<style>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
</style>
